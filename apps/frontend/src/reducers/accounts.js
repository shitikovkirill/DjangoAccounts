import {
  PENDING_ACCOUNTS,
  ERROR_ACCOUNTS,
  GET_ACCOUNTS,
  ADD_ACCOUNT,
  DELETE_ACCOUNT,
  UPDATE_ACCOUNT, CLEAR_ERROR
} from '../actions/accounts';

const initialState = {
  pending: {
    list: false,
    adding: false,
    editing: false,
    deleting: false,
  },
  accounts: [],
  error: null
};

const accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case PENDING_ACCOUNTS: {
      return {
        ...state,
        pending: {
          ...state.pending,
          [action.pendingType]: true
        }
      };
    }

    case ERROR_ACCOUNTS: {
      return {
        ...state,
        pending: {
          list: false,
          adding: false,
          editing: false,
          deleting: false,
        },
        error: action.error
      };
    }

    case GET_ACCOUNTS: {
      return  {
        ...state,
        accounts: action.payload,
        pending: {
          ...state.pending,
          list: false
        }
      };
    }

    case ADD_ACCOUNT: {
      return  {
        ...state,
        accounts: [...state.accounts, action.payload],
        pending: {
          ...state.pending,
          adding: false
        }
      };
    }

    case DELETE_ACCOUNT: {
      return  {
        ...state,
        accounts: state.accounts.filter((item)=>{
          return item.id !== action.payload
        }),
        pending: {
          ...state.pending,
          deleting: false
        }
      };
    }

    case UPDATE_ACCOUNT: {
      return  {
        ...state,
        accounts: state.accounts.map(function (item) {
          if (item.id === this.id) {
            return this;
          }
          return item
        }, action.payload),
        pending: {
          ...state.pending,
          editing: false
        }
      };
    }

    case CLEAR_ERROR: {
      return {
        ...state,
        error: null
      };
    }

    default: {
      return state;
    }
  }
};

export default accountReducer