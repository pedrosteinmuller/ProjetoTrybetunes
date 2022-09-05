import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    favoriteMusicsData: [],
    loading: false,
  };

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  requestFavoriteApi = (object) => {
    const { favoriteMusicsData } = this.state;
    const { handleChange } = this.props;
    const search = favoriteMusicsData.some((item) => item.trackId === object.trackId);
    if (search) {
      this.setState({ loading: true }, async () => {
        await removeSong(object);
        if (handleChange) {
          handleChange(object.trackId);
        }
        await this.recoverFavoriteSongs();
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await addSong(object);
        await this.recoverFavoriteSongs();
        this.setState({ loading: false });
      });
    }
  };

  recoverFavoriteSongs = async () => {
    const ApiResponse = await getFavoriteSongs();
    this.setState({
      favoriteMusicsData: ApiResponse,
    });
  };

  render() {
    const { trackName, previewUrl, trackId, musica } = this.props;
    const { loading, favoriteMusicsData } = this.state;
    return (
      <div className="music-card">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls className="audi">
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <div>
          <label htmlFor={ `checkbox-music-${trackId}` } className="like">
            Favorita
            <input
              id={ `checkbox-music-${trackId}` }
              data-testid={ `checkbox-music-${trackId}` }
              type="checkbox"
              className="check"
              checked={
                favoriteMusicsData.some((item) => item.trackId === trackId)
              }
              onChange={ () => {
                this.requestFavoriteApi(musica);
              } }
            />
            <i />
          </label>
          {
            loading && <Loading />
          }
        </div>
      </div>
    );
  }
}

// no ultimo teste do requisito 9, João Matheus da tribo B me auxiliou da seguinte forma:
// trocar onClick do meu input do tipo checkbox para onChange e alteração de um detalhe
// da minha função recoverFavoriteSongs com uso do spread.

// o requisito 10 passou automaticamente ao resolver problema do requisito 8 e 9 que eu estava tendo, nao percebi.

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape().isRequired,
};

MusicCard.propTypes = {
  handleChange: PropTypes.func,
}.isRequired;
export default MusicCard;
