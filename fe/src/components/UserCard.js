import React from 'react'
import { Card } from "react-bootstrap";

// --------------
// --------------
// --------------
const UserCard = ({ user }) => {
    // --------------
    return (
        <Card>
            <div style={{
                background: `transparent url('https://source.unsplash.com/collection/3053437/${user.id}') no-repeat 50% 50%`,
                width: "168px",
                height: "168px",
                borderRadius: "100%",
                backgroundSize: "cover"
            }}></div>

            <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur…
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default UserCard
