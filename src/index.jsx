import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { MainView } from './components/main-view/main-view';

//IMPORT STATEMENT TO INDICATE THAT YOU NEED TO BUNDLE `./index.scss`
import './index.scss';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Nav } from 'react-bootstrap';

//MAIN COMPONENT - WILL EVENTUALLY USE ALL THE OTHERS
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>

        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="#home">myFlix</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#register">Register</Nav.Link>
              <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <MainView />

      </Container>
    );
  }
}

//FINDS ROOT OF APP
const container = document.getElementsByClassName('app-container')[0];

//TELLS React TO RENDER APP IN THE ROOT DOM ELEMENT
ReactDOM.render(React.createElement(MyFlixApplication), container);

//<div className="my-flix">
//<div>Good morning</div>
//</div>