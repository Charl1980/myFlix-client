import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container>
        <Row className="movie-view">
          <Col sm={12} md={4}>
            <Image className="movie-poster" src={movie.ImageURL} />
          </Col>
          <Col sm={12} md={8}>
            <ListGroup className="mt-3">
              <ListGroup.Item
                className="movie-title d-flex justify-content-between align-items-start"
              >
                <div>
                  <div>Title:</div>
                  {movie.Title}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="movie-genre d-flex justify-content-between align-items-start"
              >
                <div>
                  <div>Genre:</div>
                  {movie.Genre.Name}
                </div>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">Genre</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className="movie-description d-flex justify-content-between align-items-start"
              >
                <div>
                  <div>Description:</div>
                  {movie.Description}
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                className="movie-director d-flex justify-content-between align-items-start"
              >
                <div>
                  <div>Director:</div>
                  {movie.Director.Name}
                </div>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">Director</Button>
                </Link>
              </ListGroup.Item>
              <ListGroup.Item
                className="movie-actors d-flex justify-content-between align-items-start"
              >
                <div>
                  <div>Actors:</div>
                  {movie.Actors}
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Button className="mt-3" onClick={() => { onBackClick(null); }} variant="secondary">Back</Button>
          </Col>
        </Row >
      </Container>
    );
  }
}

MovieView.propTypes = {
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
  }).isRequired
};

//<div className="movie-title">
//<span className="label">Title: </span>
//<span className="value">{movie.Title}</span>
//</div>
//<div className="movie-genre">
//<span className="label">Genre: </span>
//<span className="value">{movie.Genre.Name}</span>
//</div>
//<div className="movie-description">
//<span className="label">Description: </span>
//<span className="value">{movie.Description}</span>
//</div>
//<div className="movie-director">
//<span className="label">Director: </span>
//<span className="value">{movie.Director.Name}</span>
//</div>
//<div className="movie-actors">
//<span className="label">Actors: </span>
//<span className="value">{movie.Actors}</span>
//</div>

//className="ms-2 me-auto"