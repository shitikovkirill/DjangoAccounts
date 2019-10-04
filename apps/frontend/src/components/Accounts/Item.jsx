import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button, Spinner } from 'reactstrap';
import DataRow from './Table/DataRow';
import AccountEditForm from './Form/Edit';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      avatar: PropTypes.string,
      date_joined: PropTypes.string,
    }).isRequired,
    deleteAccount: PropTypes.func.isRequired,
    updateAccount: PropTypes.func.isRequired,
    pendingDeleting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      deleting: false,
      editing: false,
    };
  }

  toggleEditing = () => {
    this.setState((prevState)=>({
      editing: !prevState.editing
    }))
  };

  deleteAction = () => {
    const {item: { id }, deleteAccount } = this.props;
    deleteAccount(id);
    this.setState((prevState)=>({deleting: true}));
  };

  render() {
    const { item, pendingDeleting, updateAccount } = this.props;
    const { deleting, editing } = this.state;
    return (
      <tr>
        { editing ? (
          <AccountEditForm
            item={item}
            updateAccount={updateAccount}
            toggleEditing={this.toggleEditing}
          />
        ): (
          <DataRow
            item={item}
            toggleEditing={this.toggleEditing}
          />
        )}
        <td>
          <Button onClick={this.deleteAction} disabled={pendingDeleting && deleting}>
            {deleting ? <Spinner type="grow" color="primary" /> : null}
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}


