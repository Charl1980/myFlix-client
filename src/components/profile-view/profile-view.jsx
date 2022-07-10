import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://myflix-movies1980.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])

  const handleDelete = () => {
    axios.delete(`https://myflix-movies1980.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted.`)
        localStorage.clear();
        window.open('./register', '_self');
      })
      .catch(error => console.error(error))
  }

  return (
    <Container>
      <Row className="mt-4 justify-content-md-center">
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your profile</Card.Title>
              <Row>
                <Col className="font-weight-bold label">Username:</Col>
              </Row>
              <Row className="mb-3">
                <Col className="value">{user.Username}</Col>
              </Row>
              <Row>
                <Col className="font-weight-bold label">Password:</Col>
              </Row>
              <Row className="mb-3">
                <Col className="value">********</Col>
              </Row>
              <Row>
                <Col className="font-weight-bold label">Email:</Col>
              </Row>
              <Row className="mb-3">
                <Col className="value">{user.Email}</Col>
              </Row>
              <Row>
                <Col className="font-weight-bold label">Birthday:</Col>
              </Row>
              <Row>
                <Col className="value">{user.Birthday}</Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Update your profile</Card.Title>
              <Row>
                <UpdateUser user={user} />
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <FavoriteMovies favoriteMovies={favoriteMovies} />

      <Button variant="dark" onClick={handleDelete}>Delete profile</Button>
    </Container>
  );
}

//<Col xs={12} sm={4}>
//<Card>
//  <Card.Body>
//    <UserInfo name={user.Username} email={user.Email} />
//  </Card.Body>
//</Card>
//</Col>
//<Row>
//<Col xs={12} sm={8}>
//  <Card>
//    <Card.Body>

//    </Card.Body>
//  </Card>
//</Col>
//</Row>
