import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Button, Spinner } from 'reactstrap';

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
    pendingDeleting: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      deleting: false
    };
  }

  deleteAction = () => {
    const {item: { id }, deleteAccount } = this.props;
    deleteAccount(id);
    this.setState((prevState)=>({deleting: true}));
  };

  render() {
    const { item, pendingDeleting } = this.props;
    const { deleting } = this.state;
    return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.email}</td>
        <td>{item.name}</td>
        <td>{item.surname}</td>
        <td>{item.avatar}</td>
        <td>{item.date_joined}</td>
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


