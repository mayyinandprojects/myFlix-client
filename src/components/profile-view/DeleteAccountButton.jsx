import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


  const DeleteAccountButton = ({ username, token }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://movie-api-4o5a.onrender.com/users/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Clear local storage or state if needed
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error("Error deleting account:", error);
      // Optionally handle errors here
    }
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)} variant="danger">
        Delete Account
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => {
            handleDeleteClick();
            setShowModal(false);
          }}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeleteAccountButton