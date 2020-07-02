import React, { useState, useCallback, useEffect } from 'react'
import {
    useMutation,
} from '@apollo/client'
import { Form, Container, Row, Col } from "react-bootstrap"
import BigButton from './BigButton'
import { FILTERED_USERS, EDIT_USER } from '../queries/queries.graphql'
import Map from '../components/Map.js'
import { debounce } from 'lodash'
import Geocode from "react-geocode"
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)


// --------------
// --------------
// --------------
const UserForm = ({ currentUser, onCancel, getPage, setShowNotification, setMessage }) => {
    // component state for managing form state
    const initialCoords = {
        lat: -1.2884,
        lng: 36.8233
    }
    const [name, setName] = useState(currentUser.name)
    const [address, setAddress] = useState(currentUser.address)
    const [description, setDescription] = useState(currentUser.description)
    const [validated, setValidated] = useState(false)
    const [locationCoordinates, setLocationCoordinates] = useState(initialCoords)
    const [showMap, setShowMap] = useState(false)

    // --------------
    const [editUser] = useMutation(EDIT_USER, {
        refetchQueries: [
            {
                query: FILTERED_USERS,
                variables: {
                    search: null,
                    page: getPage(),
                }
            }
        ],
        // error handling!
        onError: (error) => {
            // TODO: combine this into one method!
            console.log('error :>> ', error);
            setMessage('🚨Duplicate: Names must be unique!')
            setShowNotification(true)
        },
        onCompleted: () => {
            console.log('onCompleted')
            // reset the form
            setName('')
            setAddress('')
            setDescription('')
            // reset showMap
            setShowMap(false)

            // and close it
            onCancel()
        }
    })
    // --------------
    const submit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation()
            setValidated(true)
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


    }

    // --------------
    const getLatLongFromAddress = async (strLocation) => {
        console.log('🔥 TRYING: strLocation :>> ', strLocation);
        // Get latidude & longitude from address.
        try {
            const response = await Geocode.fromAddress(strLocation)
            const { lat, lng } = response.results[0].geometry.location
            console.log(lat, lng)
            return {
                lat,
                lng
            }
        } catch (error) {
            // could not find location, return some recognizable place as default
            // --------------
            return initialCoords
        }
    }

    // --------------
    const debouncedGeocoding = useCallback(debounce(async (strLocation) => {
        console.log('🇿🇼 debounced GEOCODING!')
        const newCoords = await getLatLongFromAddress(strLocation)
        setLocationCoordinates(newCoords)
        setShowMap(true)
    }, 500), [])

    // --------------
    const handleAddressChange = async ({ target }) => {
        setAddress(target.value)
        debouncedGeocoding(target.value)
    }

    // -------------- TODO: why the getter again?
    const getterShowMap = () => showMap

    // --------------
    useEffect(() => {
        debouncedGeocoding(currentUser.address)
    }, [currentUser.address, debouncedGeocoding])

    // --------------
    return (
        <>
            <Container fluid className="pb-2">
                <Row>
                    <Col><h2 className="mb-5">Edit User</h2></Col>
                </Row>
                <Row>
                    <Col>
                        <Map
                            getterShowMap={getterShowMap}
                            locationCoordinates={locationCoordinates} />
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
                                    onChange={handleAddressChange}
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