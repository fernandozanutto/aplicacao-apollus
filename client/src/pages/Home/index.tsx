import React, { useEffect, useState } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer'
import UserItem from '../../components/UserItem'

import {isAuthenticated, logout} from '../../services/auth'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import {User} from '../../components/UserItem'


function Home() {

    const {push} = useHistory()

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        isAuthenticated().then(response => {
            if(!response){
                logout()
                push('/login')
            }
            else {
                try{
                    api.get('/users').then((response) => {
                        setUsers(response.data)
                    })
                } catch (err){
                    console.log(err)
                }
            }
        })
    }, [push])
    
    return (

        <div id="home-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <h1 className="home-page-title">Lista de Usuários</h1>

                    {
                        users.map((user: User) => (
                            <UserItem key={user.id} user={user} />
                        ))
                    }
            </main>

            <Footer />
            
        </div>
        
    )
}


export default Home