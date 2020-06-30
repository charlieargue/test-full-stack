import React from 'react'
import { Button } from "react-bootstrap";

// --------------
// --------------
// --------------
const BigButton = (props) => {
    const styles = {
        background: '#FFFFFF',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        borderRadius: '8px',
    }
    // --------------
    return (
        <Button {...props}
            className="px-5 py-3 mt-5"
            style={styles}
            variant="light"
            size="lg">Load More</Button>
    )
}

export default BigButton
