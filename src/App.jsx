
import React, { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import AwesomeButtom from 'react-awesome-button';



const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 5,
    backgroundColor: "#AEDEF4",
  },
  text: {
    color: '#fff',
    fontSize: 15
  }
};



export const App = () =>{
  const [showAlert, setShowAlert] = useState(false);

  const showAlertHandler = () => {
    setShowAlert(true);
  };

  const hideAlertHandler = () => {
    setShowAlert(false);
  };

  return (
    <div style={styles.container}>
        <div>Bruh Alert</div>
        <AwesomeButtom type='primary' onPress={showAlertHandler}>
          <div style={styles.container}>
            Try me!
          </div>
        </AwesomeButtom>

        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="AwesomeAlert"
          message="I have a message for you!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Yes, delete it"
          confirmButtonColor="#DD6B55"
          onCancelPressed={hideAlertHandler}
          onConfirmPressed={hideAlertHandler}
        />
    </div>
      
  );
};




export default App;