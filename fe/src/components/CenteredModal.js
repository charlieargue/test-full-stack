import React from 'react'
import { Modal } from "react-bootstrap";
import BigButton from './BigButton';

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
            animation={false}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Body>
                {props.children}
                {/* <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
                <BigButton onClick={props.onHide}/> */}
            </Modal.Body>
        </Modal>
    )
}

export default CenteredModal
