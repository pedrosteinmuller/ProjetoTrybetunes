import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteMusicsData: [],
    loading: false,
    // favorites: [],
  };

  componentDidMount() {
    this.requestFavoriteApi();
    this.recoverFavoriteSongs();
  }

  requestFavoriteApi = (object) => {
    this.setState({ loading: true }, async () => {
      await addSong(object);
      this.setState({ loading: false });
    });
  };

  recoverFavoriteSongs = () => {
    this.setState({ loading: true }, async () => {
      const ApiResponse = await getFavoriteSongs();
      // console.log(await ApiResponse);
      this.setState({
        loading: false,
        favoriteMusicsData: ApiResponse,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId, musica } = this.props;
    // console.log(musica);
    const { loading, favoriteMusicsData } = this.state;
    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <div>
          {
            loading && <Loading />
          }
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              id={ `checkbox-music-${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              checked={
                favoriteMusicsData.some((item) => item.trackId === trackId)
              }
              onChange={ () => this.requestFavoriteApi(musica) }
            />
          </label>
        </div>
      </div>

    );
  }
}

// no ultimo teste do requisito 9, João Matheus da tribo B me auxiliou da seguinte forma:
// trocar onClick do meu input do tipo checkbox para onChange e alteração de um detalhe
// da minha função recoverFavoriteSongs com uso do spread.

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape().isRequired,
};

export default MusicCard;
