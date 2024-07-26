import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://movie-api-4o5a.onrender.com/movies")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
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
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};


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
