/*eslint react/prefer-stateless-function: 0 */
/*eslint react/prop-types: 0 */
import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import './scss/index.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAccountsApi, addAccountApi, deleteAccountApi } from './fetcher/accounts';
import { clearError } from './actions/accounts';


import { AccountList, AccountForm } from './components/Accounts'
import Error from './components/Error';


class App extends Component {
  componentDidMount() {
    const { getAccounts } = this.props;
    getAccounts();
  }

  render() {
    let { pending, accounts, error, addAccount, clearError, deleteAccount } = this.props;
    return (
      <main role="main" className="container">
        <Jumbotron>
          <AccountForm pending={pending.adding} addAccount={addAccount} />
        </Jumbotron>
        {pending.list ? "loading..." : (
          <AccountList
            accounts={accounts}
            deleteAccount={deleteAccount}
            pendingDeleting={pending.deleting}
          />
        )}
        {error ? <Error error={error} clearError={clearError} /> : null}
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getAccounts: getAccountsApi,
    addAccount: addAccountApi,
    deleteAccount: deleteAccountApi,
    clearError,
  }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    error: (state => state.error)(state),
    accounts: (state => state.accounts)(state),
    pending: {
      list: (state => state.pending.list)(state),
      adding: (state => state.pending.adding)(state),
      deleting: (state => state.pending.deleting)(state),
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
