import React, { FormEvent, useState } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import backIcon from '../../assets/images/back-icon.svg'
import api from '../../services/api'
import { toast } from 'react-toastify'

function Signup() {

    const history = useHistory()

    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    

    async function handleSubmitSignup(e: FormEvent){
        e.preventDefault()

        try {
            const response = await api.post('/signup', {
                    username: user, 
                    password, 
                    name
                }
            )

            if(response.data){
                toast.success("Sucesso! Agora já pode fazer o login!", {position: toast.POSITION.TOP_CENTER})
                history.push('/login')
            }
        } catch (err) {
            toast.error("Email já cadastrado.", {position: toast.POSITION.TOP_CENTER})
        }
    }

    return (

        <div id="signup-page" className="container">

            <PageHeader>
            </PageHeader>

            <main className="content">

                <div className="signup-form">

                    <div className="header-icons">
                        <Link to="/">
                            <img className="back-icon" src={backIcon} alt="Voltar"/>
                            <span>Já possui conta? Volte e faça o login.</span>
                        </Link>
                        
                    </div>


                    <h1>
                        Cadastre-se.
                    </h1>
                    <h2>
                        Só precisaremos de alguns dados básicos, o resto pode preencher depois :)
                    </h2>

                    <form onSubmit={handleSubmitSignup}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="login">Nome completo</label>
                                <input type="text" required onChange={e => setName(e.target.value)}/>
                            </div>
                            
                            <div className="input-block">
                                <label htmlFor="login">Senha</label>
                                <input type="password" required onChange={e => setPassword(e.target.value)}/>
                            </div>

                            <div className="input-block">
                                <label htmlFor="login">E-mail</label>
                                <input type="text" required onChange={e => setUser(e.target.value)}/>
                            </div>

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