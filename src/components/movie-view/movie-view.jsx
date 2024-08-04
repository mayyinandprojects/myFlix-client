import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.directors}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
    </div>
  );
};

// import { useParams } from "react-router";
// import { Link } from "react-router-dom";
// import "./movie-view.scss";
// import Col from 'react-bootstrap/Col'
// import Row from "react-bootstrap/Row";

// export const MovieView = ({ movie, onBackClick }) => {
//     return (
//       <Row className="justify-content-md-center mt-5">
//          <Col md={6}>
//           <img src={movie.image} />
//           </Col>
//         <Col md={6}>
//         <div>
//           <span>Title: </span>
//           <span>{movie.title}</span>
//         </div>
//         <div>
//           <span>Director: </span>
//           <span>{movie.directors}</span>
//         </div>
  
//         <button 
//         onClick={onBackClick} className="back-button md={3}"
//         style={{ cursor: "pointer" }}
//         >Back</button>
//         </Col>
//       </Row>
//     );
//   };
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
  