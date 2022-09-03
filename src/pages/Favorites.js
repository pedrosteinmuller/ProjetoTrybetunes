import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  state = {
    favoritelist: [],
    loading: false,
  };

  componentDidMount() {
    this.listFavoriteMusics();
    this.removeFavorite();
  }

  removeFavorite = async (object) => {
    this.setState({ loading: true }, async () => {
      await removeSong(object);
      await this.listFavoriteMusics();
      this.setState({ loading: false });
    });
  };

  listFavoriteMusics = async () => {
    const musicsLS = await getFavoriteSongs();
    this.setState({
      favoritelist: musicsLS,
    });
  };

  render() {
    const { favoritelist, loading } = this.state;
    return (
      <div favoritelist-testid="page-favorites">
        <Header />
        {
          loading && (
            favoritelist.map((eachMusic, index) => (
              <div key={ index }>
                <MusicCard
                  key={ eachMusic.trackName }
                  trackName={ eachMusic.trackName }
                  previewUrl={ eachMusic.previewUrl }
                />
                <label htmlFor={ `favorite-music-${index}` }>
                  Favorita
                  <input
                    id={ `favorite-music-${index}` }
                    type="checkbox"
                    checked={
                      favoritelist.some((item) => item.trackId === trackId)
                    }
                    onChange={ () => {
                      this.removeFavorite(eachMusic);
                    } }
                  />
                </label>
              </div>
            ))
          )
        }
      </div>

    );
  }
}

export default Favorites;
