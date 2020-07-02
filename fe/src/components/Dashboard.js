import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import BigButton from './BigButton'
import CenteredModal from './CenteredModal'
import UserForm from './UserForm'
import UserList from './UserList'
import SearchForm from './SearchForm'
import { debounce } from 'lodash'

// --------------
// --------------
// --------------
const Dashboard = () => {
    const [modalShow, setModalShow] = React.useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [search, setSearch] = useState('')

    // --------------
    const handleOpenModal = (cu) => {
        setCurrentUser(cu)
        setModalShow(true)
    }

    // --------------
    const getSearchPhrase = () => {
        return search
    }

    // --------------
    const setSearchDebounced = debounce(setSearch, 1000)

    // --------------
    return (
        <>
            <Container fluid>
                <Row>
                    <Col><h1 className="mb-5">Users list</h1></Col>
                    <Col xs={12} md={6}>
                        <SearchForm
                            setSearchDebounced={setSearchDebounced} />
                    </Col>
                </Row>
                <Row>
                    <UserList
                        handleOpenModal={handleOpenModal}
                        getSearchPhrase={getSearchPhrase} />
                </Row>
                <Row className="text-center">
                    <Col>
                        <BigButton className="mx-auto mt-5" />
                    </Col>
                </Row>
            </Container>
            <CenteredModal
                show={modalShow}
            >
                <UserForm
                    currentUser={currentUser}
                    onCancel={() => setModalShow(false)}
                />
            </CenteredModal>
        </>
    )
}

export default Dashboard
