import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import './bootstrap.css';

function DeleteFileModal({ show, handleClose, onSubmit, photo }) {
    const [accessToken, setAccessToken] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);



    const onClose = () => {
        setAccessToken('');
        setIsSubmitting(false);
        setErrorAlert(null);
        handleClose();
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        setErrorAlert(null);

        fetch('https://api.btschwartz.com/api/v1/pics/' + photo.metadata.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
            },
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    return response.json();
                } else if (response.status === 403) { // Check for a 403 status
                    throw Error('Forbidden');
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                onSubmit(data);
                onClose();
            })
            .catch((error) => {
                if (error.message === 'Forbidden') {
                    setErrorAlert('Access denied. Please check your access token.');
                } else {
                    setErrorAlert('Error deleting image');
                }
                console.error('Error:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    const handleAccessTokenChange = (event) => {
        setAccessToken(event.target.value);
    };


    return (
        <>
        <Modal show={show} onHide={onClose} centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                {photo && (
                <div>
                    <p><strong>Author:</strong> {photo.metadata.author}</p>
                    <p><strong>Timestamp:</strong> {photo.metadata.timestamp}</p>
                    <p><strong>ID:</strong> {photo.metadata.id}</p>
                </div>
                )}
                {errorAlert && <Alert variant="danger">{errorAlert}</Alert>}
                <Form>
                    <Form.Group className="mb-3" controlId="accessToken">
                        <Form.Label>Token:</Form.Label>
                        <Form.Control
                            type="text"
                            value={accessToken}
                            onChange={handleAccessTokenChange}
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
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default DeleteFileModal;
