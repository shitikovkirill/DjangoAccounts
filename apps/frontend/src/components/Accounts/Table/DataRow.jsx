import React, { PureComponent } from "react";
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

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
  };

  render() {
    const { item } = this.props;
    return [
      <th scope="row" key="row-1">{item.id}</th>,
      <td key="row-2">{item.email}</td>,
      <td key="row-3">{item.name}</td>,
      <td key="row-4">{item.surname}</td>,
      <td key="row-5">
        {item.avatar ? <Card><CardImg top width="100%" src={item.avatar} alt="Avatar" /></Card> : null}
      </td>,
      <td key="row-6">{item.date_joined}</td>
    ]
  }
}


