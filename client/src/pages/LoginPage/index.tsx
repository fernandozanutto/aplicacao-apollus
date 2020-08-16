import React, { FormEvent, useState } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import api from '../../services/api'
import { login } from '../../services/auth'

function LoginPage() {

    const history = useHistory()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    

    async function handleSubmitLogin(e: FormEvent){
        e.preventDefault()

        const a = await api.post('/authenticate', {
                username: user, password
            }
        )

        if(a.status === 200){
            login(a.data.token)
            history.push('/')
        } else {
            // TODO: do something
        }
    }

    return (

        <div id="login-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <div>
                    <h1> Olá, tudo bem? </h1>
                </div>

                <div className="login-form">

                    <form onSubmit={handleSubmitLogin}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="login">E-mail</label>
                                <input type="text" onChange={e => setUser(e.target.value)}/>
                            </div>
                            
                            <div className="input-block">
                                <label htmlFor="login">Senha</label>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <Link className="cadastrar" to="/signup">Não possui conta? Cadastre-se</Link>

                            <button type="submit">Entrar</button>
                        </fieldset>
                    </form>
                </div>
            </main>

            <Footer />
            
        </div>
        
    )
}


export default LoginPage