import React, { useState } from 'react'
import { Form } from "react-bootstrap";

// --------------
// --------------
// --------------
const SearchForm = () => {
    const [search, setSearch] = useState('')
    const styles = {
        width: "400px",
    }

    // --------------
    return (
        <Form.Group
            controlId="formSearchUsers"
            className="float-right mr-1"
            style={styles}>
            <Form.Control value={search}
                onChange={({ target }) => setSearch(target.value)}
                type="text"
                placeholder="Search..." />
        </Form.Group>
    )

}

export default SearchForm