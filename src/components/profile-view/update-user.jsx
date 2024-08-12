import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function UpdateUser({ user, handleChange, handleSaveClick, handleEditClick, isEditing, editedUser }) {

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isEditing) {
      handleSaveClick(); // Only save when in editing mode
    }
  };

  return (
    <>
      <div>
        <h2>Update Profile</h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
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

        {isEditing ? (
          <Button type="submit">Save</Button>
        ) : (
          <Button type="button" onClick={handleEditClick}>
            Edit Profile
          </Button>
        )}
      </Form>
    </>
  );
}

export default UpdateUser;
