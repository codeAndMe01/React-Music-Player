import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackwardFast, faForwardFast } from '@fortawesome/free-solid-svg-icons';

import './first.css'; // Import CSS file

const First = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(-1);
  const [audioRef, setAudioRef] = useState(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        setPlaylist(prevPlaylist => [...prevPlaylist, { name: file.name, url: reader.result }]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (playlist.length > 0 && currentTrackIndex === -1) {
      setCurrentTrackIndex(0); // Start playing the first track if no track is currently playing
    }
  }, [playlist]);

  const handlePlay = (index) => {
    setCurrentTrackIndex(index);
  };

  const handleEnded = () => {
    if (currentTrackIndex < playlist.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  return (
    <div className="container">
      <input type="file" accept="audio/mp3" onChange={handleFileUpload} multiple />
      <section className="main">
        <div className="allSongs">
          <h1>My Songs Queue</h1>
          <ul className="songList">
            {playlist.map((track, index) => (
              <li key={index} onClick={() => handlePlay(index)} className={currentTrackIndex === index ? 'list colors' : 'list'}>
                {track.name}
              </li>
            ))}
          </ul>
        </div>
        {currentTrackIndex !== -1 && (
          <div className="buttons">
            <input type="range" value="0" />
            <div className="controls">
              <button onClick={() => handlePlay((currentTrackIndex - 1 + playlist.length) % playlist.length)}>
                <FontAwesomeIcon icon={faBackwardFast} />
              </button>
              <button onClick={() => handlePlay((currentTrackIndex + 1) % playlist.length)}>
                <FontAwesomeIcon icon={faForwardFast} />
              </button>
            </div>
          </div>
        )}
        <audio
          ref={audio => setAudioRef(audio)}
          src={currentTrackIndex !== -1 ? playlist[currentTrackIndex].url : ''}
          controls
          autoPlay
          onEnded={handleEnded}
        />
      </section>
    </div>
  );
};

export default First;
