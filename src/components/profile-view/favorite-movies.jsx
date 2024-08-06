import React from 'react'
import { Row, Col,  } from "react-bootstrap";
import { MovieCard } from '../movie-card/movie-card';

function FavoriteMovies({user, favoriteMovies, handleFavoriteToggle, favoriteMovieList}) {
    return (
        <>
        <div>
        <h3>Favorite Movies</h3>
        </div>
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
    )
}

export default FavoriteMovies
