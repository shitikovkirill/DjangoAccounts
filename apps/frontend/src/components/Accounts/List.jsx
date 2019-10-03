import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import AccountItem from './Item'

const List = (props) => {
  const { accounts, deleteAccount, pendingDeleting } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
          <th>Date Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((item) => (
          <AccountItem key={item.id} item={item} deleteAccount={deleteAccount} pendingDeleting={pendingDeleting} />
      ))}
      </tbody>
    </Table>
  )
};

List.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteAccount: PropTypes.func.isRequired,
  pendingDeleting: PropTypes.bool.isRequired,
};

export default List