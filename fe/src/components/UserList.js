import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { FILTERED_USERS } from '../queries/queries.graphql'
import UserCard from './UserCard'
import { Col } from "react-bootstrap"
import Fade from 'react-bootstrap/Fade'
import { isEmpty } from 'lodash'

// --------------
// --------------
// --------------
const UserList = ({ getSearchPhrase, handleOpenModal, getPage, setShowNotification, setMessage }) => {
    const [users, setUsers] = useState([])
    const result = useQuery(FILTERED_USERS, {
        variables: {
            search: getSearchPhrase(),
            page: getPage(),
        },
    })

    // --------------
    useEffect(() => {
        // You can also do a functional update 'setUsers(u => ...)' if you only need 'users' in the 'setUsers' call  react-hooks/exhaustive-deps
        if (!result.loading) {
            if (result.data.filteredUsers.length === 0) {
                // TODO: combine this into one method!
                setMessage('🚨No results: Please try again!')
                setShowNotification(true)
            } else {
                if (isEmpty(getSearchPhrase())) {
                    // ONLY if NOT searching actively!
                    // if NO search phrase, append results!
                    // NOTE: only if we didn't just clear the search!
                    // if (getClearedSearch() === false) {
                    console.log('getSearchPhrase() :>> ', getSearchPhrase());
                    console.log('setting users, NO SEARCH PHRASE')

                    // add logic here to what, make sure that no ideas from target are already in source?
                    // sheeesh
                    const noDupes = (u) => {
                        // we want every new record to NOT exist in the OLD records
                        return users.find(x => x.id === u.id) === undefined
                    }
                    if (result.data.filteredUsers.every(noDupes)) {
                        console.log('setting users, NO SEARCH PHRASE ---> ✅ NO DUPES, ok to append!')
                        setUsers([...users, ...result.data.filteredUsers])
                    } else {
                        console.log('setting users, NO SEARCH PHRASE, ❌ cannot APPEND, got dupes')
                        setUsers([...result.data.filteredUsers])
                    }
                    // } else {
                    //     console.log('setting users, search phrase was just cleared!')
                    //     setUsers([...result.data.filteredUsers])
                    // }
                } else {
                    console.log('setting users, we got a search phrease')
                    // if we have a search phrase, just show the most recent results
                    setUsers([...result.data.filteredUsers])
                }
            }
        }
    }, [result.data])

    // --------------
    if (result.loading) {
        // TODO: style me!
        return <div>loading...</div>
    }

    // --------------
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
