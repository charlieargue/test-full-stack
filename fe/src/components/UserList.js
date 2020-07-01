import React from 'react'
import { useQuery } from '@apollo/client'
import { FILTERED_USERS } from '../queries/queries.graphql'
import UserCard from './UserCard'
import { Col } from "react-bootstrap"

// --------------
// --------------
// --------------
const UserList = ({ getSearchPhrase, handleOpenModal }) => {
    const result = useQuery(FILTERED_USERS, {
        variables: {
            search: getSearchPhrase()
        },
    })
    
    // --------------
    if (result.loading) {
        // TODO: style me!
        return <div>loading...</div>
    }

    // --------------
    return (
        <>
            {result.data.filteredUsers.map(u =>
                <Col xs={12} sm={6} md={6} lg={4} key={u.id} >
                    <UserCard
                        user={u}
                        openModal={() => handleOpenModal(u)}>
                        {u.name}
                    </UserCard>
                </Col>
            )}

        </>
    )
}

export default UserList
