// thx: https://stackoverflow.com/questions/53252861/react-preloading-components-with-lazy-suspense
import React, { lazy, useState } from "react"
import {
    Switch,
    Route,
} from "react-router-dom"
import ApplicationLayout from './components/layout/ApplicationLayout';
import Notification from './components/Notification';


// prep the preloading promises (kicks off immediately when the current file is imported)
const promiseDashboard = import("./components/Dashboard.js")

// and preload! (by the time this gets rendered, your component is probably already loaded)
const Dashboard = lazy(() => promiseDashboard)




const App = (props) => {
    const [showNotification, setShowNotification] = useState(false);
    const [message, setMessage] = useState('')

    // (state variables getters to pass to children and other components)
    const getShowNotification = () => showNotification
    const getMessage = () => message


    return (
        <React.Fragment>
            <Notification
                getMessage={getMessage}
                setShowNotification={setShowNotification}
                getShowNotification={getShowNotification} />
            <ApplicationLayout>
                <Switch>
                    <Route path="/">
                        <Dashboard
                            setMessage={setMessage}
                            setShowNotification={setShowNotification} />
                    </Route>
                </Switch>
            </ApplicationLayout>
        </React.Fragment>

    )
}

export default App
