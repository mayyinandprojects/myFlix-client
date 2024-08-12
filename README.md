# myFlixDB

myFlixDB is a demo web application that is built with React that allows users to browse, view details, and manage their favorite movies. Users can sign up, log in, view a list of movies, see details about each movie, and manage their profile and favorite movies.


## Features

- User authentication (sign up, login, logout)
- Browse a list of movies
- View detailed information about each movie
- Manage a list of favorite movies
- View and edit user profiles

## Live Demo
https://myflixmoviedatabase.netlify.app

## Usage

1. **Sign Up or Log In:**

    - Navigate to the sign-up page if you don't have an account.
    - Log in with your credentials.

2. **Browse Movies:**

    - After logging in, you'll be redirected to the main movie list.
    - Click on any movie to view its details.

3. **Manage Favorite Movies:**

    - On the movie details page, you can add or remove a movie from your favorites.
    - View your favorite movies on your profile page.

4. **User Profile:**

    - Access your profile to view and edit your personal information.
    - Manage your list of favorite movies directly from your profile.

## Components

- **MainView:** The main component that handles routing and renders the appropriate views.
- **NavigationBar:** Contains links for navigation and the logout button.
- **LoginView:** Handles user login.
- **SignupView:** Handles user registration.
- **MovieCard:** Displays a brief overview of each movie.
- **MovieView:** Shows detailed information about a specific movie.
- **ProfileView:** Displays and manages user information and favorite movies.


## Dependencies

- **React:** A JavaScript library for building user interfaces.
- **React Router:** For handling routing within the app.
- **Axios:** For making HTTP requests to the backend API.
- **React Bootstrap:** Provides pre-built components for responsive UI design.

## API

The app communicates with a backend API to fetch and update data. The base URL for the API is:


### Endpoints Used

For more information on the API and endpoints used, visit the Github Page [Movie API](https://github.com/mayyinandprojects/Movie-API).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
