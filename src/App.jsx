import React from 'react';


import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import './App.css';


const title = 'Hey!'
const tagline = 'Welcome to my website! Check out my stuff below.'


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
  
  
]





const MovingElement = ({ element: Element, ...props }) => {
  return (
    <div>
      <Element {...props} />
    </div>
  );
};


const Buttons = () => {
  
  return (
    <div className="button-container">
      {buttonData.map((button, index) => {
        return (
          <MovingElement key={index} element={() =>
            <AwesomeButton type={button.type} target="_blank" href={button.link}>{button.text}</AwesomeButton>}>
          </MovingElement>
        )
      })}
        
    </div>
  );
}

const Title = () => {
  return (
    <div className="container">
      <MovingElement type='fadeIn' element={() => 
        <h1 className='intro'>{title}</h1>}>
      </MovingElement>      
    </div>
  );
}



const Tagline = () => {
  return (
    <div className="container">
      <MovingElement type='fadeIn' element={() => 
        <div className="tagline">
          {tagline}
        </div>}>
      </MovingElement> 
    </div>
  );
}


const App = () => {

  return (
    <div className='daylight' style={styles.bg}>
      <div
        className='default'
      >
        <main className="App-main">
          <Title />
          <Tagline />
          <Buttons />


        </main>
      </div>
    </div>
  );
}

export default App;
