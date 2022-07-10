import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row className="mt-4 justify-content-md-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Genre</Card.Title>
                <Row className="mt-3">
                  <Col className="font-weight-bold label">Genre:</Col>
                  <Col className="value">{genre.Name}</Col>
                </Row>
                <Row className="mt-3">
                  <Col className="font-weight-bold label">Description:</Col>
                  <Col className="value">{genre.Description}</Col>
                </Row>
                <Button className="mt-3" onClick={() => { onBackClick(null); }} variant="secondary">Back</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    )
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired
};