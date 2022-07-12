import React from 'react';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './profile-view.scss';

export function FavoriteMovies(props) {
  const { favoriteMovies, movies } = props;

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h5>Favorite Movies</h5>
          </Col>
        </Row>
        <Row>
          {favoriteMovies.length === 0 && <div className="text-center">Empty</div>}
          {favoriteMovies.length > 0 &&
            movies.map((movie) => {
              if (movie._id === favoriteMovies.find((fav) => fav === movie._id)) {
                return (
                  <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movie">
                    <Card className="favorites-item card-content">
                      <Card.Image className="movieCard" variant="top" src={movie.ImageURL} crossOrigin="anonymous" />
                      <Card.Body>
                        <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
                      </Card.Body>
                    </Card>
                    <Button variant="secondary" onClick={() => removeFav(movie._id)}>Remove</Button>
                  </Col>
                )
              }
            })
          }
        </Row>
      </Card.Body>
    </Card>
  )
}

export default FavoriteMovies