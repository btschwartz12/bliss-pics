import React, { useState, useEffect } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";
import ParticlesBg from 'particles-bg';

import toast, { Toaster } from 'react-hot-toast';



const styles = {
  bg: {
  },
};


const Cole = () => toast("Good 'ol Cole");
const Cole2 = () => toast("Robby is sad");




export const App = () => {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const url = "https://btschwartz.com/api/v1/pics";
  
    fetch(url, { credentials: "same-origin" })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (data.photo_objects) {
          const fetchedPhotos = data.photo_objects
            .map((photo) => {
              return {
                src: photo.fetchUrl,
                width: photo.width,
                height: photo.height,
              };
            });
          console.log(fetchedPhotos);
          setPhotos(fetchedPhotos);
        } else {
          console.error("Error fetching photos: photo_objects property is missing");
        }
      })
      .catch((error) => {
        console.error("Error fetching photos:", error);
      });
  }, []);

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
          <div className='bubbles'>
            <ParticlesBg 
                type='square' 
                bg={true} 
                num={30} 
                />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='button-container-left'>
              <AwesomeButton type='primary' onPress={Cole}>
                <div style={styles.container}>
                  Cole
                </div>
              </AwesomeButton>
              <Toaster />
            </div>

            <div className='button-container-right'>
              <AwesomeButton type='secondary' onPress={Cole2}>
                <div style={styles.container}>
                  Robby
                </div>
              </AwesomeButton>
              <Toaster />
            </div>
          </div>
          <br></br>
          {photos.length > 0 && (
            <div>
            <PhotoAlbum 
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

