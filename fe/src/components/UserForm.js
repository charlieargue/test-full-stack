import React, { useState } from 'react'
// import {
//     useMutation,
// } from '@apollo/client';
import { Form, Container, Row, Col } from "react-bootstrap";
import BigButton from './BigButton';

// --------------
// --------------
// --------------
const UserForm = ({currentUser, onCancel}) => {

    // component state for managing form state
    const [name, setName] = useState(currentUser.name)
    const [location, setLocation] = useState(currentUser.location)
    const [description, setDescription] = useState(currentUser.description)

    // --------------
    const submit = async (event) => {
        event.preventDefault()

        // call our mutation hook


        // reset the form
        setName('')
        setLocation('')
        setDescription('')
    }

    // --------------
    return (
        <>
            <Container fluid className="pb-2">
                <Row>
                    <Col><h2 className="mb-5">Edit User</h2></Col>
                </Row>
                <Row>
                    <Col>map</Col>
                    <Col>
                        <Form onSubmit={submit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name}
                                    onChange={({ target }) => setName(target.value)}
                                    type="text"
                                    placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group controlId="formLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control value={location}
                                    onChange={({ target }) => setLocation(target.value)}
                                    type="text"
                                    placeholder="Enter location" />
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={description}
                                    onChange={({ target }) => setDescription(target.value)}
                                    type="text"
                                    placeholder="Enter description" />
                            </Form.Group>
                            <Container fluid className="pl-0 pt-4">
                                <Row>
                                    <Col>
                                        <BigButton text="Save" autoFocus />
                                        {/* <button type='submit'>add!</button> */}
                                    </Col>
                                    <Col>
                                        <BigButton text="Cancel" onClick={onCancel}/>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default UserForm