import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from '@apollo/client'
import { ALL_USERS } from '../queries/queries.graphql'
import UserCard from './UserCard';
import BigButton from './BigButton';
import CenteredModal from './CenteredModal';
import UserForm from './UserForm';
import SearchForm from './SearchForm';

// --------------
// --------------
// --------------
const Dashboard = () => {
    const result = useQuery(ALL_USERS)
    const [modalShow, setModalShow] = React.useState(false);
    const [currentUser, setCurrentUser] = useState(null)

    // --------------
    const handleOpenModal = (cu) => {
        console.log('cu', cu)
        setCurrentUser(cu)
        setModalShow(true)
    }

    // --------------
    if (result.loading) {
        // TODO: style me!
        return <div>loading...</div>
    }

    // --------------
    return (
        <>
            <Container fluid>
                <Row>
                    <Col><h1 className="mb-5">Users list</h1></Col>
                    <Col xs={12} md={6}><SearchForm /></Col>
                </Row>
                <Row>
                    {result.data.allUsers.map(u =>
                        <Col xs={12} sm={6} md={6} lg={4} key={u.id} >
                            <UserCard
                                user={u}
                                openModal={() => handleOpenModal(u)}>
                                {u.name}
                            </UserCard>
                        </Col>
                    )}
                </Row>
                <Row className="text-center">
                    <Col>
                        <BigButton className="mx-auto mt-5" />
                    </Col>
                </Row>
            </Container>
            <CenteredModal
                show={modalShow}
            >
                <UserForm 
                currentUser={currentUser} 
                onCancel={() => setModalShow(false)}
                />
            </CenteredModal>
        </>
    )
}

export default Dashboard
