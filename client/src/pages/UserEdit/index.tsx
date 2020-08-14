import React, { FormEvent } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { RouteComponentProps, Link as button, Link } from 'react-router-dom'
import Footer from '../../components/Footer'

import backIcon from '../../assets/images/back-icon.svg'
import saveIcon from '../../assets/images/save-icon.svg'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const UserEdit: React.FC<Props> = (props) => {

    const id = props.match.params.id
    
    function saveUser(e: FormEvent){
        e.preventDefault()
        console.log('uau')
    }

    return (
        <div id="user-edit" className="container">
            
            <PageHeader>
                <p className="header-menu">Olá, Usuário</p>
            </PageHeader>

            <main className="content">
                <div className="user-profile">
                    <form onSubmit={saveUser}>
                        <div className="header-icons">
                            <Link to={`/user/${id}`}>
                                <img className="back-icon" src={backIcon} alt="Voltar"/>
                            </Link>

                            <button type="submit">
                                <img className="edit-icon" src={saveIcon} alt="Voltar"/>
                            </button>
                        </div>
                        
                    
                        <div className="user-header">
                            <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                            <div>
                                <h1>Fernando Zanutto</h1>
                                <p className="user-status">Jogando Hollow Knight</p>
                            </div>
                            
                        </div>


                        <div className="info-group">
                            <label>Data de nascimento</label>
                            <input type="date" value="1999-12-29"/>
                        </div>

                        <div className="info-group">
                            <label>Cargo</label>
                            <input type="text" value="Desenvolvedor"/>
                        </div>

                        <div className="info-group">
                            <label>Bio</label>
                            <textarea>Aqui é o meu resumo bio etc etc etc. asodihasiodhas, aodhasdhasdudhawdh</textarea>
                        </div>

                        <div className="info-group">
                            <label>Telefone</label>
                            <input type="(51) 99940-0685"/>
                        </div>

                        <div className="info-group">
                            <label>Endereço</label>
                            <input type="text" value="Rua Jadsadads"/>
                        </div>

                        <div className="info-group">
                            <label>Email</label>
                            <input type="email" value="ferzanutto1999@gmail.com"/>
                        </div>
                    </form>
                </div>
                
                

            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserEdit