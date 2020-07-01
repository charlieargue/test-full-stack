import React, { useState } from 'react'
import {
    useMutation,
} from '@apollo/client';
import { Form, Container, Row, Col } from "react-bootstrap";
import BigButton from './BigButton';
import { FILTERED_USERS, EDIT_USER } from '../queries/queries.graphql'
import Map from '../components/Map.js'

// --------------
// --------------
// --------------
const UserForm = ({ currentUser, onCancel }) => {
    const mapProps = {
        options: {
            center: { lat: 20, lng: 40 },
            zoom: 7,
        },
    }
    // component state for managing form state
    const [name, setName] = useState(currentUser.name)
    const [address, setAddress] = useState(currentUser.address)
    const [description, setDescription] = useState(currentUser.description)
    const [validated, setValidated] = useState(false)

    // --------------
    const [editUser] = useMutation(EDIT_USER, {
        refetchQueries: [
            {
                query: FILTERED_USERS,
                variables: { search: null }
            }
        ],
        // error handling!
        onError: (error) => {
            // TODO: snackar and/or alert!
            console.error(error)
        }
    })
    // --------------
    const submit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true);
            return
        }

        // call our mutation hook
        editUser({
            variables: {
                id: currentUser.id,
                name,
                address,
                description,
            }
        })

        // reset the form
        setName('')
        setAddress('')
        setDescription('')

        // and close it
        onCancel()
    }

    // --------------
    return (
        <>
            <Container fluid className="pb-2">
                <Row>
                    <Col><h2 className="mb-5">Edit User</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <Map {...mapProps} />
                    </Col>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={submit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control value={name || ''}
                                    onChange={({ target }) => setName(target.value)}
                                    type="text"
                                    required
                                    placeholder="Enter name" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a name
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Location</Form.Label>
                                <Form.Control value={address || ''}
                                    onChange={({ target }) => setAddress(target.value)}
                                    type="text"
                                    required
                                    placeholder="Enter location" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a location
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control value={description || ''}
                                    onChange={({ target }) => setDescription(target.value)}
                                    type="text"
                                    required
                                    placeholder="Enter description" />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a description
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Container fluid className="pl-0 pt-4">
                                <Row>
                                    <Col>
                                        <BigButton type="submit" text="Save" autoFocus />
                                    </Col>
                                    <Col>
                                        <BigButton text="Cancel" onClick={onCancel} />
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