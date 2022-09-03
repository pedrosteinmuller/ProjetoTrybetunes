import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-search">
        <Header />
        {
          !loading && (
            <form>
              <label htmlFor="search-artist-input">
                <input
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
                data-testid="search-artist-button"
                disabled={ searchArtistName.length < minlength }
                onClick={ this.handleSubmit }
              >
                Pesquisar
              </button>
            </form>
          )
        }
        {
          loading && <Loading />
        }
        <div>
          { artistResult.length > noWords ? (
            <div>
              <h1>{`Resultado de álbuns de: ${nameArtist}`}</h1>
              {
                artistResult.map((element, index) => (
                  <div key={ `${element.artistId} ${index}` }>
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
                ))
              }
            </div>
          ) : (
            <h2>Nenhum álbum foi encontrado</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
