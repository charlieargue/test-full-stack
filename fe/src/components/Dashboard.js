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
const Dashboard = () => {
    const history = useHistory()
    const [modalShow, setModalShow] = React.useState(false);
    const [currentUser, setCurrentUser] = useState(null)
    const [search, setSearch] = useState(null)
    const [page, setPage] = useState(0)
    const [clearedSearch, setClearedSearch] = useState(false)

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
    const getClearedSearch = () => {
        return clearedSearch
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
                            setClearedSearch={setClearedSearch}
                            setPage={setPage}
                            setSearchDebounced={setSearchDebounced} />
                    </Col>
                </Row>
                <Row>
                    <UserList
                        handleOpenModal={handleOpenModal}
                        getSearchPhrase={getSearchPhrase}
                        getPage={getPage}
                        getClearedSearch={getClearedSearch}
                    />
                </Row>
                <Row className="text-center">
                    <Col>
                        <BigButton onClick={handleLoadMore} className="mx-auto mt-5" />
                    </Col>
                </Row>
            </Container>
            <CenteredModal
                show={modalShow}
            >
                <UserForm
                    getPage={getPage}
                    currentUser={currentUser}
                    onCancel={() => setModalShow(false)}
                />
            </CenteredModal>

            {/* DEVVING  
            <pre style={{ color: "#333", position: "fixed", top: "10px", right: "50px", border: "2px solid yellow", backgroundColor: "rgb(255, 255, 255, .7)", fontSize: "1.4em" }}>
                {JSON.stringify({
                    page,
                    clearedSearch,
                    search
                }, null, 2)}</pre>
      */}
        </>
    )
}

export default Dashboard
