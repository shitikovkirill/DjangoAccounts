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
    deleting: false,
  },
  accounts: [],
  error: null
};

const accountReducer = (state = initialState, action) => {

  switch (action.type) {
    case PENDING_ACCOUNTS: {
      let data = {
        ...state,
      };
      data['pending'][action.action] = true;
      return data;
    }

    case GET_ACCOUNTS: {
      let data = {
        ...state,
        accounts: action.payload
      };
      data['pending']['list'] = false;
      return data;
    }

    case ERROR_ACCOUNTS: {
      return {
        ...state,
        pending: {
          list: false,
          adding: false,
          deleting: false,
        },
        error: action.error
      };
    }

    case ADD_ACCOUNT: {
      let data = {
        ...state,
      };
      data['pending']['adding'] = false;
      data['accounts'].push(action.payload);
      return data;
    }
    case DELETE_ACCOUNT: {
      let data = {
        ...state,
        accounts: state.accounts.filter((item)=>{
          return item.id !== action.payload
        })
      };
      data['pending']['deleting'] = false;
      return data;
    }
    case UPDATE_ACCOUNT: {
      return null
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