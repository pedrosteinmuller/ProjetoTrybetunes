import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../styles/search.css';

class Search extends Component {
  state = {
    searchArtistName: '',
    loading: false,
    artistResult: [],
    nameArtist: '',
  };

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchArtistName: value,
      nameArtist: value,
    });
  };

  handleSubmit = async () => {
    const { searchArtistName } = this.state;
    this.setState({ loading: true });
    const searchResults = await searchAlbumsAPI(searchArtistName);
    this.setState({
      loading: false,
      artistResult: searchResults,
      searchArtistName: '',
    });
  };

  render() {
    const { searchArtistName, loading, artistResult, nameArtist } = this.state;
    const minlength = 2;
    const noWords = 0;
    return (
      <div data-testid="page-search" className="page-search">
        <Header />
        {
          loading && <Loading className="loading-search" />
        }
        {
          !loading && (
            <form className="form-search">
              <label htmlFor="search-artist-input">
                <input
                  className="input-search"
                  id="search-artist-input"
                  data-testid="search-artist-input"
                  placeholder="Nome do artista ou banda"
                  type="text"
                  onChange={ this.handleChange }
                  value={ searchArtistName }
                />
              </label>
              <button
                type="button"
                className="button-search"
                data-testid="search-artist-button"
                disabled={ searchArtistName.length < minlength }
                onClick={ this.handleSubmit }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        <div>
          { artistResult.length > noWords ? (
            <div className="details">
              <h1 className="result-name">{`Resultado de álbuns de: ${nameArtist}`}</h1>
              {
                artistResult.map((element, index) => (
                  <div key={ `${element.artistId} ${index}` } className="album-card">
                    <div className="card-area">
                      <img src={ element.artworkUrl100 } alt={ element.artistName } />
                      <h2>{`Álbum ${element.trackCount} ${element.collectionName}`}</h2>
                      <p>{`Artista ${element.artistName}`}</p>
                      <Link
                        to={ `/album/${element.collectionId}` }
                        data-testid={ `link-to-album-${element.collectionId}` }
                      >
                        Albúm
                      </Link>
                    </div>
                  </div>
                ))
              }
            </div>
          ) : (
            <h2 className="notfound">Nenhum álbum foi encontrado</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
