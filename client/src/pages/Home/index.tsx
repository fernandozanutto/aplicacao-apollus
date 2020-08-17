import React, { useEffect, useState, FormEvent } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import Footer from '../../components/Footer'
import UserItem from '../../components/UserItem'

import {isAuthenticated, logout} from '../../services/auth'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import {User} from '../../components/UserItem'

import searchIcon from '../../assets/images/search-icon.svg'

function Home() {

    const {push} = useHistory()

    const [users, setUsers] = useState<User[]>([])
    const [searchName, setSearchName] = useState("")

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


    function searchUsers(e: FormEvent){
        e.preventDefault()

        api.get('/users', {
            params: {
                name: searchName
            }
        }).then((response) => {
            setUsers(response.data)
        })
    }
    
    return (

        <div id="home-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <h1 className="home-page-title">Lista de Usuários</h1>
                <form onSubmit={searchUsers}>
                    <input type="text" placeholder="Buscar pelo nome de usuário" value={searchName} onChange={(e) => {setSearchName(e.target.value)}}/>
                    <button type="submit">
                        <img src={searchIcon} alt="Buscar"/>
                    </button>
                </form>
                { users.length ?
                    users.map((user: User) => (
                        <UserItem key={user.id} user={user} />
                    ))
                    : "Nenhum usuário encontrado"
                }
            </main>

            <Footer />
            
        </div>
        
    )
}


export default Home