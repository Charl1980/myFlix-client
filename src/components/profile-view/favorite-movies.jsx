import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export function FavoriteMovies({ favoriteMovies }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h5>Favorite Movies</h5>
          </Col>
        </Row>
        <Row>
          {favoriteMovies.map((movie) => {
            return (
              <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movie">
                <Card>
                  <Link to={`/movies/${movie._id}`}>
                    <Card.Image variant="top" src={movie.ImageURL} />
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                    </Card.Body>
                  </Link>
                </Card>
                <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove</Button>
              </Col>
            )
          })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

//export default FavoriteMovies