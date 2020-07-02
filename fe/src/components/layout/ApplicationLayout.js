import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { withRouter } from "react-router";

// --------------
// --------------
// --------------
const AppLayout = ({ children }) => {
    
    // --------------
    return (
        <Container className="py-5 px-1" fluid id="wrapper">
            <Row className="py-5 px-1 row-centered" >
                <Col xs={11} id="page-content-wrapper">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
const ApplicationLayout = withRouter(AppLayout);
export default ApplicationLayout
