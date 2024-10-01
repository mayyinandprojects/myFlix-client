import { createRoot } from "react-dom/client";
//import bootstrap before the line import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { MainView } from "./components/main-view/main-view";
import Container from 'react-bootstrap/Container';
import React from 'react';


// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  // return <MainView />;
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Finds the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);






//import { MainView } from './components/main-view/main-view';
//above follows the syntax import { ComponentName } from '[path to the component file]';
//MainView component is where most of the UI coding will be. It’s better this way because src/index.jsx will only have one job, which is to bootstrap the React code and nothing else.