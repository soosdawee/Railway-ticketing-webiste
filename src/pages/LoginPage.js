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
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (e.target.value.trim() === '') {
      setUsernameError('Empty input');
    } else if (e.target.value.length < 5) {
      setUsernameError('At least 5 characters');
    }else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('At least 6 characters');
    }else {
      setPasswordError('');
    }
  };

  return (
    <div className='form-page'>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="login-form-card">
        <Form.Group className="login-group" controlId="validationCustomUsername">
          <Form.Label className='label'>Identifier</Form.Label>
          <InputGroup className='actual-input' hasValidation>
            <Form.Control
              type="text"
              placeholder="Username or Email"
              aria-describedby="inputGroupPrepend"
              required
              value={identifier}
              onChange={handleUsernameChange}
              isInvalid={usernameError !== ''}
            />
            <Form.Control.Feedback type="invalid" className='form-feedback'>
              {usernameError}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="login-group" controlId="validationPassword">
          <Form.Label className='labl'>Password</Form.Label>
          <InputGroup className='actual-input' hasValidation>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              aria-describedby="inputGroupPrepend"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            <Form.Control.Feedback type="invalid" className='form-feedback'>
              {passwordError}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Button color="primary" onClick={handleSubmit}>Log in</Button>
        <div className='router'>Don't have an account? Click <Link to="/register">here</Link> to register.</div>
      </Form>
      
    </div>
  );
}

export default FormExample;
