import React from 'react'
import { Form } from "react-bootstrap";

// --------------
// --------------
// --------------
const SearchForm = ({ updateSearchMethod, phrase }) => {
    const styles = {
        width: "400px",
    }

    // --------------
    const handleSearch = ({ target }) => {
        console.log('target.value', target.value)
        updateSearchMethod(target.value)
    };

    // --------------
    return (
        <Form.Group
            controlId="formSearchUsers"
            className="float-right mr-1"
            style={styles}>
            <Form.Control
                value={phrase}
                onChange={handleSearch}
                type="text"
                placeholder="Search..." />
        </Form.Group>
    )

}

export default SearchForm