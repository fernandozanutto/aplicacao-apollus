import React, { FormEvent, useState, useEffect } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { login, isAuthenticated } from '../../services/auth'
import { toast } from 'react-toastify'

function LoginPage() {

    const history = useHistory()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        isAuthenticated().then(response => {
            if(response) history.push('/')
        })
    }, [history])
    

    async function handleSubmitLogin(e: FormEvent){
        e.preventDefault()

        try {
            const response = await api.post('/authenticate', {
                    username: user, password
                }
            )
            login(response.data.token)
            history.push('/')
        } catch (err){
            toast.error('Senha incorreta. Tente novamente.', {position: toast.POSITION.TOP_CENTER})
        }
    }

    return (

        <div id="login-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <div className="login-text">
                    <h1> Olá, seja bem vindo! </h1>
                </div>

                <div className="login-form">

                    <form onSubmit={handleSubmitLogin}>
                        <fieldset className="login">
                            <div className="input-block">
                                <label htmlFor="login">E-mail</label>
                                <input type="text" onChange={e => setUser(e.target.value)}/>
                            </div>
                            
                            <div className="input-block">
                                <label htmlFor="login">Senha</label>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <button type="submit">Entrar</button>
                        </fieldset>
                    </form>
                    
                    <hr className="solid" />

                    <div className="cadastrar">
                        <h4>Não possui uma conta?</h4>

                        <Link to="/signup">
                            <button>Cadastre-se</button>
                        </Link>
                    </div>
                    
                </div>
            </main>

            <Footer />
            
        </div>
        
    )
}


export default LoginPage