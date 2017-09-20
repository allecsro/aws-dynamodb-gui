import {
  LOAD_TABLES,
  FILTER_TABLES,
  LOAD_TABLE,
  SCAN_ITEMS,
  QUERY_ITEMS,
  GET_ITEM,
  CLEAR_ITEM,
} from '../actions/dynamodb.action';

const DynamoDbReducer = (state = window.INITIAL_STATE.dynamodb, action) => {
  switch (action.type) {

    case `${LOAD_TABLES}_PENDING`:
      // display loading state
      return Object.assign({}, state, {
        isLoadingTables: true,
      });

    case `${LOAD_TABLES}_FULFILLED`:
      return Object.assign({}, state, {
        tables: action.payload.meta,
        isLoadingTables: false,
      });

    case `${LOAD_TABLES}_REJECTED`:
      return Object.assign({}, state, {
        error: action.payload,
        isLoadingTables: false,
      });

    case FILTER_TABLES: {
      const unfilteredTables = state.unfilteredTables ? state.unfilteredTables : state.tables;
      const tables = [];
      const filter = action.payload.toLowerCase();
      for (let i = 0; i < unfilteredTables.length; i += 1) {
        const table = unfilteredTables[i];
        if (table.TableName.toLowerCase().indexOf(filter) >= 0) {
          tables.push(table);
        }
      }

      return Object.assign({}, state, {
        unfilteredTables,
        tables,
      });
    }

    case LOAD_TABLE: {
      const tableName = action.payload;
      if (state.tables && state.tables.length > 0) {
        for (let i = 0; i < state.tables.length; i += 1) {
          const table = state.tables[i];
          if (table.TableName === tableName) {
            return Object.assign({}, state, {
              table,
            });
          }
        }
      }

      return state;
    }

    case `${SCAN_ITEMS}_PENDING`:
    case `${QUERY_ITEMS}_PENDING`:
      // display loading state
      return Object.assign({}, state, {
        isLoadingItems: true,
      });

    case `${SCAN_ITEMS}_FULFILLED`:
    case `${QUERY_ITEMS}_FULFILLED`:
      return Object.assign({}, state, {
        items: action.payload.Items,
        totalCount: action.payload.Count,
        scanCount: action.payload.ScannedCount,
        isLoadingItems: false,
      });

    case `${SCAN_ITEMS}_REJECTED`:
    case `${QUERY_ITEMS}_REJECTED`:
      return Object.assign({}, state, {
        error: action.payload,
        isLoadingItems: false,
      });

    case `${GET_ITEM}_PENDING`:
      return Object.assign({}, state, {
        item: null,
      });

    case `${GET_ITEM}_FULFILLED`:
      return Object.assign({}, state, {
        item: action.payload.Item,
      });

    case CLEAR_ITEM:
      return Object.assign({}, state, {
        item: null,
      });

    default:
      // If no action matched, we return the state unchanged
      return state;
  }
};

export default DynamoDbReducer;
