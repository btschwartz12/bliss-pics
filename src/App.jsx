import React, { useState, useEffect } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";
import ParticlesBg from 'particles-bg';

import toast, { Toaster } from 'react-hot-toast';

import FilePickerModal from './FilePickerModal.jsx';
import Tooltip from '@mui/material/Tooltip';


const styles = {
  bg: {
  },
};



const Cole = () => toast("This is a spot where I put some pictures of my dogs. I made it so you can upload your own, but please, nothing inappropriate.");


const trimTimestamp = (timestamp) => {
  // takes a timestamp in the form Sun, 30 Apr 2023 23:08:33 GMT
  // and just returns the date, no day of week
  const date = new Date(timestamp);
  return date.toDateString().slice(4);
};


export const App = () => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "https://btschwartz.com/api/v1/pics";
  
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (data.photo_objects) {
          console.log("Fetched photos:", data.photo_objects);
          const fetchedPhotos = data.photo_objects
            .map((photo) => {
              
              return {
                src: photo.fetchUrl,
                width: photo.width,
                height: photo.height,
                metadata: {
                  id: photo.id,
                  author: photo.author,
                  timestamp: trimTimestamp(photo.timestamp),
                }
              };
            });
          setPhotos(fetchedPhotos);

        } else {
          console.error("Error fetching photos: photo_objects property is missing");
        }
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  };





  const [modalShow, setModalShow]  = useState(false);

  const handleImageSubmit = (submitMessage) => {
    console.log("Submitting image:", submitMessage);
    fetchData();
  };

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
          <div className='bubbles'>
            <ParticlesBg 
                type='circle' 
                bg={true} 
                num={2} 
                />
          </div>

          <FilePickerModal
            show={modalShow}
            handleClose={() => setModalShow(false)}
            onHide={() => setModalShow(false)}
            onSubmit={handleImageSubmit}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='button-container-left'>
              <AwesomeButton type='primary' onPress={Cole}>
                <div style={styles.container}>
                  What?
                </div>
              </AwesomeButton>
              <Toaster />
            </div>

            <label className="button-container-right" htmlFor="fileUpload">
              <AwesomeButton type="secondary" onPress={() => setModalShow(true)}>
                <div style={styles.container}>Upload</div>
              </AwesomeButton>
            </label>

          </div>
          <br></br>
          {photos.length > 0 && (
            <div>
            <PhotoAlbum 
            renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
              <Tooltip 
                title={photo.metadata.author + ' - ' + photo.metadata.timestamp + ' (' + photo.metadata.id + ')'}
                followCursor
              >
              <a href={photo.href} style={wrapperStyle} target="_blank" rel="noreferrer noopener">
                  {renderDefaultPhoto({ wrapped: true })}
              </a>
              </Tooltip>
            )}
            photos={photos}
            layout="masonry" 
            padding={10}
            />
            </div>
          )}
      </div>
    </div>
  );
}

export default App;

