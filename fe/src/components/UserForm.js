import React, { useState } from 'react'
// import {
//     useMutation,
// } from '@apollo/client';
import { Form, Container, Row, Col } from "react-bootstrap";
import BigButton from './BigButton';

// --------------
// --------------
// --------------
const UserForm = () => {

    // component state for managing form state
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')

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
            <Container fluid>
                <Row>
                    <Col><h2>Edit User</h2></Col>
                </Row>
                <Row>
                    <Col>map</Col>
                    <Col>
                        <Form onSubmit={submit}>
                            <Form.Group controlId="formUserEdit">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name}
                                    onChange={({ target }) => setName(target.value)}
                                    type="text"
                                    placeholder="Enter name" />
                            </Form.Group>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <BigButton />
                                    </Col>
                                    <Col>
                                        <BigButton />
                                        {/* <button type='submit'>add!</button> */}
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