// thx: https://stackoverflow.com/questions/53252861/react-preloading-components-with-lazy-suspense
import React, { lazy } from "react"
import {
    Switch,
    Route,
} from "react-router-dom"


// prep the preloading promises (kicks off immediately when the current file is imported)
const promiseDashboard = import("./components/Dashboard.js")

// and preload! (by the time this gets rendered, your component is probably already loaded)
const Dashboard = lazy(() => promiseDashboard)

// --------------
// --------------
// --------------
const App = (props) => {

    // --------------
    return (
        <React.Fragment>
            <Switch>
                <Route path="/">
                    <Dashboard />
                </Route>
            </Switch>
        </React.Fragment>

    )
}

export default App
