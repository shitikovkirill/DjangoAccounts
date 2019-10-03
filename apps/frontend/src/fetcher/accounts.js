import {
  pendingAccounts,
  getAccounts,
  errorAccounts,
  addAccount, deleteAccount
} from '../actions/accounts';

const getAccountsApi = () => {
  return dispatch => {
    let status = null;
    dispatch(pendingAccounts('list'));
    fetch('/api/users/')
    .then(result => {
      status = result.ok;
      return result
    })
    .then(result => result.json())
    .then(result => {
      if (status) {
        dispatch(getAccounts(result));
      } else {
        dispatch(errorAccounts(result));
      }
      return result;
    })
    .catch(error => {
      dispatch(errorAccounts(error));
    })
  }
};

const addAccountApi = (data) => {
  data = {...data};
  let avatar = data.avatar;
  delete data.avatar;
  return dispatch => {
    let status = null;
    dispatch(pendingAccounts('adding'));
    fetch('/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    })
    .then(result => {
      status = result.ok;
      return result
    })
    .then(result => result.json())
    .then(result => {
      if (status) {
        dispatch(addAccount(result));
      } else {
        dispatch(errorAccounts(result));
      }
      return result;
    })
    .catch(error => {
      dispatch(errorAccounts(error));
    })
  };
};

const deleteAccountApi = (id) => {
  return dispatch => {
    let status = null;
    dispatch(pendingAccounts('deleting'));
    fetch(`/api/users/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
    })
    .then(result => {
      status = result.ok;
      return result
    })
    .then(result => {
      if (status) {
        dispatch(deleteAccount(id));
      } else {
        dispatch(errorAccounts(result));
      }
      return result;
    })
    .catch(error => {
      dispatch(errorAccounts(error));
    })
  }
};


export { getAccountsApi, addAccountApi, deleteAccountApi };