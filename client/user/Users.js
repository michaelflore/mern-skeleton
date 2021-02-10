import React, {useEffect, useState} from 'react';
import {list} from "./api-user";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        //The list method gets all users
        list(signal).then((data) => {
            if(data && data.error) {
                console.log(data.error)
            } else {
                //Set the state
                setUsers(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [])

    return (
        <Card>
            <Jumbotron>
                <h1>All Users</h1>
            </Jumbotron>
            <ListGroup>
                {
                    users.map((user, i) => {
                        return (
                            <Link to={"/user/" + user._id} key={i}>
                                <ListGroup.Item>
                                    <Card.Img src="holder.js/100px180" title="Avatar"></Card.Img>
                                    <Card.Title>{user.name}</Card.Title>
                                    <Button>Arrow</Button>
                                </ListGroup.Item>
                            </Link>
                        )
                    })
                }
            </ListGroup>
        </Card>
    );
}

export default Users;