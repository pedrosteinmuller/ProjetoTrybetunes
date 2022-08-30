import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.getUserInformations();
  }

  getUserInformations = () => {
    this.setState(
      {
        loading: true },
      async () => {
        const informations = await getUser();
        this.setState({
          loading: false,
          userName: informations,
        });
      },
    );
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link
          to="/search"
          data-testid="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
        >
          Perfil
        </Link>
        {loading
          ? (
            <Loading />
          ) : (
            <div>
              <p data-testid="header-user-name">{userName.name}</p>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
