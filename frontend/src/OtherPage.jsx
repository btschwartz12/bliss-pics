
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './App.css';
import { Container, Button, Form, Spinner, Modal, Row } from 'react-bootstrap';


const ImageSlide = ({ file, token, index }) => {
    const [imageSrc, setImageSrc] = useState(null);
  
    useEffect(() => {
      fetch(`https://api.btschwartz.com/api/v1/pics/image/${file}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(imageUrl => setImageSrc(imageUrl))
      .catch(error => console.log(error));
    }, [file, token]);
  
    return (
      <div className="each-slide-effect">
        <p style={{color: 'white', textAlign: 'center'}}>{index + 1}</p> {/* Number of the picture */}
        {imageSrc && <img src={imageSrc} alt={`slide-${index}`} style={{ width: '100%', height: 'auto' }} />}
      </div>
    );
  };


const Example = () => {
    // const images2 = [
    //     "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    //     "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    //     "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    // ];

    const [images, setImages] = useState([]);
    const [token, setToken] = useState('');
    const [directory, setDirectory] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const handleModalClose = () => setShowModal(false);
    const handleModalOpen = () => setShowModal(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        fetch("https://api.btschwartz.com/api/v1/pics/gene", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                // other headers...
            },
            body: new URLSearchParams({
                'dir_path': directory,
            }),
        })
        .then(response =>  {
            if (!response.ok)
                throw Error(response.statusText);
            return response.json()
        })
        .then(data => {
            if (data.files) {
                setImages(data.files);
                setLoading(false);
                handleModalClose();
            }
        })
        .catch(error => {
            console.log(error);
            setLoading(false);
        });

    };

    return (
        <>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                <Modal.Title>Enter Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formToken">
                    <Form.Control 
                        type="text" 
                        placeholder="Token" 
                        value={token}
                        onChange={e => setToken(e.target.value)}
                        style={{marginBottom: "15px"}}
                    />
                    </Form.Group>
                    <Form.Group controlId="formDir">
                    <Form.Control 
                        type="text" 
                        placeholder="Directory Path" 
                        value={directory}
                        onChange={e => setDirectory(e.target.value)}
                        style={{marginBottom: "15px"}}
                    />
                    </Form.Group>


                    <Button variant="danger" type="submit" style={{marginTop: "15px"}}>
                    {loading ? <Spinner animation="border" size="sm"/> : 'Submit'}
                    </Button>
                </Form>
                </Modal.Body>
            </Modal>
            <Button 
                variant="danger" 
                onClick={handleModalOpen} 
                style={{ width: '100%', margin: '10px 0' }}>
                Enter Token
            </Button>
            {images.length > 0 &&
                <Slide transitionDuration={100}>
                {images.map((file, index) => (
                  <ImageSlide key={index} file={file} token={token} index={index} />
                ))}
              </Slide>
            }
        </>
    );
};

export default Example;


