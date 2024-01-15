import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { storeUser } from '../helper';

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [identifier, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("invalid");
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("valid");
      await loginAttempt();
      setValidated(true);
    }
    
  };

  const loginAttempt = async () => {
    try {
      const {data} = await axios.post('http://localhost:1337/api/auth/local', {identifier, password});
      console.log(data);
      if (data.jwt) {
        storeUser(data);
        toast.success("Logged in successfully!", {
          hideProgressBar: true
        });
        setUsername('');
        setPassword('');
        navigate('/home');
      }
      
    } catch (error) {
      toast.error(error.message, {
        hideProgressBar: true
      })
    }    
  };

  return (
    <div className='login-page'>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form-card">
        <Form.Group className="login-group" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              aria-describedby="inputGroupPrepend"
              required
              value={identifier}
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

        <Button color="primary" onClick={handleSubmit}>Submit form</Button>
      </Form>
      <h6>Don't have an account? Click <Link to="/register">here</Link> to register</h6>
    </div>
  );
}

export default FormExample;
