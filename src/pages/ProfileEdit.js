import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

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
    const { name, email, description, changeImage } = this.state;
    this.setState({ loading: true });
    await updateUser({ name, email, description, image: changeImage });
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
        <h1>Editar perfil</h1>
        <img
          className="profile-image"
          data-testid="profile-image"
          src={ changeImage }
          alt="Foto de perfil"
        />
        {loading ? (
          <Loading />
        ) : (
          <form>
            <label htmlFor="edit-input-name">
              Nome:
              <input
                id="edit-input-name"
                data-testid="edit-input-name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-email">
              Email:
              <input
                id="edit-input-email"
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-description" className="edit-input-description">
              Descrição:
              <textarea
                id="edit-input-description"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="edit-input-image">
              Foto de Perfil:
              <input
                id="edit-input-image"
                data-testid="edit-input-image"
                type="text"
                placeholder="Link da imagem"
                name="image"
                value={ image }
                onChange={ this.handleChange }
                required
              />
            </label>
            <Link to="/profile">
              <button
                type="submit"
                data-testid="edit-button-save"
                className="edit-button-save"
                onClick={ this.handleSubmit }
                disabled={ buttonDisabled }
              >
                Enviar
              </button>
            </Link>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
