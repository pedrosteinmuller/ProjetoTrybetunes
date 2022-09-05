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
        <h1>Editar perfil</h1>
        <img
          className="profile-image"
          src={ changeImage }
          alt="Foto perfil"
        />
        {loading ? (
          <Loading />
        ) : (
          <form>
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
            <label htmlFor="description" className="edit-input-description">
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
