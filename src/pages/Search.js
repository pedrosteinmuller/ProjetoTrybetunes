import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchArtistName: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchArtistName: value,
    });
  };

  render() {
    const { searchArtistName } = this.state;
    const minlength = 2;
    return (
      <div data-testid="page-search">
        <form>
          <label htmlFor="search-artist-input">
            Nome:
            <input
              id="search-artist-input"
              data-testid="search-artist-input"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchArtistName.length < minlength }
          >
            Pesquisar
          </button>
        </form>
        <Header />
      </div>
    );
  }
}

export default Search;
