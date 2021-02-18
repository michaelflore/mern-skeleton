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
        about: '',
        photo: '',
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
                setValues({...values, name: data.name, email: data.email, about: data.about})
            }
        })

        return function cleanup(){
            abortController.abort()
        }

    }, [match.params.userId])

    const clickSubmit = (event) => {
        event.preventDefault()

        let user = new FormData();
        values.name && user.append('name', values.name)
        values.email && user.append('email', values.email)
        values.password && user.append('password', values.password)
        values.about && user.append('about', values.about)
        values.photo && user.append('photo', values.photo)


        update({ userId: match.params.userId }, { t: jwt.token }, user).then((data) => {
            if (data && data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, userId: data._id, redirectToProfile: true})
            }
        })
    }

    const handleChange = (name, event) => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        setValues({...values, [name]: value })
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
                        <Form.Group controlId="formGroupTextarea">
                            <Form.Label>About:</Form.Label>
                            <Form.Control as="textarea" rows={3} value={values.about}
                                          onChange={e => handleChange('about', e)}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.File custom>
                                <Form.File.Input onChange={e => handleChange('photo', e)} isValid/>
                                <Form.File.Label data-browse="Browse">Upload Photo</Form.File.Label>
                                <Form.Control.Feedback type="valid">{values.photo.name}</Form.Control.Feedback>
                            </Form.File>
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