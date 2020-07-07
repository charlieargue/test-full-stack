import React from 'react'
import { Toast, Alert } from "react-bootstrap"




const Notification = ({ setShowNotification, getShowNotification, getMessage }) => {
    
    return (
        <Toast
            onClose={() => setShowNotification(false)}
            show={getShowNotification()}
            delay={3000}
            autohide
            style={{
                position: 'absolute',
                top: '10px',
                right: "calc(50% - 100px)",
                zIndex: "1000000"
            }}
        >
            <Toast.Header>
                <span role='img' aria-label='yo'>❌&nbsp;</span>
                <strong className="mr-auto">Error</strong>
            </Toast.Header>
            <Alert variant="danger" className="m-2">
                {getMessage()}
            </Alert>
        </Toast>
    )
}

export default Notification
