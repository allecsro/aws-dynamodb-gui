import Logger from '../utils/logger';
import AwsConnector from '../connectors/aws.connector';

const log = new Logger('AwsAction');

let AWS = false;

// ======================================================
// Action types
// ======================================================
export const LOAD_TABLES = 'LOAD_TABLES';
export const FILTER_TABLES = 'FILTER_TABLES';
export const LOAD_TABLE = 'LOAD_TABLE';
export const SCAN_ITEMS = 'SCAN_ITEMS';
export const QUERY_ITEMS = 'QUERY_ITEMS';
export const GET_ITEM = 'GET_ITEM';
export const CLEAR_ITEM = 'CLEAR_ITEM';

/**
 * Loads the list of tables from the dynamodb
 * @returns {function(*=)}
 */
export const loadTables = () => {
  return (dispatch) => {
    log.info('Loading tables schema...');
    dispatch({
      type: LOAD_TABLES,
      payload: AWS.listTables(),
    });
  };
};

/**
 * Filters the list of tables
 */
export const filterTables = filter => ({
  type: FILTER_TABLES,
  payload: filter,
});

/**
 * Loads a table from the store
 * @returns {}
 */
export const loadTable = tableName => ({
  type: LOAD_TABLE,
  payload: tableName,
});

/**
 * Scans the given table and returns the first page of items
 * @returns {function(*=)}
 */
export const scanItems = (tableName, filters) => {
  return (dispatch) => {
    dispatch({
      type: SCAN_ITEMS,
      payload: AWS.scanItems(tableName, filters),
    });
  };
};

/**
 * Queries the given table and returns the first page of items
 * @returns {function(*=)}
 */
export const queryItems = (tableName, hashKey, rangeKey, filters) => {
  return (dispatch) => {
    dispatch({
      type: QUERY_ITEMS,
      payload: AWS.queryItems(tableName, hashKey, rangeKey, filters),
    });
  };
};

/**
 * Fetches an item from a table based on its id (hash and/or range)
 * @returns {function(*=)}
 */
export const getItem = (tableName, hashKey, rangeKey) => {
  return (dispatch, getState) => {
    const state = getState();
    let table = null;
    const tables = state.dynamodb.tables;

    for (let i = 0; i < tables.length; i += 1) {
      if (tables[i].TableName === tableName) {
        table = tables[i];
        break;
      }
    }

    const hashKeyName = table.KeySchema[0].AttributeName;
    const rangeKeyName = table.KeySchema.length === 2 ?
      table.KeySchema[1].AttributeName : null;

    dispatch({
      type: GET_ITEM,
      payload: AWS.getItem(tableName, hashKeyName, hashKey, rangeKeyName, rangeKey),
    });
  };
};

/**
 * Clears the selected item
 * @returns action
 */
export const clearItem = () => ({
  type: CLEAR_ITEM,
});

/**
 * Initializes the DynamoDB AWS client
 * @returns {function(*=)}
 */
export const initDynamoDBAws = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (!state.application.currentProfile) {
      return;
    }

    log.debug(`Initializing AWS client for profile ${state.application.currentProfile}`);

    AWS = new AwsConnector({
      awsConfig: state.application.profiles[state.application.currentProfile],
    });

    AWS.initialize();

    dispatch(loadTables());
  };
};
