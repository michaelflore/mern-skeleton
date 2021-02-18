import React, {useEffect, useState} from 'react';

import auth from './../auth/auth-helper';
import {read} from './api-user.js';
import {Redirect, Link} from 'react-router-dom';

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import DeleteUser from "./DeleteUser";

function Profile({ match }) {

    const [user, setUser] = useState({});
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const jwt = auth.isAuthenticated();

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read({ userId: match.params.userId }, {t: jwt.token}, signal)
            .then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup(){
            abortController.abort()
        }

    }, [match.params.userId])

    if (redirectToSignin) {
        return <Redirect to='/signin'/>
    }

    return (
        <Card style={{ width: '30rem' }}>
            <Card.Img src={
                user._id
                    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
                    : '/api/users/defaultphoto'
            } title="Avatar" />
            <Card.Body>
                <Card.Title>Profile</Card.Title>
                    <ListGroup>
                        <ListGroup.Item>
                            { user.name }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            { user.email }
                        </ListGroup.Item>
                        <ListGroup.Item>
                            { user.about }
                        </ListGroup.Item>
                        {
                            auth.isAuthenticated().user && auth.isAuthenticated().user._id == user._id &&
                            (<ListGroup.Item>
                                <Link to={"/user/edit/" + user._id}>
                                    Edit
                                </Link>
                                <DeleteUser userId={user._id}/>
                            </ListGroup.Item>)
                        }
                        <ListGroup.Item>
                            { "Joined: " + (new Date(user.created)).toDateString() }
                        </ListGroup.Item>
                    </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Profile;