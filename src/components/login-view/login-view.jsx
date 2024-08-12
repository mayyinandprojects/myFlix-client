import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
   // Prevent the default form submission behavior
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handleSubmit = (event) => {

    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    fetch("https://movie-api-4o5a.onrender.com/login?username="+username+"&password="+password, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } 
        else {
          alert("No such user");
        }
      })
      .catch((e) => {
        console.error("Login error: ", e, username, password);
        alert("Something went wrong");
      });
    };

    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            required
            minLength="3" 
          />
        </Form.Group>
  
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" className="mt-3" type="submit">
          Submit
        </Button>
      </Form>
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



