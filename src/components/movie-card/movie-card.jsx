import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, CardGroup, Card, Button } from 'react-bootstrap';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      //<div className="movie-card" onClick={() => onMovieClick(movie)}>{movie.Title}</div>
      <Row>
        <Col>
          <CardGroup>
            <Card bg="light" className="my-3">
              <Card.Img variant="top" src={movie.ImageURL} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="secondary">Open</Button>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
