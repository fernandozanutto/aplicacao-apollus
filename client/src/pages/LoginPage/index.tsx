import React, { FormEvent } from 'react'

import './styles.css'
import PageHeader from '../../components/PageHeader'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'

function LoginPage() {
    
    function handleSubmitLogin(e: FormEvent){
        e.preventDefault()

        console.log('login :)')
    }

    return (

        <div id="login-page">

            <PageHeader>
            </PageHeader>

            <main className="landing-content">

                <div>
                    <form onSubmit={handleSubmitLogin}>
                        <fieldset>
                            <div className="input-block">
                                <label htmlFor="login">E-mail</label>
                                <input type="text"/>
                            </div>
                            
                            <div className="input-block">
                                <label htmlFor="login">Senha</label>
                                <input type="password"/>
                            </div>

                            <Link className="cadastrar" to="/login">Não possui conta? Cadastre-se</Link>

                            <button type="submit">Entrar</button>
                        </fieldset>
                    </form>
                </div>


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