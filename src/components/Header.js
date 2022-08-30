import React, { Component } from 'react';
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
