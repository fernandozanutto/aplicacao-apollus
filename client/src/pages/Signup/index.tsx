import React, { FormEvent, useState } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import api from '../../services/api'

function Signup() {

    const history = useHistory()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    

    async function handleSubmitSignup(e: FormEvent){
        e.preventDefault()

        const a = await api.post('/signup', {
                username: user, 
                password, 
                name, 
                phone
            }
        )

        if(a.data){
            history.push('/login')
        }
        
    }

    return (

        <div id="signup-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <div className="signup-form">

                    <h2>
                        Cadastre-se.
                    </h2>
                    <h3>
                        Só precisaremos de alguns dados básicos, o resto pode preencher depois :)
                    </h3>

                    <form onSubmit={handleSubmitSignup}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="login">Nome completo</label>
                                <input type="text" onChange={e => setName(e.target.value)}/>
                            </div>
                            
                            <div className="input-block">
                                <label htmlFor="login">Senha</label>
                                <input type="password" onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <div className="input-block">
                                <label htmlFor="login">E-mail</label>
                                <input type="text" onChange={e => setUser(e.target.value)}/>
                            </div>

                            <div className="input-block">
                                <label htmlFor="login">Telefone</label>
                                <input type="text" onChange={e => setPhone(e.target.value)}/>
                            
                            </div>

                            <Link className="cadastrar" to="/login">Já possui conta? Faça o login</Link>

                            <button type="submit">Confirmar</button>
                        </fieldset>
                    </form>
                </div>
            </main>

            <Footer />
            
        </div>
    )
}


export default Signup