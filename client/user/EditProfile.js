import React, {useEffect, useState} from 'react';

import auth from "./../auth/auth-helper";
import {Redirect} from "react-router-dom";

import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import {read, update} from "./api-user"

function EditProfile({ match }) {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false
    })

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({ userId: match.params.userId }, {t: jwt.token}, signal).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })

        return function cleanup(){
            abortController.abort()
        }

    }, [match.params.userId])

    const clickSubmit = (event) => {
        event.preventDefault()
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }

        update({ userId: match.params.userId }, { t: jwt.token }, user).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true})
            }
        })
    }

    const handleChange = (name, event) => {
        setValues({...values, [name]: event.target.value })
    }

    if(values.redirectToProfile) {
        return <Redirect to={'/user/' + values.userId}/>
    }

    return (
        <div>
            <Card>
                <Card.Title>Edit Profile</Card.Title>
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
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default EditProfile;