import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import '../styles/Favorite.css';

class Favorites extends Component {
  state = {
    favoritelist: [],
    loading: false,
  };

  componentDidMount() {
    this.listFavoriteMusics();
  }

  handleChange = (trackId) => {
    const { favoritelist } = this.state;
    this.setState({ favoritelist: favoritelist.filter((e) => e.trackId !== trackId) });
  };

  listFavoriteMusics = async () => {
    this.setState({ loading: true });
    const musicsLS = await getFavoriteSongs();
    // const teste = await removeSong;
    this.setState({ favoritelist: musicsLS, loading: false });
  };

  render() {
    const { favoritelist, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading className="loading-favorite" /> : (
          favoritelist.map((eachMusic, index) => (
            <div key={ index } className="favorite-music">
              <MusicCard
                key={ eachMusic.trackName }
                trackName={ eachMusic.trackName }
                previewUrl={ eachMusic.previewUrl }
                trackId={ eachMusic.trackId }
                musica={ eachMusic }
                handleChange={ this.handleChange }
              />
            </div>
          ))
        ) }
      </div>
    );
  }
}

export default Favorites;
