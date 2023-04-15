import React from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";
import ParticlesBg from 'particles-bg';

import toast, { Toaster } from 'react-hot-toast';

import photos from './photos.jsx';

const styles = {
  bg: {
  },
};
const generatePhotos = (count) => {
  let items = [];
  let photosLength = photos.length;

  // Use all photos in the original order first
  for (let i = 0; i < Math.min(count, photosLength); i++) {
    items.push(photos[i]);
  }

  // If more photos are needed, start picking randomly
  while (items.length < count) {
    let randomIndex = Math.floor(Math.random() * photosLength);
    items.push(photos[randomIndex]);
  }

  return items;
}

const Cole = () => toast("Good 'ol Cole");
const Cole2 = () => toast("Robby is sad");


const words = ["square"];


function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  console.log(words[randomIndex]);
  return words[randomIndex];
}

export const App = () => {

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
          <div className='bubbles'>
            <ParticlesBg 
                type={getRandomWord()} 
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
          <div>
            <PhotoAlbum 
            photos={generatePhotos(50)} 
            layout="masonry" 
            padding={10}
          />
          </div>
          

      </div>
    </div>
  );
}

export default App;

