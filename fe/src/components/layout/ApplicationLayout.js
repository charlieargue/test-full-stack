import React from 'react'
import AppBar from './AppBar';
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";

// --------------
// --------------
// --------------
const AppLayout = ({ children }) => {

    // --------------
    return (
        <Container fluid id="wrapper">
            <AppBar />
            <Row>
                <Col xs={10} id="page-content-wrapper">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
const ApplicationLayout = withRouter(AppLayout);
export default ApplicationLayout
