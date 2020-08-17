import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link, useHistory } from 'react-router-dom'
import { logout, isAuthenticated } from '../../services/auth'

import downArrow from '../../assets/images/downarrow-icon.svg'
import api from '../../services/api'

interface PageHeaderProps {

}

const PageHeader: React.FC<PageHeaderProps> = (props) => {

    const {push} = useHistory()

    const [userLogged, setUserLogged] = useState(false)
    const [myId, setMyId] = useState(0)
    const [myName, setMyName] = useState("")
    const [myType, setMyType] = useState(2)

    function logoutClick(){
        logout()
        push('/login')
    }

    useEffect(() => {

        isAuthenticated().then(response => {
            setUserLogged(response)

            if(response){
                api.get('/me').then(response => {
                    setMyId(response.data.id)
                    setMyName(response.data.name)
                    setMyType(response.data.type)
                })
            }
        })
    }, [])

    return (
        <header className="app-header">
            <Link to="/" className="header-link">
                <h1 className="header-title">Apollus</h1>
            </Link>
            
            {userLogged ? (
                <div className="menu-dropdown">
                    <div className="dropdown-title">
                        Olá, {myName} {myType === 1 ? " (Admin)" : null}
                        <img src={downArrow} alt="Seta para baixo"/>
                    </div>
                    <div className="dropdown-content">
                        {myType === 1 ? (
                            <Link to={`/user/create`}>Cadastrar novo usuário</Link>
                        ) : null}
                        <Link to={`/user/${myId}`}>Meu perfil</Link>
                        <button onClick={logoutClick}>Sair</button>
                    </div>
                </div>
            ) : null }
        </header>
    )
}

export default PageHeader