import AWS from 'aws-sdk';
import promisify from 'es6-promisify';
import Logger from '../utils/logger';

const log = new Logger('AwsConnector');

/**
 * Amazon Web Services connector
 *
 * This connector is used to access the AWS API
 */
export default class AwsConnector {

  constructor(options) {
    // default plugin settings
    this.settings = {
      awsConfig: {
        region: 'us-east-1',
        accessKeyId: false,
        secretAccessKey: false,
        endpoint: false,
      },
    };

    this.dynamodb = false;
    this.docClient = false;

    this.settings = Object.assign(this.settings, options);
  }

  initialize() {
    AWS.config.update(
      Object.assign(this.settings.awsConfig, {
        sslEnabled: this.settings.awsConfig.endpoint.indexOf('https://') === 0,
      }),
    );

    this.dynamodb = new AWS.DynamoDB({
      maxRetries: 0,
    });
    this.docClient = new AWS.DynamoDB.DocumentClient({
      maxRetries: 0,
      httpOptions: {
        xhrAsync: false,
      },
    });

    this.listTablesPromise = promisify(this.dynamodb.listTables.bind(this.dynamodb));
    this.updateTablePromise = promisify(this.dynamodb.updateTable.bind(this.dynamodb));
    this.describeTablePromise = promisify(this.dynamodb.describeTable.bind(this.dynamodb));
    this.getItemPromise = promisify(this.docClient.get.bind(this.docClient));
    this.putItemPromise = promisify(this.docClient.put.bind(this.docClient));
    this.deleteItemPromise = promisify(this.docClient.delete.bind(this.docClient));
  }

  /**
   * Returns the list of tables in DynamoDB
   */
  listTables() {
    log.debug('Listing tables in DynamoDB');
    const dynamodb = this.dynamodb;
    return new Promise((resolve, reject) => {
      dynamodb.listTables({}, (error, data) => {
        if (error) {
          reject({ error });
        } else {
          Promise.all(data.TableNames.map((TableName) => {
            return this.describeTablePromise({ TableName }).then(meta => meta.Table);
          })).then((meta) => {
            resolve({ meta });
          }).catch((err) => {
            reject({ err });
          });
        }
      });
    });
  }

  /**
   * Returns a page of results performing a scan on the given table
   * @param tableName the fullname of the table
   * @param filters An optional list of filters to be applied to the scanned result
   */
  scanItems(tableName, filters) {
    log.debug(`Scanning ${tableName}...`);
    const docClient = this.docClient;
    return new Promise((resolve, reject) => {
      const params = {
        TableName: tableName,
      };

      if (filters && Object.keys(filters).length > 0) {
        const filterExpressions = [];
        params.ExpressionAttributeValues = {};
        Object.keys(filters).forEach((filter, value) => {
          filterExpressions.push(`${filter} = :${filter}`);
          params.ExpressionAttributeValues[`:${filter}`] = value;
        });
        params.FilterExpression = filterExpressions.join(' and ');
      }

      docClient.scan(params, (error, data) => {
        if (error) {
          reject({ error });
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Returns an item from a table based on its hash and range keys
   * @param table
   * @param hashKey
   * @param rangeKey
   */
  getItem(table, hashKey, rangeKey) {
    const dynamodb = this.dynamodb;

    const hashKeyName = table.KeySchema[0].AttributeName;
    const rangeKeyName = table.KeySchema.length > 1 ? table.KeySchema[1].AttributeName : null;

    return new Promise((resolve, reject) => {
      const params = {
        TableName: table.TableName,
        Key: {
        },
      };

      params.Key[hashKeyName] = {
        S: hashKey,
      };
      if (rangeKeyName) {
        params.Key[rangeKeyName] = {
          S: rangeKey,
        };
      }


      dynamodb.getItem(params, (error, data) => {
        if (error) {
          reject({ error });
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Updates an existing item from a table
   * @param table
   * @param item
   */
  updateItem(table, item) {
    const docClient = this.docClient;
    return new Promise((resolve, reject) => {
      const params = {
        TableName: table.TableName,
        Item: item,
      };

      docClient.put(params, (error, data) => {
        if (error) {
          reject({ error });
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Create a table index
   * @param table
   * @param item
   */
  createIndex(table, data) {
    const createIndexParams = {
      IndexName: data.indexName,
      KeySchema: [
        {
          AttributeName: data.hashKey,
          KeyType: 'HASH',
        },
      ],
      Projection: { /* required */
        ProjectionType: data.projectionType,
      },
      ProvisionedThroughput: { /* required */
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
    };

    if (data.rangeKey && data.rangeKey.length) {
      createIndexParams.KeySchema.push({
        AttributeName: data.rangeKey,
        KeyType: 'RANGE',
      });
    }

    const params = {
      TableName: table.TableName,
      AttributeDefinitions: [
        {
          AttributeName: data.hashKey,
          AttributeType: data.hashKeyType,
        },
      ],
      GlobalSecondaryIndexUpdates: [{
        Create: createIndexParams,
      }],
    };

    if (data.rangeKey && data.rangeKey.length) {
      params.AttributeDefinitions.push({
        AttributeName: data.rangeKey,
        AttributeType: data.rangeKeyType,
      });
    }

    return this.updateTablePromise(params);
  }
}
