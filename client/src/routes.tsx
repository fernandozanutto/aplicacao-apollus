import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import Home from './pages/Home'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/login" exact component={LoginPage} />
            <Route path="/" exact component={ Home } />
        </BrowserRouter>
    )
}


export default Routes