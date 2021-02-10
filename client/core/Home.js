import React from 'react';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";

function Home() {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Header>
                <Card.Title>Home Page!</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Img variant="top" src="holder.js/100px180" title="Home image"/>
                <Card.Text>
                    Welcome to the mern skeleton home page!
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Home;