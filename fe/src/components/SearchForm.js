import React from 'react'
import { Form } from "react-bootstrap";

// --------------
// --------------
// --------------
// NOTE: how is phrase being used exactly???
const SearchForm = ({ setSearchDebounced, phrase, setPage, setClearedSearch }) => {
    const styles = {
        width: "400px",
    }

    // --------------
    const handleSearch = ({ target }) => {
        console.log('target.value', target.value)
        // if we just reset the search, we have to reset the users array!
        setPage(0)
        // if (isEmpty(target.value)) {
        //     // set global indicating cleared search form to true
        //     setClearedSearch(true)
        // } else {
        //     // set global indicating cleared search form to false
        //     setClearedSearch(false)
        // }
        setSearchDebounced(target.value)
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