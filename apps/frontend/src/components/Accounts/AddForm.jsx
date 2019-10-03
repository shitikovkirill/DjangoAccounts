import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Form, Spinner } from 'reactstrap';
import LIVR from 'livr';
import Input from '../Elements/Input';

LIVR.Validator.defaultAutoTrim(true);

const initState = {
  email: '',
  password: '',
  name: '',
  surname: '',
  avatar: null,
};

export default class AccountForm extends Component {
  static propTypes = {
    addAccount: PropTypes.func.isRequired,
    pending: PropTypes.bool.isRequired,
  };

  fieldValidation = {
    email: ['required', 'email'],
    name: ['required',],
    surname: ['required',],
    password: ['required', { min_length: 10 }]
  };


  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      account: { ...initState }
    };
  }

  validateFields = () => {
    const { account } = this.state;
    const validator = new LIVR.Validator(this.fieldValidation);
    validator.validate(account);
    return validator.getErrors() || {};
  };

  validateField = (field) => {
    const { account } = this.state;
    if (this.fieldValidation[field]) {
      const validator = new LIVR.Validator({
        [field]: this.fieldValidation[field]
      });
      validator.validate({ [field]: account[field] });
      return validator.getErrors() || {};
    }
    return {}
  };

  handleBlur = (event) => {
    let name = event.target.name;
    let errors = this.validateField(name);
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
    const { addAccount } = this.props;
    const errors = this.validateFields();
    if (Object.keys(errors).length) {
      this.setState(prevState => (
        {
          errors: errors
        }));
    } else {
      const { account } = this.state;
      addAccount(account);
      this.setState(prevState => (
        {
          account: { ...initState }
        }));
    }
  };

  onChange = event => {
    console.log('onChange');
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
        ...prevState,
        account: {
          ...prevState.account,
          avatar: file,
        }
      };
    });

  };

  render() {
    const { account: { email, password, name, surname }, errors } = this.state;
    const { pending } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          error={errors.email}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          label="Email"
        />
        <Input
          name="password"
          type="password"
          value={password}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          label="Password"
          error={errors.password}
        />
        <Input
          name="name"
          value={name}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          label="Name"
          error={errors.name}
        />
        <Input
          name="surname"
          value={surname}
          onChange={this.onChange}
          handleBlur={this.handleBlur}
          label="Surname"
          error={errors.surname}
        />
        <Input
          name="avatar"
          type="file"
          onChange={this.avatarHandler}
          handleBlur={this.handleBlur}
          label="Avatar"
          text="Select your avatar"
          error={errors.avatar}
        />
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          disabled={pending}
          onClick={this.handleSubmit}
        >
          {pending ? <Spinner type="grow" color="primary" /> : null}
          Save
        </Button>
      </Form>
    );
  }
}
