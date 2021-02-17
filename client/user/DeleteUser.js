import React, {useState} from 'react';
import {Redirect} from "react-router-dom";
import auth from "../auth/auth-helper";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import {remove} from "./api-user";

function DeleteUser(props) {
    const [open, setOpen] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }
    const deleteAccount = () => {
        remove({
            userId: props.userId
        }, {t: jwt.token}).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearJWT(() => console.log('deleted'))
                setRedirect(true)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }

    if (redirect) {
        return <Redirect to='/'/>
    }

    return (
        <div>
            <Button variant="danger" onClick={clickButton}>
                Delete Account
            </Button>
            <Modal show={open} onHide={handleRequestClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete your account? This cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteAccount}>
                        DELETE
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

DeleteUser.propTypes = {
    userId: PropTypes.string.isRequired
}

export default DeleteUser;