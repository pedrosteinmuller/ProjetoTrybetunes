import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdite.css';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    changeImage: '',
    loading: false,
  };

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loading: true });
    const { name, email, description, image } = await getUser();
    this.setState({ loading: false, name, email, description, image });
  };

  handleSubmit = async () => {
    const { name, email, description, image } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image });
    this.setState({ loading: false });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const validation = 3;
    this.setState({
      [name]: value,
    });
    if (name === 'name') {
      this.setState({
        buttonDisabled: value.length < validation,
      });
    }
  };

  render() {
    const { name,
      email,
      description,
      image,
      changeImage,
      loading,
      buttonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="page-profile-edit">
          <h1>Editar perfil</h1>
          <img
            className="profile-image"
            src={ changeImage }
            alt="Foto perfil"
          />
          {loading ? (
            <Loading />
          ) : (
            <form className="form">
              <div className="edit-name">
                <label htmlFor="namee">
                  Nome:
                  <input
                    id="namee"
                    data-testid="edit-input-name"
                    name="name"
                    type="text"
                    value={ name }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
              </div>
              <div className="edit-email">
                <label htmlFor="email">
                  Email:
                  <input
                    id="email"
                    data-testid="edit-input-email"
                    type="email"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
              </div>
              <div className="edit-description">
                <label htmlFor="description">
                  Descrição:
                  <textarea
                    id="description"
                    data-testid="edit-input-description"
                    name="description"
                    value={ description }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
              </div>
              <div className="edit-image">
                <label htmlFor="image">
                  Foto de Perfil:
                  <input
                    id="image"
                    data-testid="edit-input-image"
                    type="text"
                    placeholder="Link da imagem"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                    required
                  />
                </label>
              </div>

              <Link to="/profile">
                <button
                  type="submit"
                  data-testid="edit-button-save"
                  className="send"
                  onClick={ this.handleSubmit }
                  disabled={ buttonDisabled }
                >
                  Enviar
                </button>
              </Link>
            </form>
          )}
        </div>

      </div>
    );
  }
}

export default ProfileEdit;
