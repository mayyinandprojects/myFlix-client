export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>Title: </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.directors}</span>
        </div>
  
        <button onClick={onBackClick}>Back</button>
      </div>
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
  