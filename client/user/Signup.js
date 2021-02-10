import React, {useState} from 'react';
import {create} from './api-user';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import {Link} from "react-router-dom";

function Signup() {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });

    const handleChange = (name, event) => {
        setValues({ ...values, [name]: event.target.value });
    }

    const handleClose = () => {
        setValues({ ...values, error: '', open: false });
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        create(user).then((data) => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', open: true })
            }
        })
    }

    return (
        <div>
            <Card>
                <Card.Title>Sign Up</Card.Title>
                <Card.Body>
                    { values.error && (<Alert variant="danger">{values.error}</Alert>)}
                    <Form>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={values.name}
                                          onChange={e => handleChange('name', e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={values.email}
                                          onChange={e => handleChange('email', e)} />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={values.password}
                                          onChange={e => handleChange('password', e)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={clickSubmit}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={values.open} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>New Account Created!</Modal.Body>
                <Modal.Footer>
                    <Link to="/signin">
                        <Button variant="secondary">
                            Sign In
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Signup;