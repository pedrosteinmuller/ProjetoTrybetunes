import React from 'react';
import '../styles/Loader.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <h1 className="text-loading">
          Carregando...
        </h1>
      </div>
    );
  }
}

export default Loading;
