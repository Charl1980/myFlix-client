import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { setUser } from '../../actions/actions';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, CardGroup, Form, Button } from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

function LoginView({ user, setUser, onLoggedIn }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://myflix-movies1980.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
    //console.log(username, password);
    //SEND A REQUEST TO THE SERVER FOR AUTHENTIFICATION, THEN CALL props.onLoggedIn(username)
    //props.onLoggedIn(username);
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <CardGroup>
            <Card className="mt-3" bg="light">
              <Card.Body>
                <Card.Title>Please Login</Card.Title>
                <Form>
                  <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="dark" type="submit" onClick={handleSubmit}>Submit</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { setUser })(LoginView);