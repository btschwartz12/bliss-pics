import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import './bootstrap.css';

function ImagePicker({ show, handleClose, onSubmit }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);


    const onClose = () => {
        setSelectedFile(null);
        setIsSubmitting(false);
        setErrorAlert(null);
        handleClose();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrorAlert(null);
        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch('https://btschwartz.com/api/v1/pics/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                onSubmit(data);
                onClose();
            })
            .catch((error) => {
                setErrorAlert('Image too large or error uploading image')
                console.error('Error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <>
        <Modal show={show} onHide={onClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Select an image</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="imageFilePicker">
                        <Form.Label>Select an image file:</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button
                    variant={isSubmitting ? "secondary" : "primary"}
                    onClick={handleSubmit}
                    disabled={!selectedFile || isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ImagePicker;
