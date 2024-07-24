export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };
  
  // in React, the only component that can
  //directly change a state is the component that owns that state, in this case, MainView.
  //that's why you cannot directly use:
  //<div
  // onClick={() => {
  //     setSelectedMovie(movie);
  //   }}
  // >
  //The easiest way to
  //pass functions as props is to pass an arrow function that includes the logic inside it.
  // onMovieClick={(newSelectedMovie) => {
  //     setSelectedMovie(newSelectedMovie);
  //   }}
  // As for the second step, open the movie-card.jsx file and make sure
  //that you extract the onMovieClick prop using object destructuring,
  //just like you did with the movie (or movieData) prop in there.
  //Then, use it in the callback function for the onClick event listener:
  // export const MovieCard = ({ movie, onMovieClick }) => {
  //     return (
  //       <div
  //         onClick={() => {
  //           onMovieClick(movie);
  //         }}
  //       >
  //         {movie.title}
  //       </div>
  //     );
  //   };
  // Note that movie passed to onMovieClick(...); is the prop you extracted earlier in main-view.jsx
  