import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FILTERED_USERS } from '../queries/queries.graphql'
import UserCard from './UserCard'
import { Col } from "react-bootstrap"
import Fade from 'react-bootstrap/Fade'
import { isEmpty } from 'lodash'




const UserList = ({ getSearchPhrase, handleOpenModal, getPage, setShowNotification, setMessage }) => {
    const [users, setUsers] = useState([])
    const result = useQuery(FILTERED_USERS, {
        variables: {
            search: getSearchPhrase(),
            page: getPage(),
        },
    })

    
    useEffect(() => {
        // You can also do a functional update 'setUsers(u => ...)' if you only need 'users' in the 'setUsers' call  react-hooks/exhaustive-deps
        if (!result.loading) {
            if (result.data.filteredUsers.length === 0) {
                // TODO: combine this into one method!
                setMessage('🚨No results: Please try again!')
                setShowNotification(true)
            } else {
                if (isEmpty(getSearchPhrase())) {
                    // if NO search phrase, append results!
                    const noDupes = (u) => {
                        // we want every new record to NOT exist in the OLD records
                        return users.find(x => x.id === u.id) === undefined
                    }
                    if (result.data.filteredUsers.every(noDupes)) {
                        setUsers([...users, ...result.data.filteredUsers])
                    } else {
                        setUsers([...result.data.filteredUsers])
                    }
                } else {
                    // if we have a search phrase, just show the most recent results
                    setUsers([...result.data.filteredUsers])
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result, getSearchPhrase, setMessage, setShowNotification])

    
    if (result.loading) {
        // TODO: style me!
        return <div>loading...</div>
    }

    
    return (
        <>
            {users.map(u =>
                <Col xs={12} sm={6} md={6} lg={4} key={u.id} >
                    <Fade in={true}>
                        <UserCard
                            user={u}
                            openModal={() => handleOpenModal(u)}>
                            {u.name}
                        </UserCard>
                    </Fade>
                </Col>
            )}
        </>
    )
}

export default UserList
