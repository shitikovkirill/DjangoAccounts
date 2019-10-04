import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import Input from '../../Elements/Input';
import { validateFields, validateField } from './Helpers'

export default class EditForm extends Component {
  static propTypes = {
    item: PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      surname: PropTypes.string,
      avatar: PropTypes.string,
      date_joined: PropTypes.string,
    }).isRequired,
    updateAccount: PropTypes.func.isRequired,
    toggleEditing: PropTypes.func.isRequired,
  };

  fieldValidation = {
    name: ['required',],
    surname: ['required',],
  };


  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      account: {}
    };
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      account: {
        name: item.name,
        surname: item.surname,
      }
    }))
  }

  handleBlur = (event) => {
    const { account } = this.state;
    let field = event.target.name;
    let errors = validateField(field, account[field], this.fieldValidation[field]);
    if (Object.keys(errors).length) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }));
    }
  };

  handleSubmit = event => {
    const { account } = this.state;
    const { item: { id }, updateAccount, toggleEditing } = this.props;
    const errors = validateFields(account, this.fieldValidation);
    if (Object.keys(errors).length) {
      this.setState(prevState => (
        {
          errors: errors
        }));
    } else {
      updateAccount(id, account);
      toggleEditing()
    }
  };

  onChange = event => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState(prevState => {
      let state = {
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: null
        }
      };
      state.account[name] = value;
      return state;
    })
  };

  avatarHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    this.setState(prevState => {
      return {
        account: {
          ...prevState.account,
          avatar: file,
        }
      };
    });
  };

  render() {
    const { account: { name, surname }, errors } = this.state;
    const { item } = this.props;
    return ([
      <th scope="row" key="row-1">{item.id}</th>,
      <td key="row-2">{item.email}</td>,
      <td key="row-3">
        <Input
          name="name"
          value={name}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          error={errors.name}
        />
      </td>,
      <td key="row-4">
        <Input
          name="surname"
          value={surname}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          error={errors.surname}
        />
      </td>,
      <td key="row-5">
        {item.avatar ?
          <img src={item.avatar} alt="Avatar" className="rounded" width="100" /> : null}
        <Input
          name="avatar"
          type="file"
          onChange={this.avatarHandler}
          handleBlur={this.handleBlur}
          error={errors.avatar}
        />
      </td>,
      <td key="row-6">{item.date_joined}</td>,
      <td key="row-7">
        <Button onClick={this.handleSubmit}>
          Save
        </Button>
      </td>
    ]);
  }
}
