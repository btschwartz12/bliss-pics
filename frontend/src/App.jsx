import React, { useState, useEffect } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";
import ParticlesBg from 'particles-bg';

import toast, { Toaster } from 'react-hot-toast';

import FilePickerModal from './FilePickerModal.jsx';
import Tooltip from '@mui/material/Tooltip';
import DeleteFileModal from './DeleteFileModal.jsx';


const styles = {
  bg: {
  },
};



const Cole = () => toast("This is a spot where I put some pictures of my dogs. I made it so you can upload your own, but please, nothing inappropriate.");


const trimTimestamp = (timestamp) => {
  
  const date = new Date(timestamp);
  // prints the date and time in EST
  return date.toLocaleString('en-US', { timeZone: 'America/New_York' }) + ' EST';
};


export const App = () => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const url = "https://icestationzebraassociates.live/api/v1/pics";
  
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        console.log("Fetched photos:", data);
        if (data.photo_objects) {
          const fetchedPhotos = data.photo_objects
            .map((photo) => {
              
              return {
                src: 'https://icestationzebraassociates.live' + photo.fetchUrl,
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
  const [deleteModalShow, setDeleteModalShow]  = useState(false);
  const [clickedPhoto, setClickedPhoto] = useState(null);

  const handleImageSubmit = (submitMessage) => {
    console.log("Submitting image:", submitMessage);
    fetchData();
  };

  const handleImageDelete = (deleteMessage) => {
    console.log("Deleting image:", deleteMessage);
    fetchData();
  };

  const handleImageClick = (photo, event) => {
    event.preventDefault(); // Add this line
    setClickedPhoto(photo);
    setDeleteModalShow(true);
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

          <DeleteFileModal
            show={deleteModalShow}
            handleClose={() => setDeleteModalShow(false)}
            onHide={() => setDeleteModalShow(false)}
            onSubmit={handleImageDelete}
            photo={clickedPhoto}
          />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='button-container-left'>
              
                <a style={styles.container} target="_blank" href="https://icestationzebraassociates.live/api/v1/auth/login" >
                <AwesomeButton type='primary' >
                  Get Access Token
                </AwesomeButton>
                </a>
              
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
                <a href={photo.href} style={wrapperStyle} target="_blank" rel="noreferrer noopener"
                  onClick={(event) => handleImageClick(photo, event)}> 
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

