import React from "react";
import { Container, Row, Col, Card, CardGroup, Form, Button } from 'react-bootstrap';

function UpdateUser({ handleSubmit, handleUpdate }) {
  return (
    //<form className="profile-form" onSubmit={(e) => handleSubmit(e)}></form>
    <>
      <h2>Want to update your profile?</h2>
      <Form>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            defaultValue={user.Username}
            onChange={e => handleUpdate(e)}
            required
            placeholder="Enter a username" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            defaultValue={user.Password}
            onChange={e => handleUpdate(e)}
            required
            minLength="8"
            placeholder="Minimum of 8 characters required" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            defaultValue={user.Email}
            onChange={e => handleUpdate(e.target.value)}
            required
            placeholder="Enter a valid email address" />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>Update</Button>

      </Form>
    </>
  )
}

export default UpdateUser