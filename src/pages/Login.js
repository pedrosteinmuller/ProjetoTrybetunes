import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  handleClick = () => {
    const { name } = this.state;
    const { history } = this.props;
    this.setState({ loading: true }, async () => {
      await createUser({ name });
      history.push('search');
    });
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    });
  };

  render() {
    const { name, loading } = this.state;
    const minlength = 3;
    return (
      <div data-testid="page-login" className="page-login">
        {loading && (
          <Loading />
        )}
        <form>
          <label htmlFor="login-name-input">
            Nome:
            <input
              id="login-name-input"
              data-testid="login-name-input"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ name.length < minlength }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
}.isRequired;

export default Login;
