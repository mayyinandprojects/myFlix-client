import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserInfo from "./user-info";
import DeleteAccountButton from './DeleteAccountButton'; 
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ users = [] }) => {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const storedToken = localStorage.getItem("token");
  const [token, setToken] = useState(storedToken);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);  
  const [movies, setMovies] = useState([]);

  // Find the user by ID
  const user = users.find((u) => u.userId === userId);

  useEffect(() => {
    if (user) {
      setFavoriteMovies(user.favoriteMovies);
    }
  }, [user]);

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

  // console.log(movies);
  // console.log(favoriteMovies);


  const favoriteMovieList = movies.filter(
    (m) => favoriteMovies.includes(String(m.id)) // Convert to string if necessary
  );

  console.log(favoriteMovieList);

  const handleFavoriteToggle = async (movieId, isFavorite) => {
    const storedToken = localStorage.getItem("token");
    const username = user.username; // Adjust this if user identification is different

    try {
      const headers = {
        Authorization: `Bearer ${storedToken}`,
      };

      if (isFavorite) {
        await axios.post(
          `https://movie-api-4o5a.onrender.com/users/${username}/movies/${movieId}`,
          {},
          { headers }
        );
      } else {
        await axios.delete(
          `https://movie-api-4o5a.onrender.com/users/${username}/movies/${movieId}`,
          { headers }
        );
      }

      // Re-fetch or update local state to reflect changes
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

 
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
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };
  
  


 


  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
     <div>
        <UserInfo name={user.name} email={user.email} />
      </div>
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
      <hr/>

      <div>
      <h3>Delete Account</h3>
    </div>
    <DeleteAccountButton username={user.username} token={token} />



      <>
      <Row className="justify-content-md-center mt-5">
        {favoriteMovieList.map((movie) => (          
          <Col className="mb-5" key={movie.id} md={4}>
            <MovieCard
              movie={movie}
              isFavorite={favoriteMovies.includes(String(movie.id))} // Assuming favoriteMovies is an array of movie IDs
              onFavoriteToggle={handleFavoriteToggle}
              username={user.username}
            />
          </Col>
         
          
        ))} </Row>
      </>
    </>
  );
};


{/* <>
      <h2>Favorite Movies</h2>
      {favoriteMovies.length === 0 ? (
          <p>No favorite movies found.</p>
        ) : (
          favoriteMovieList.map((movie) => (
            <Col className="mb-5" key={movie.id} md={4}>
            <Card className="h-100" key={movie.id}>
            <Card.Img variant="top" src={movie.image} alt={movie.title} />
            <Card.Body>
              <Card.Title>
                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                  {movie.title}
                </Link>
              </Card.Title>
            </Card.Body>
          </Card>
          </Col>
          ))
        )}
      </> */}


      {/* <div>
        <h2>Favorite Movies</h2>

        {favoriteMovies.length === 0 ? (
          <p>No favorite movies found.</p>
        ) : (
          favoriteMovieList.map((movie) => (
            // const movies = movies.find((m) => m._id === movie);
            <div key={movie.id}>
              <img src={movie.image} alt={movie.title} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.title}</h4>
              </Link>
            </div>
          ))
        )}
      </div> */}