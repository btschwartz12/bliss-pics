import React, { useState, useEffect } from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";
import ParticlesBg from 'particles-bg';

import toast, { Toaster } from 'react-hot-toast';

import FilePickerModal from './FilePickerModal.jsx';



const styles = {
  bg: {
  },
};


const Cole = () => toast("Good 'ol Cole");
const Cole2 = () => toast("Robby is sad");

const DEBUG =  false;


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


          if (DEBUG) {
            // change photos to a list of local images
            const localPhotos = [
              {
                src: '/images/1.jpg',
                width: 300,
                height: 600,
              },
              {
                src: '/images/2.jpg',
                width: 300,
                height: 600,
              },
              {
                src: '/images/3.jpg',
                width: 300,
                height: 600,
              },
              {
                src: '/images/4.jpg',
                width: 300,
                height: 600,
              },
            ];
            setPhotos(localPhotos);
          }

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
                  Cole
                </div>
              </AwesomeButton>
              <Toaster />
            </div>

            <label className="button-container-right" htmlFor="fileUpload">
              <AwesomeButton type="secondary" onPress={() => setModalShow(true)}>
                <div style={styles.container}>Robby</div>
              </AwesomeButton>
            </label>

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

