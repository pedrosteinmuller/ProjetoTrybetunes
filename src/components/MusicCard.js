import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    // favoriteMusicsData: [],
    loading: false,
  };

  componentDidMount() {
    this.requestFavoriteApi();
  }

  requestFavoriteApi = (object) => {
    this.setState({ loading: true }, async () => {
      await addSong(object);
      this.setState({ loading: false });
    });
  };

  render() {
    const { trackName, previewUrl, trackId, musica } = this.props;
    // console.log(musica);
    const { loading } = this.state;
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
              onClick={ () => this.requestFavoriteApi(musica) }
            />
          </label>
        </div>
      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musica: PropTypes.shape().isRequired,
};

export default MusicCard;
