import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserInfo from "./user-info";
import DeleteAccountButton from "./DeleteAccountButton";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user";
import { Card, Container, Row, Col } from "react-bootstrap";

export const ProfileView = ({
  users = [],
  favoriteMovies,
  handleFavoriteToggle,
  setFavoriteMovies,
  onLoggedOut
}) => {
  const { userId } = useParams();
  // Find the user by ID
  const user = users.find((u) => u.userId === userId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);

  // Debugging for favorite movies not showing up: Explicit Check for favorite_movies:
  // In the new version, you're explicitly checking both user and user.favorite_movies. This ensures that the favorite_movies property is defined before trying to update favoriteMovies. 
  // If user.favorite_movies is undefined, the setFavoriteMovies function is skipped, preventing issues.

  useEffect(() => {
    if (user && user.favorite_movies) {
      setFavoriteMovies(user.favorite_movies);
    }
  }, [user, setFavoriteMovies]);

  


  useEffect(() => {
    if (!token) return;

    fetch("https://movie-api-4o5a.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.title,
          image: movie.imageurl,
          directors: movie.directors?.[0]?.name || "Unknown Director",
          genre: movie.genre?.name || "Unknown Genre",
          description: movie.description,
          featured: movie.featured,
          actors: movie.actors,
          releaseYear: movie.release_year,
          rating: movie.rating,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
      });
  }, [token]);

  const favoriteMovieList = movies.filter(
    (m) => favoriteMovies.includes(String(m.id)) // Convert to string
  );

  // console.log(favoriteMovieList);

  // Initialize editedUser with user data when switching to edit mode
  const handleEditClick = (event) => {
    event.preventDefault();
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
  const handleSaveClick = async (event) => {
    try {
      //event.preventDefault();

      const response = await fetch(
        `https://movie-api-4o5a.onrender.com/users/${user.username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }

      // Update the user data in local state after successful response
      Object.assign(user, editedUser);

      setIsEditing(false);
      console.log(isEditing);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo name={user.name} email={user.email} />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            {/* <Card>
          <Card.Body> */}
            <UpdateUser
              user={user}
              handleChange={handleChange}
              handleSaveClick={handleSaveClick}
              handleEditClick={handleEditClick}
              isEditing={isEditing}
              editedUser={editedUser}
            />

            <hr />
            <Row className="d-flex justify-content-between align-items-center">
              <Col>
                <h3>Delete Account</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <DeleteAccountButton
                  username={user.username}
                  token={token}
                  onLoggedOut={onLoggedOut}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <hr />
        <FavoriteMovies
          user={user}
          favoriteMovies={favoriteMovies}
          handleFavoriteToggle={handleFavoriteToggle}
          favoriteMovieList={favoriteMovieList}
        />
      </Container>
    </>
  );
};
