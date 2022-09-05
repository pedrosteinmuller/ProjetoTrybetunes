import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import userIcon from '../styles/user-circle-solid.png';
import '../styles/Profile.css';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserInformations();
  }

  getUserInformations = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ loading: false, name, email, description, image });
  };

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="perfil-page">
          <div>
            <img
              data-testid="profile-image"
              className="profile-image"
              src={ image || userIcon }
              alt="Foto de perfil"
            />
          </div>
          <div className="profile-name">
            <h3>Nome: </h3>
            { name }
          </div>
          <div className="profile-email">
            <h3>Email: </h3>
            { email }
          </div>
          <div className="profile-description">
            <h3>Descrição: </h3>
            { description }
          </div>
          <Link to="/profile/edit">
            <button type="button">
              Editar perfil
            </button>
          </Link>
          {
            loading && <Loading />
          }
        </div>
      </div>
    );
  }
}

export default Profile;
