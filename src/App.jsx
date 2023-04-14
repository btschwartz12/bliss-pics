import React from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';

import PhotoAlbum from "react-photo-album";

import photos from './photos';

const styles = {
  bg: {
  },
}

const buttonData = [
  {
    text: 'Portfolio',
    link: 'https://btschwartz.com/portfolio/',
    type: 'primary'
  },
  {
    text: 'Resume',
    link: 'https://drive.google.com/file/d/1wCPzd7fiAko-PfaizeCkd8ZChVdLK7eA/view?usp=sharing',
    type: 'secondary'
  },
  {
    text: 'Instagram Clone',
    link: 'https://btschwartz.com/insta',
    type: 'danger'
  },
];




const Buttons = () => {
  
  return (
    <div className="button-container">
      {buttonData.map((button, index) => {
        return (
          <>
            <AwesomeButton key={index} type={button.type} target="_blank" href={button.link}>{button.text}</AwesomeButton>
          </>
        )
      })}
        
    </div>
  );
}

export const App = () => {

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
          <PhotoAlbum photos={photos} layout="masonry" />

      </div>
    </div>
  );
}

export default App;

// export default function App() {
//     return <PhotoAlbum photos={photos} layout="masonry" />;
// }


