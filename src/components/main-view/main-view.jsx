import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Link } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);

    // Function to handle user logout
    const onLoggedOut = () => {
      setUser(null);
      setToken(null);
      localStorage.clear();
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
    <NavigationBar user={user} onLoggedOut={onLoggedOut} />
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
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              user ? ( // Check if the user is logged in
                movies.length === 0 ? ( // Check if there are any movies
                  <div>The list is empty!</div> // Show a message if no movies are available
                ) : (
                  <>
                    <Row className="justify-content-md-center mt-5">
                      <Col xs={12} className="text-center">
                        <h1>Movie List</h1>
                      </Col>
                    </Row>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) =>
                            setSelectedMovie(newSelectedMovie)
                          }
                        />
                      </Col>
                    ))}
                  </>
                )
              ) : (
                <Navigate to="/login" /> // Redirect to login if user is not logged in
              )
            }
          />
        </Routes>
        {user && (
          <Col xs={12} className="text-left mt-3 mb-3">
            <Button
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </Button>
          </Col>
        )}
      </Row>
    </BrowserRouter>
  );
};




  // return (
  //   <div>
  //     {movies.map((movie) => (
  //       <MovieCard
  //         key={movie.id}
  //         movie={movie}
  //         onMovieClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //     ))}
  //     <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
  //   </div>
  // );
//};

//export keyword exposes the MainView component, enabling the component to be imported in other files.
//inside the MainView is JSX, similar to HTML
//A Component Can Only Have One Root Element e.g. if use <div> that has to be used first, not <button>
//MainView component is where most of the UI coding will be.
// the alternative to arrow function would be:
// function MainView() {
//   ...
// }
// export { MainView };
//Instead of a <div> or <span>, you can also use a piece of built-in React markup: <React.Fragment></React.Fragment>.
//to use <React.Fragment> make sure to import React from "react";
//alternatively, <></> can be used to replace <React.Fragment>. supposedly <React.Fragment> is too long or undwieldy so this short-hand exists.
//Browsers can't understand JSX directly and will need a compiler like Babel
//Expressions can be embedded using {} - more notes in my notion page
//const [movies, setMovies] = useState([]); is same as to:
//let movies = [];
// const setMovies = function(newMovieList){
//   movies = newMoviesList;
// };
//The map() method in the code just shown maps each element in the movies array to a piece of UI
//The value of the key attribute must be guaranteed to be unique. For this activity, you can use the id property of each movie as the value because each movie has a unique id.
