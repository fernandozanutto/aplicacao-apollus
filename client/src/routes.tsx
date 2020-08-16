import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import UserPage from './pages/UserDetail'
import UserEdit from './pages/UserEdit'
import Signup from './pages/Signup'


function Routes() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/" exact component={ Home } />
            <Route path="/user/:id" exact render={(routeProps) => <UserPage {...routeProps} key={routeProps.match.params.id} />} />
            <Route path="/user/:id/edit" exact render={(routeProps) => <UserEdit {...routeProps} key={routeProps.match.params.id} />} />
        </BrowserRouter>
    )
}


export default Routes