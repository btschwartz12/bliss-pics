import React from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";

import toast, { Toaster } from 'react-hot-toast';

import photos from './photos.jsx';

const styles = {
  bg: {
  },
};
const generatePhotos = (count) => {
  let items = [];
  while (items.length < count) {
    let randomIndex = Math.floor(Math.random() * photos.length);
    items.push(photos[randomIndex]);
  }
  return items;
}


const Cole = () => toast("Good 'ol Cole");
const Cole2 = () => toast("Where is wide Cole 2.0?");

export const App = () => {

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
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
                  Cole 2.0
                </div>
              </AwesomeButton>
              <Toaster />
            </div>
          </div>
          <br></br>
          <div>
            <PhotoAlbum 
            photos={generatePhotos(50)} 
            layout="masonry" 
          />
          </div>
          

      </div>
    </div>
  );
}

export default App;

