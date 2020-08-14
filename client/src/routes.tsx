import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import UserPage from './pages/UserDetail'
import UserEdit from './pages/UserEdit'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/" exact component={ Home } />
            <Route path="/user/:id" exact component={ UserPage } />
            <Route path="/user/:id/edit" exact component={ UserEdit } />
        </BrowserRouter>
    )
}


export default Routes