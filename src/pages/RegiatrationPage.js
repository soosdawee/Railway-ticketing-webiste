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
        } catch (error) {
            toast.error(error.message, {
                hideProgressBar: true
            })
        }
    };

    return (
        <div className='registration-page'>
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
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group controlId="validationPassword">
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            aria-describedby="inputGroupPrepend"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                    </InputGroup>
                </Form.Group>

                <Button color="primary" onClick={handleSignUp}>Sign up</Button>
            </Form>
        </div>
    );
}

export default RegistrationPage;
