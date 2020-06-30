import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import { useQuery } from '@apollo/client'
import { ALL_USERS } from '../queries/queries.graphql'

// --------------
// --------------
// --------------
const Dashboard = () => {
    const result = useQuery(ALL_USERS)

    // --------------
    if (result.loading) {
        // TODO: style me!
        return <div>loading...</div>
    }

    // --------------
    return (
        <Container fluid>
            <Row>
                <Col><h1>Users List</h1></Col>
                <Col>Search Input</Col>
            </Row>
            <Row>
            {result.data.allUsers.map(u =>
                <Card key={u.id}>
                    {u.name}
                </Card>
            )}
            </Row>

        </Container>
    )
}

export default Dashboard
