import React from 'react'

import './styles.css'
import { Link } from 'react-router-dom'


const UserItem = () => {
    function teste(){
        console.log('aaaaaa')
    }

    return (
        <div onClick={teste} className="user-item-container">
            <div className="user-header">
                <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                <div>
                    <h1>Fernando Zanutto</h1>
                    <p>Jogando Hollow Knight</p>
                </div>
                
            </div>

            <p className="user-bio">Aqui é o meu resumo bio etc etc etc. asodihasiodhas, aodhasdhasdudhawdh</p>

            <div className="user-footer">
                Online última vez: 13 minutos atrás

                <Link to="/user/1">
                    <button className="user-button">Visitar perfil</button>
                </Link>
            </div>

        </div>
    )
}


export default UserItem