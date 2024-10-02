import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from 'react-loading-skeleton';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to handle user logout
  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    // window.location.reload();
    localStorage.clear();
    
  };

  const handleFavoriteToggle = async (movieId, isFavorite) => {
    const storedToken = localStorage.getItem("token");
    const username = user.username;

    try {
      const headers = { Authorization: `Bearer ${storedToken}` };

      if (isFavorite) {
        await axios.post(
          `https://movie-api-4o5a.onrender.com/users/${username}/movies/${movieId}`,
          {},
          { headers }
        );
        const user = JSON.parse(localStorage.getItem("user"));
        user.favorite_movies.push(movieId);
        localStorage.setItem("user", JSON.stringify(user));
        setFavoriteMovies([...user.favorite_movies]);
      } else {
        await axios.delete(
          `https://movie-api-4o5a.onrender.com/users/${username}/movies/${movieId}`,
          { headers }
        );
        const user = JSON.parse(localStorage.getItem("user"));
        const favorites = user.favorite_movies.filter((id) => id !== movieId);
        user.favorite_movies = [...favorites];
        localStorage.setItem("user", JSON.stringify(user));
        setFavoriteMovies([...favorites]);
      }
    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

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
          actors: movie.actors?.join(", ") || "Unknown Actors",
          releaseYear: movie.release_year,
          rating: movie.rating,
        }));
        setMovies(moviesFromApi);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
        // setLoading(false);
      });

    fetch("https://movie-api-4o5a.onrender.com/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const usersFromApi = data.map((user) => ({
          userId: user._id,
          name: user.name,
          username: user.username,
          password: user.password,
          email: user.email,
          birthday: user.birthday.substring(0, 10),
          favoriteMovies: user.favorite_movies || [],
        }));
        setUsers(usersFromApi);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  useEffect(() => {
    if (user) {
      setFavoriteMovies(user.favorite_movies);
    }
  }, [user]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
    <BrowserRouter>
      <NavigationBar user={user} 
      onLoggedOut= {onLoggedOut}
      // onLoggedOut={() => localStorage.clear()} 
      />
      <Row className="justify-content-md-center mt-5">
        <Routes>
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                  />
                  <Col md={12} className="text-center my-3">
                    <span>
                      <Link to="/signup">Click here to Signup</Link>
                    </span>
                  </Col>
                </Col>
              )
            }
          />
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                  <Col md={12} className="text-center my-3">
                    <span>
                      <Link to="/login">Return to Login</Link>
                    </span>
                  </Col>
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  {loading ? (
                    <Skeleton height={600} width={400} />
                  ) : (
                    <MovieView movies={movies} />
                  )}
                </Col>
              )
            }
          />
          <Route
            path="/users/:userId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={12}>
                  <ProfileView
                    users={users}
                    favoriteMovies={favoriteMovies}
                    handleFavoriteToggle={handleFavoriteToggle}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                filteredMovies.length === 0 ? (
                  <>
                    <Row className="justify-content-md-center mt-2">
                      <Col xs={12} className="text-center mb-2">
                        <h1>Movie List</h1>
                        <input
                          type="text"
                          placeholder="Filter by title"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          className="mb-3"
                          style={{ width: "60%" }}
                        />
                      </Col>
                    </Row>
                    <Alert
                      style={{ width: "30%" }}
                      className="mx-auto text-center"
                    >
                      No movies match your search!
                    </Alert>
                    <Row>
                      <Col md={3}>
                        <Skeleton height={550} />
                      </Col>
                      <Col md={3}>
                        <Skeleton height={550} />
                      </Col>
                      <Col md={3}>
                        <Skeleton height={550} />
                      </Col>
                      <Col md={3}>
                        <Skeleton height={550} />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="justify-content-md-center mt-2">
                      <Col xs={12} className="text-center mb-2">
                        <h1>Movie List</h1>
                        <input
                          type="text"
                          placeholder="Filter by title"
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          className="mb-3"
                          style={{ width: "60%" }}
                        />
                      </Col>
                    </Row>
                    {loading ? (
                      <Row>
                        {[...Array(4)].map((_, idx) => (
                          <Col key={idx} className="mb-5" md={3}>
                            <Skeleton height={800} width={600} />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      filteredMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard
                            movie={movie}
                            isFavorite={favoriteMovies.includes(
                              String(movie.id)
                            )}
                            onFavoriteToggle={handleFavoriteToggle}
                            username={user.username}
                          />
                        </Col>
                      ))
                    )}
                  </>
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
    </SkeletonTheme>
  );
};

//Revision notes:
//Browsers can't understand JSX directly and will need a compiler like Babel
//Expressions can be embedded using {} - more notes in my notion page
//const [movies, setMovies] = useState([]); is same as as:
//let movies = [];
// const setMovies = function(newMovieList){
//   movies = newMoviesList;
// };
//The map() method in the code just shown maps each element in the movies array to a piece of UI
//The value of the key attribute must be guaranteed to be unique. For this activity, you can use the id property of each movie as the value because each movie has a unique id.
