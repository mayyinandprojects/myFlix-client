import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Row, Col, Button } from "react-bootstrap";

function UpdateUser({user, handleChange, handleSaveClick, handleEditClick, isEditing}) {
  return (
    <>
      <div>
        <h2>Profile Settings</h2>
      </div>

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={isEditing ? editedUser.name : user.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          value={isEditing ? editedUser.username : user.username}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          value={isEditing ? editedUser.email : user.email}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Birthday</Form.Label>
        <Form.Control
          name="birthday"
          value={isEditing ? editedUser.birthday : user.birthday}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Form.Group>

      <Button onClick={isEditing ? handleSaveClick : handleEditClick}>
        {isEditing ? "Save" : "Edit Profile"}
      </Button>
    </>
  );
}

export default UpdateUser;
