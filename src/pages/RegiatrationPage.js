import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log("invalid");
            event.preventDefault();
            event.stopPropagation();
        } else {
            console.log("valid");
            await signUpAttempt();
            setValidated(true);
        }

    };

    const signUpAttempt = async () => {
        try {
            const res = await axios.post('http://localhost:1337/api/auth/local/register', {username, email, password, role: "Public"});
            setUsername('');
            setEmail('');
            setPassword('');
            navigate('/login');
            toast.success("You signed up succesfully!", {
                hideProgressBar: true
            })
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

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!e.target.value.includes('@') || !e.target.value.includes('.')) {
            setEmailError('Not a valid email address');
        }
        else {
            setEmailError('');
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
            <Form noValidate validated={validated} onSubmit={handleSignUp} className="login-form-card">
                <Form.Group className="login-group" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={username}
                            onChange={handleUsernameChange}
                        isInvalid={usernameError !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='form-feedback'>
                            {usernameError}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="login-group" controlId="validationPassword">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={email}
                            onChange={handleEmailChange}
                            isInvalid={emailError !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='form-feedback'>
                            {emailError}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="login-group" controlId="validationPassword">
                    <Form.Label>Password</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={password}
                            onChange={handlePasswordChange}
                            isInvalid={passwordError !== ''}
                        />
                        <Form.Control.Feedback type="invalid" className='form-feedback'>
                            {passwordError}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>

                <Button color="primary" onClick={handleSignUp}>Sign up</Button>
                <div className='router'>Already have an account? Click <Link to="/login">here</Link> to log in.</div>
            </Form>
           
        </div>
    );
}

export default RegistrationPage;
