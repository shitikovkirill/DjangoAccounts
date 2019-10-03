import {
  pendingAccounts,
  getAccounts,
  errorAccounts,
  addAccount,
  updateAccount,
  deleteAccount,
} from '../actions/accounts';
import sendFetch from './helper'

const getAccountsApi = () => {
  return dispatch => {
    sendFetch(
      new Request('/api/users/'),
      () => dispatch(pendingAccounts('list')),
      (result) => dispatch(getAccounts(result)),
      (result) => dispatch(errorAccounts(result)),
    );
  }
};

const addAccountApi = (data) => {
  data = { ...data };
  let avatar = data.avatar;
  delete data.avatar;
  return dispatch => {
    let propsRes = sendFetch(
      new Request('/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      }),
      () => dispatch(pendingAccounts('adding')),
      (result) => dispatch(addAccount(result)),
      (result) => dispatch(errorAccounts(result)),
    );
    if (avatar) {
      propsRes.then((result) => {
        let fd = new FormData();
        fd.append('avatar', avatar, avatar.name);
        let request = new Request(`/api/users/${result.id}/`, {
          method: 'PATCH',
          body: fd
        });
        sendFetch(
          request,
          () => dispatch(pendingAccounts('editing')),
          (result) => dispatch(updateAccount(result)),
          (result) => dispatch(errorAccounts(result)),
        )
      })
    }
  };
};

const deleteAccountApi = (id) => {
  return dispatch => {
    sendFetch(
      new Request(`/api/users/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
      }),
      () => dispatch(pendingAccounts('deleting')),
      (result) => dispatch(deleteAccount(id)),
      (result) => dispatch(errorAccounts(result)),
    );
  }
};


export { getAccountsApi, addAccountApi, deleteAccountApi };