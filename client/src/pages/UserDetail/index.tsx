import React from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { RouteComponentProps, Link } from 'react-router-dom'
import Footer from '../../components/Footer'

import backIcon from '../../assets/images/back-icon.svg'
import editIcon from '../../assets/images/edit-icon.svg'

interface MatchParams {
    id?: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const UserPage: React.FC<Props> = (props) => {
    
    return (
        <div id="user-page" className="container">
            
            <PageHeader>
                <p className="header-menu">Olá, Usuário</p>
            </PageHeader>


            <main className="content">
                <div className="user-profile">
                    <div className="header-icons">
                        <Link to="/">
                            <img className="back-icon" src={backIcon} alt="Voltar"/>
                        </Link>

                        <Link to="/user/1/edit">
                            <img className="edit-icon" src={editIcon} alt="Voltar"/>
                        </Link>
                    </div>
                    

                    <div className="user-header">
                        <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                        <div>
                            <h1>Fernando Zanutto</h1>
                            <p className="user-status">Jogando Hollow Knight</p>
                        </div>
                        
                    </div>


                    <div className="info-group">
                        <legend>Data de nascimento</legend>
                        <p>29/12/1999</p>
                    </div>

                    <div className="info-group">
                        <legend>Idade</legend>
                        <p>20 anos</p>
                    </div>

                    <div className="info-group">
                        <legend>Cargo</legend>
                        <p>Desenvolvedor</p>
                    </div>

                    <div className="info-group">
                        <legend>Bio</legend>
                        <p>Aqui é o meu resumo bio etc etc etc. asodihasiodhas, aodhasdhasdudhawdh</p>
                    </div>

                    <div className="info-group">
                        <legend>Telefone</legend>
                        <p>(51) 99940-0685</p>
                    </div>

                    <div className="info-group">
                        <legend>Endereço</legend>
                        <p>Rua Jadsadads</p>
                    </div>

                    <div className="info-group">
                        <legend>Email</legend>
                        <p>ferzanutto1999@gmail.com</p>
                    </div>
                    

                </div>
                
                

            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserPage