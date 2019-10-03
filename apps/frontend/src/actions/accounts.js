export const PENDING_ACCOUNTS       = 'PENDING_ACCOUNTS';
export const ERROR_ACCOUNTS         = 'ERROR_ACCOUNTS';
export const GET_ACCOUNTS           = 'GET_ACCOUNTS';
export const ADD_ACCOUNT            = 'ADD_ACCOUNT';
export const DELETE_ACCOUNT         = 'DELETE_ACCOUNT';
export const UPDATE_ACCOUNT         = 'UPDATE_ACCOUNT';
export const CLEAR_ERROR            = 'CLEAR_ERROR';

export function pendingAccounts(action) {
  return {
    type: PENDING_ACCOUNTS,
    action,
  }
}

export function errorAccounts(error) {
  return {
    type: ERROR_ACCOUNTS,
    error: error
  }
}

export function getAccounts(accounts) {
  return {
    type: GET_ACCOUNTS,
    payload: accounts
  }
}

export function addAccount(account) {
  return {
    type: ADD_ACCOUNT,
    payload: account
  }
}

export function deleteAccount(id) {
  return {
    type: DELETE_ACCOUNT,
    payload: id
  }
}

export function updateAccount(account) {
  return {
    type: UPDATE_ACCOUNT,
    payload: account
  }
}

export function clearError() {
  return {
    type: CLEAR_ERROR,
  }
}