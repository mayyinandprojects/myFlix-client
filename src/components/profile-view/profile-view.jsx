import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserInfo from "./user-info";
import DeleteAccountButton from "./DeleteAccountButton";
import FavoriteMovies from "./favorite-movies";
import UpdateUser from "./update-user"


import axios from "axios";

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

  const favoriteMovieList = movies.filter(
    (m) => favoriteMovies.includes(String(m.id)) // Convert to string 
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
        window.location.reload();
      } else {
        await axios.delete(
          `https://movie-api-4o5a.onrender.com/users/${username}/movies/${movieId}`,
          { headers }
        );
        window.location.reload();
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
    // setUser(null);
    // setToken(null);
    localStorage.clear();
    window.location.reload();
  };

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div>
        <UserInfo name={user.name} email={user.email} />
      </div>

      <hr />
      <UpdateUser 
        user = {user} 
        handleChange ={handleChange} 
        handleSaveClick={handleSaveClick}
        handleEditClick = {handleEditClick} 
        isEditing={isEditing}
      />
      <hr />
      <div>
        <h3>Delete Account</h3>
      </div>
      <DeleteAccountButton
        username={user.username}
        token={token}
        onLoggedOut={onLoggedOut}
      />
      <hr />
      <FavoriteMovies
        user={user}
        favoriteMovies={favoriteMovies}
        handleFavoriteToggle={handleFavoriteToggle}
        favoriteMovieList={favoriteMovieList}
      />
    </>
  );
};
