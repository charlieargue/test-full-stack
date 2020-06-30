import React from 'react'
// import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { withRouter } from "react-router";

// --------------
// --------------
// --------------
const AppB = () => {
    // --------------
    return (
        <>
            {/*

            FYI/FFRF if a navbar is ever needed, would go here
            
             <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar> */}
        </>
    )
}
const AppBar = withRouter(AppB);
export default AppBar
