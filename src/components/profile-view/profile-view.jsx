import { useState } from 'react';
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const ProfileView = ({ users = [] }) => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);

  // Find the user by ID
  const user = users.find((u) => u.userId === userId);
  // Initialize editedUser with user data when switching to edit mode
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  // Handle input changes
  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  // Handle save action
  const handleSaveClick = async () => {
    try {
      // const token = {token}; 
      const response = await fetch(`https://movie-api-4o5a.onrender.com/users/${user.username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify(editedUser),
      });

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      // Update the user data in local state after successful response
      Object.assign(user, editedUser);

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
            {/* <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          value={isEditing ? editedUser.name : user.name}
          onChange={handleChange}
          disabled={!isEditing}
        />
      </Form.Group> */}

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
        {isEditing ? 'Save' : 'Edit Profile'}
      </Button>
    </>
  );
};

