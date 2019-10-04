import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

export default class DataRow extends PureComponent {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      avatar: PropTypes.string,
      date_joined: PropTypes.string,
    }).isRequired,
    toggleEditing: PropTypes.func.isRequired,
  };

  render() {
    const { item, toggleEditing } = this.props;
    return [
      <th scope="row" key="row-1">{item.id}</th>,
      <td key="row-2">{item.email}</td>,
      <td key="row-3">{item.name}</td>,
      <td key="row-4">{item.surname}</td>,
      <td key="row-5">
        {item.avatar ? <img src={item.avatar} alt="Avatar" className="rounded" width="100" /> : null}
      </td>,
      <td key="row-6">{item.date_joined}</td>,
      <td key="row-7"><Button onClick={toggleEditing}>Edit</Button></td>,
    ]
  }
}


