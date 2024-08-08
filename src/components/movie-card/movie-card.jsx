import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export const MovieCard = ({ movie, isFavorite, onFavoriteToggle, username }) => {
  const [isFav, setIsFav] = useState(isFavorite);

  const handleFavoriteClick = () => {
    // Toggle the local state first
    setIsFav(prev => !prev);
    // Notify the parent component to update the favorite status
    onFavoriteToggle(movie.id, !isFav);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.directors}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        <Button 
          variant={isFav ? "danger" : "secondary"} 
          onClick={handleFavoriteClick}
        >
          {isFav ? "Unfavorite" : "Favorite"}
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired, //addusername proptype
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
  // Here, you set the static PropTypes property on MovieCard to an object that contains special values provided as utilities by prop-types. These values help specify what the MovieCard props should look like.

// The props object must include a movie object (shape({...}) means that it’s an object).
// The movie prop (object) may contain a title key; if it does, then it must be of type string.
// The props object must contain onMovieClick and it must be a function.
// If you want a prop to be optional, make sure you check for that property's presence before using it. For example, if you made image optional, you’d need to add a conditional that checks whether movie.image is present before using {movie.image} inside MovieCard. This is done to avoid raising errors in case image was set to null in the API.
//prop-types can help you catch errors when passing props, which is great as it means you don’t have to rely on your users catching errors in the browser!