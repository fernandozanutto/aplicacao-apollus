import React, { FormEvent, useState } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import api from '../../services/api'

function LoginPage() {

    const history = useHistory()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    

    async function handleSubmitLogin(e: FormEvent){
        e.preventDefault()

        const a = await api.get('/login', {
            params: {
                user, password
            }
        })

        console.log(a)
        history.push('/')
    }

    return (

        <div id="login-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

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

                        <Link className="cadastrar" to="/login">Não possui conta? Cadastre-se</Link>

                        <button type="submit">Entrar</button>
                    </fieldset>
                </form>


                <div>
                    <h1> Olá, tudo bem? </h1>
                    <p>É um prazer te ter aqui :)</p>
                </div>

                
            </main>

            <Footer />
            
        </div>
        
    )
}


export default LoginPage