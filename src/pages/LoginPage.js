import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Perform your GraphQL query validation here using username and password variables
      // Example: You can use Apollo Client to send a mutation or query to your GraphQL server

      // Simulated validation
      const isValid = await simulateServerValidation(username, password);

      if (isValid) {
        console.log('Form is valid. Perform GraphQL query here.');
      } else {
        console.log('Invalid username or password.');
      }
    }

    setValidated(true);
  };

  const simulateServerValidation = async (username, password) => {
    // Simulate server validation logic
    // You can replace this with your actual GraphQL query validation logic
    return new Promise((resolve) => {
      // Simulate asynchronous server request
      setTimeout(() => {
        // Return true if validation succeeds, false otherwise
        resolve(username === 'validUser' && password === 'validPassword');
      }, 1000);
    });
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="validationCustomUsername">
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            aria-describedby="inputGroupPrepend"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid username.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="validationPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            aria-describedby="inputGroupPrepend"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a valid password.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default FormExample;
