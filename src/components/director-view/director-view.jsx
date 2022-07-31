import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row className="mt-4 justify-content-md-center">
          <Col xs={12} md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Director Bio</Card.Title>
                <Row>
                  <Col className="font-weight-bold label">Director:</Col>
                  <Col className="value">{director.Name}</Col>
                </Row>
                <Row className="mt-3">
                  <Col className="font-weight-bold label">Biography:</Col>
                  <Col className="value">{director.Bio}</Col>
                </Row>
                <Row className="mt-3">
                  <Col className="font-weight-bold label">Year of birth:</Col>
                  <Col className="value">{director.Birth}</Col>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired
};