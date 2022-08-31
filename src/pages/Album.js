import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    musicsList: [],
  };

  componentDidMount() {
    this.requestApi();
  }

  requestApi = async () => {
    const { match: { params: { id } } } = this.props;
    const music = await getMusics(id);
    console.log(music);
    this.setState({ musicsList: music });
  };

  render() {
    const { musicsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {musicsList.length > 0 && (
          <div>
            <h2 data-testid="artist-name">{musicsList[0].artistName}</h2>
            <h3
              data-testid="album-name"
            >
              {`${musicsList[0].collectionName} - (${musicsList[0].artistName})`}
            </h3>
          </div>
        )}
        {musicsList.length > 0 && (
          musicsList.filter((e) => e.trackName).map((eachMusic) => (
            <MusicCard
              key={ eachMusic.trackName }
              trackName={ eachMusic.trackName }
              previewUrl={ eachMusic.previewUrl }
            />
          ))
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
