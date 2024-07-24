import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
        "id": 1,
        "title": "Inception",
        "image": "https://ia.media-imdb.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1._SX640_SY948_.jpg",
        "director": "Christopher Nolan",
    },
    {
        "id": 2,
        "title": "The Dark Knight",
        "image": "https://image.tmdb.org/t/p/original/eP5NL7ZlGoW9tE9qnCdHpOLH1Ke.jpg",
        "director": "Christopher Nolan",
    },
    {
        "id": 3,
        "title": "Pulp Fiction",
        "image": "https://image.tmdb.org/t/p/original/pbWgQPC6l9pkpEpi3WNRSfWYNP6.jpg",
        "director": "Quentin Tarantino",
    },
    {
        "id": 4,
        "title": "The Shawshank Redemption",
        "image": "https://image.tmdb.org/t/p/original/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        "director": "Frank Darabont",
    },
    {
        "id": 5,
        "title": "The Godfather",
        "image": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        "director": "Francis Ford Coppola",
    },
  ]);
  //if movie is clicked or selected, load MovieView
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
  );
  }

  //loop to load list of movie Titles at movies.map
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button
        onClick={() => {
          alert("Nice!");
        }}
      >
        Click me!
      </button>
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
