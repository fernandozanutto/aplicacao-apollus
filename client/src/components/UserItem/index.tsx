import React from 'react'

import './styles.css'
import { Link } from 'react-router-dom'

export interface User {
    id: number,
    name: string,
    status: string,
    bio: string,
    lastlogin: string
}

interface UserProps {
    user: User
}

const UserItem:React.FC<UserProps> = ({user}) => {
    const lastLogin = new Date(user.lastlogin)

    return (
        <div className="user-item-container">
            <div className="user-header">
                {/* <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/> */}
                <div>
                    <h1>{user.name}</h1>
                    <p>{user.status}</p>
                </div>
                
            </div>

            <p className="user-bio">{user.bio ? user.bio : "A bio deste usuário parece estar vazia..."}</p>

            <div className="user-footer">
                Online última vez: {user.lastlogin ? lastLogin.toLocaleString() : "Nunca"}

                <Link to={`/user/${user.id}`}>
                    <button className="user-button">Visitar perfil</button>
                </Link>
            </div>

        </div>
    )
}


export default UserItem