import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Row, Col, Button } from "react-bootstrap";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);

  return (
<>
  <Row className="mb-4">
    <Col md={6}>
      <img className="w-100" src={movie.image} alt={movie.title} />
    </Col>
    <Col md={6}>
      <Row className="mb-3">
        <Col>
          <h2>Movie Details</h2>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col xs="auto" className="font-weight-bold">Title:</Col>
        <Col>{movie.title}</Col>
      </Row>
      <Row className="mb-2">
        <Col xs="auto" className="font-weight-bold">Description:</Col>
        <Col>{movie.description}</Col>
      </Row>
      <Row className="mb-2">
        <Col xs="auto" className="font-weight-bold">Director:</Col>
        <Col>{movie.directors}</Col>
      </Row>
      <Row className="mb-2">
        <Col xs="auto" className="font-weight-bold">Genre:</Col>
        <Col>{movie.genre}</Col>
      </Row>
      <Row className="mb-2">
        <Col xs="auto" className="font-weight-bold">Actors:</Col>
        <Col>{movie.actors}</Col>
      </Row>
      <Row>
        <Col className="text-left">
          <Link to={`/`}>
            <Button className="back-button">Back to Movie List</Button>
          </Link>
        </Col>
      </Row>
    </Col>
  </Row>
</>
  );
};





















  //add the function prop onBackClick:
  //export const MovieView = ({ movie, onBackClick }) => {
  //call the function prop onBackClick when the button click occurs:
  //<button onClick={onBackClick}>Back</button>
  //Notice that this time you’re not creating an arrow function that calls onBackClick like before with onMovieClick—this is a shortened version that works
  //because onClick takes a function and it so happens that onBackClick is a function itself.
  //for reference, the onMovieClick
  // onMovieClick={(newSelectedMovie) => {
  //     setSelectedMovie(newSelectedMovie);
  //   }}
  //last step is to add onBackClick logic in MainView
  