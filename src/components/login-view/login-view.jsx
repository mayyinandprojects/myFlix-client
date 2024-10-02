import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner"; // Import Spinner

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submitting

    const data = {
      username: username,
      password: password,
    };

    fetch(
      "https://movie-api-4o5a.onrender.com/login?username=" +
        username +
        "&password=" +
        password,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false); // Stop loading when done
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        setLoading(false); // Stop loading if there's an error
        console.error("Login error: ", e, username, password);
        alert("Something went wrong");
      });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Conditionally render the button or spinner based on the loading state */}
        <div className="mt-3 mb-3">
          {loading ? (
            <Button variant="primary" disabled>
              <Spinner animation="border" size="sm" role="status" aria-hidden="true" /> Logging in...
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Submit
            </Button>
          )}
        </div>
      </Form>

      <Alert className="text-center">
        If you would like to use a test account, you can login with <br />
        username: Hhl23jp231 and password: THJ234jkaf
      </Alert>
    </>
  );
};



















// To persist the authentication state between executions of the app, you’ll need to use a mechanism to save the user object and token whether the app is running or not. Then it can be stored as default value of user and taken, see const storedUser at declarations

//   fetch("https://movie-api-4o5a.onrender.com/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   }).then((response) => response.json())
//   .then((data) => {
//     console.log("Login response: ", data);
//     if (data.user) {
//       onLoggedIn(data.user, data.token);
//     } else {
//       alert("No such user");
//     }
//   })
//   .catch((e) => {
//     alert("Something went wrong");
//   });
//   // this prevents the default behavior of the form which is to reload the entire page
//   event.preventDefault();
// };
// const data = {
//   access: username,
//   secret: password,
// };
