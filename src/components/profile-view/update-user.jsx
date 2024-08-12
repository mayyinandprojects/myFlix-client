import React, { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

function UpdateUser({
  user,
  handleChange,
  handleSaveClick,
  handleEditClick,
  isEditing,
  editedUser,
}) {
  const nameInputRef = useRef(null); // Create a ref for the name input field

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      handleSaveClick(); // Only save when in editing mode
    }
  };

  useEffect(() => {
    if (isEditing && nameInputRef.current) {
      nameInputRef.current.focus(); // Focus the name input field when editing starts
    }
  }, [isEditing]);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex justify-content-between align-items-center">
          <Col>
            <h2>Update Profile</h2>
          </Col>
          <Col className="d-flex justify-content-end">
            {isEditing ? (
              <Button type="submit">Save</Button>
            ) : (
              <Button type="button" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            ref={nameInputRef} // Attach the ref to the name input field
            name="name"
            value={isEditing ? editedUser.name : user.name}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            name="username"
            value={isEditing ? editedUser.username : user.username}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={isEditing ? editedUser.email : user.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            name="birthday"
            type="date"
            value={isEditing ? editedUser.birthday : user.birthday}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </Form.Group>
      </Form>
    </>
  );
}

export default UpdateUser;
