import React from 'react'
import { Modal } from "react-bootstrap";

// --------------
// --------------
// --------------
const CenteredModal = (props) => {
    // --------------
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body className="m-3">
                {props.children}
            </Modal.Body>
        </Modal>
    )
}

export default CenteredModal
