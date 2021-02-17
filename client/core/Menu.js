import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
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

const Menu = withRouter(({ history }) => {
    return (
        <Navbar bg="dark" expand="lg">
            <Navbar.Brand href="/">Mern Skeleton</Navbar.Brand>

            <Nav className="mr-auto">
                <Link to="/" style={isActive(history, "/")}>Home</Link>
                <Link to="/users" style={isActive(history, "/users")}>Users</Link>
                {
                    !auth.isAuthenticated() && (
                        <Fragment>
                            <Link to="/signup" style={isActive(history, "/signup")}>Sign Up</Link>
                            <Link to="/signin" style={isActive(history, "/signin")}>Sign In</Link>
                        </Fragment>
                    )
                }
                {
                    auth.isAuthenticated() && (
                        <Fragment>
                            <Link to={"/user/" + auth.isAuthenticated().user._id}
                                      style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
                                My Profile
                            </Link>
                            <Button variant="warning" onClick={() => auth.clearJWT(() => history.push('/')) }>
                                Sign Out
                            </Button>
                        </Fragment>
                    )
                }
            </Nav>
        </Navbar>
    );
})

export default Menu;