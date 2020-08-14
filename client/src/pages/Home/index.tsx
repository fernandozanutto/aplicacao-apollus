import React from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer'
import User from '../../components/User'

function Home() {
    
    return (

        <div id="home-page">

            <PageHeader>
                <p className="user-menu">Olá, Usuário</p>
            </PageHeader>

            <main className="home-content">

                <h1> Lista de Usuários</h1>

                <div className="user-list">

                    
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                    <User />
                </div>
                
            </main>

            <Footer />
            
        </div>
        
    )
}


export default Home