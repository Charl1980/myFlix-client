import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Redirect, Route, Routes } from 'react-router-dom';
//React-Bootstrap Imports
import { Container, Row, Col, Button } from 'react-bootstrap';
//Component Imports
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-movies1980.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //ASSIGN THE RESULT TO THE STATE
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  onRegistration(register) {
    this.setState({
      register
    });
  }

  render() {
    const { movies, user } = this.state;

    //if (!user) return <Row>
    //  <Col>
    //    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    //  </Col>
    //</Row>

    //if (!register) return <Row>
    //  <Col>
    //    <RegistrationView onRegistration={(register) => this.onRegistration(register)} />;
    //  </Col>
    //</Row>

    //if (movies.length === 0)
    //  return <div className="main-view" />;

    return (
      <Router>
        <Menubar user={user} />

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:id" render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.id)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return
            <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />


        </Row>
      </Router>
    );
  }
}

//<Route path="/directors/:name" render={({ match, history }) => {
            //  if (movies.length === 0) return <div className="main-view" />;
            //  return <Col>
            //    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
            //      onBackClick={() => history.goBack()} />
            //  </Col>
            //}} />

            //<Route path="/genres/:name" render={({ match, history }) => {
            //  if (movies.length === 0) return <div className="main-view" />;
            //  return <Col>
            //    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
            //      onBackClick={() => history.goBack()} />
            //  </Col>
            //}} />

