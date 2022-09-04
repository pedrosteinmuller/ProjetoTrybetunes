import React from 'react';
import '../styles/Loader.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }
}

export default Loading;
