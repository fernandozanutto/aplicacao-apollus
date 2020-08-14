import React from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer'
import UserItem from '../../components/UserItem'

function Home() {
    
    return (

        <div id="home-page" className="container">

            <PageHeader>
                <p className="header-menu">Olá, Usuário</p>
            </PageHeader>

            <main className="content">

                <h1> Lista de Usuários</h1>

                <div className="user-list">

                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                    <UserItem />
                </div>
                
            </main>

            <Footer />
            
        </div>
        
    )
}


export default Home