import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import auth from "./../auth/auth-helper";
import Button from "react-bootstrap/Button";

const isActive = (history, path) => {
    if (history.location.pathname == path)
        return {color: '#ff4081'}
    else
        return {color: '#ffffff'}
}

function Menu({ history }) {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/">Mern Skeleton</Navbar.Brand>

            <Nav className="mr-auto">
                <Nav.Link href="/" style={isActive(history, "/")}>Home</Nav.Link>
                <Nav.Link href="/users" style={isActive(history, "/users")}>Users</Nav.Link>
                {
                    !auth.isAuthenticated() && (
                        <Fragment>
                            <Nav.Link style={isActive(history, "/signup")} href="/signup">Sign Up</Nav.Link>
                            <Nav.Link style={isActive(history, "/signin")} href="/signin">Sign In</Nav.Link>
                        </Fragment>
                    )
                }
                {
                    auth.isAuthenticated() && (
                        <Fragment>
                            <Nav.Link href={"/user/" + auth.isAuthenticated().user._id}
                                      style={isActive(history, "/user" + auth.isAuthenticated().user._id)}>
                                My Profile
                            </Nav.Link>
                            <Button variant="warning" onClick={() => auth.clearJWT(() => history.push('/')) }>
                                Sign Out
                            </Button>
                        </Fragment>
                    )
                }
            </Nav>
        </Navbar>
    );
}

export default withRouter(Menu);