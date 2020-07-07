import React from 'react'
import { Form } from "react-bootstrap";




// NOTE: how is phrase being used exactly???
const SearchForm = ({ setSearchDebounced, phrase, setPage }) => {
    const styles = {
        width: "400px",
    }

    
    const handleSearch = ({ target }) => {
        setPage(0)
        setSearchDebounced(target.value)
    };

    
    return (
        <Form.Group
            className="float-right mr-1"
            style={styles}>
            <Form.Control
                value={phrase}
                onChange={handleSearch}
                type="text"
                id="searchForm"
                placeholder="Search..." />
        </Form.Group>
    )

}

export default SearchForm