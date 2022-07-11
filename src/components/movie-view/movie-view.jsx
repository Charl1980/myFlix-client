import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = { FavouriteMovies: [], };
  }

  addFavMovie = () => {
    let token = localStorage.getItem('token');
    let user = localStorage.getItem("user");
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);
    if (!isFav) {
      axios.post(`https://myflix-movies1980.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then((response) => {
          console.log(response.data);
          alert(
            `${this.props.movie.Title} has been added to your favorites`
          );
          window.open(`/movies/${this.props.movie._id}`, "_self");
        })
        .catch(e => {
          console.log('Error')
        });
    } else if (isFav) {
      alert(
        `${this.props.movie.Title} is already in your favorites`
      );
    }
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { FavouriteMovies } = this.state;
    let userFavMovies = this.state.FavouriteMovies;
    let isFav = userFavMovies.includes(this.props.movie._id);

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
              <ListGroup.Item>
                <Button variant="secondary" type="submit" onClick={this.addFavMovie}>Add to favorites</Button>
                <Button className="ml-3" onClick={() => { onBackClick(null); }} variant="secondary">Back</Button>
              </ListGroup.Item>
            </ListGroup>
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