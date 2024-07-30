import React, { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    const data = {
      Username: username,
      Password: password
    };

    fetch("https://movie-api-4o5a.onrender.com/login", {
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
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
    };
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



  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
