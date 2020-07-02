import React, { useState } from 'react'
import { Container, Row, Col } from "react-bootstrap"
import BigButton from './BigButton'
import CenteredModal from './CenteredModal'
import UserForm from './UserForm'
import UserList from './UserList'
import SearchForm from './SearchForm'
import { debounce } from 'lodash'
import { scrollToBottom } from '../services/utilities.service'
import { useHistory } from "react-router-dom";

// --------------
// --------------
// --------------
const Dashboard = ({ setShowNotification, setMessage }) => {
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [search, setSearch] = useState(null)
    const [page, setPage] = useState(0)

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
    const getPage = () => {
        return page
    }

    // --------------
    const setSearchDebounced = debounce(setSearch, 1000)

    // --------------
    const handleLoadMore = () => {
        setPage(page + 1)
        history.push(`/?page=${page}`)
        setTimeout(scrollToBottom, 500)
    }

    // --------------
    return (
        <>
            <Container fluid>
                <Row>
                    <Col><h1 className="mb-5">Users list</h1></Col>
                    <Col xs={12} md={6}>
                        <SearchForm
                            setPage={setPage}
                            setSearchDebounced={setSearchDebounced} />
                    </Col>
                </Row>
                <Row>
                    <UserList
                        handleOpenModal={handleOpenModal}
                        getSearchPhrase={getSearchPhrase}
                        getPage={getPage}
                        setShowNotification={setShowNotification}
                        setMessage={setMessage}
                    />
                </Row>
                <Row className="text-center">
                    <Col>
                        <BigButton
                            id="btnLoadMore"
                            onClick={handleLoadMore}
                            className="mx-auto mt-5" />
                    </Col>
                </Row>
            </Container>
            <CenteredModal
                show={modalShow}
            >
                <UserForm
                    setMessage={setMessage}
                    setShowNotification={setShowNotification}
                    getPage={getPage}
                    currentUser={currentUser}
                    onCancel={() => setModalShow(false)}
                />
            </CenteredModal>
        </>
    )
}

export default Dashboard
