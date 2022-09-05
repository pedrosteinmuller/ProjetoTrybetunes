import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';
import userIcon from '../styles/user-circle-solid.png';

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
      <header data-testid="header-component" className="header-component">
        {loading
          ? (
            <Loading />
          ) : (
            <div className="profile-container">
              <img src={ userIcon } alt="Foto de perfil" />
              <p data-testid="header-user-name" className="user-name">{userName.name}</p>
            </div>
          )}
        <Link
          to="/search"
          data-testid="link-to-search"
          className="link-to-search"
        >
          Pesquisa
        </Link>
        <Link
          to="/favorites"
          data-testid="link-to-favorites"
          className="link-to-favorites"
        >
          Favoritas
        </Link>
        <Link
          to="/profile"
          data-testid="link-to-profile"
          className="link-to-profile"
        >
          Perfil
        </Link>
      </header>
    );
  }
}

export default Header;
