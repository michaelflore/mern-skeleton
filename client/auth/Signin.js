import React, {useState} from 'react';
import auth from './auth-helper';
import { signin } from './api-auth.js';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Redirect } from "react-router-dom";

function Signin(props) {
    const [values, setValues] = useState({
        email: '',
        password: '',
        redirectToRef: false,
        error: ''
    });

    const handleChange = (name, event) => {
        setValues({ ...values, [name]: event.target.value });
    }

    const clickSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }

        signin(user).then((data) => {
            if(data.error) {
                setValues({ ...values, error: data.error })
            } else {
                auth.authenticate(data, () => {
                    setValues({ ...values, error: '', redirectToRef: true })
                })
            }
        })
    }

    const { from } = props.location.state || {
        from: {
            pathname: '/'
        }
    }
    const { redirectToRef } = values;

    if (redirectToRef) {
        return (<Redirect to={from}/>)
    }

    return (
        <div>
            <Card>
                <Card.Title>Sign In</Card.Title>
                <Card.Body>
                    { values.error && (<Alert variant="danger">{values.error}</Alert>)}
                    <Form>
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
                            Sign In
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Signin;