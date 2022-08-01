import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Routes } from 'react-router-dom';
import {
  setMovies,
  setUser
} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
//React-Bootstrap Imports
import { Container, Row, Col, Button } from 'react-bootstrap';
//Component Imports
import { Menubar } from '../navbar/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
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
        this.props.setMovies(response.data);
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
    let { movies } = this.props;
    let { user } = this.props;

    return (
      <Router>
        <Menubar user={user} />

        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:id" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.id)}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/user-update/${user}`} render={({ history }) => {
            if (!user) return <Col>
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

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  };
};

export default connect(mapStateToProps, { setMovies })(MainView);

