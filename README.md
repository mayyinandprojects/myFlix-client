# myFlixDB

myFlixDB is a demo web application built with React that allows users to browse, view details, and manage their favorite movies. Users can sign up, log in, view a list of movies, see details about each movie, and manage their profile and favorite movies.

## Features

- User authentication (sign up, login, logout)
- Browse a list of movies
- View detailed information about each movie
- Manage a list of favorite movies
- View and edit user profiles
- Loading skeleton animations for improved user experience during data fetching

## Live Demo
[myFlixDB Live Demo](https://myflixmoviedatabase.netlify.app)

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
- **React Loading Skeleton:** For displaying loading skeleton animations during data fetching.

## API

The app communicates with a backend API to fetch and update data. The base URL for the API is:

### Endpoints Used

For more information on the API and endpoints used, visit the GitHub Page [Movie API](https://github.com/mayyinandprojects/Movie-API).

## Packaging

To package the application for deployment, you can use Parcel. Follow these steps:

1. **Install Dependencies:**
   Ensure you have all necessary dependencies installed. Run the following command in the project directory:
   ```bash
   npm install
   ```

2. Build the Application: Run the following command to build the application:
   ```bash
   npm run start
   ```
3. Deploy: The output will be in the dist directory. You can deploy this directory to your favorite hosting service (e.g., Netlify, Vercel, or your own server).

## License
This project is licensed under the MIT License - see the LICENSE file for details.




