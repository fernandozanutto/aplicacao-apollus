import React, { FormEvent, useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { useHistory, Link } from 'react-router-dom'
import Footer from '../../components/Footer'

import saveIcon from '../../assets/images/save-icon.svg'
import api from '../../services/api'
import { isAuthenticated, logout } from '../../services/auth'
import { toast } from 'react-toastify'
import backIcon from '../../assets/images/back-icon.svg'

const UserCreate = () => {
   
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [birth, setBirth] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState("2")

    const { push } = useHistory()

    useEffect(() => {

        isAuthenticated().then(response => {
            if(response){
                api.get('/me').then(response => {
                    if(response.data.type !== 1){
                        console.log(response.data)
                    }
                })
            } else {
                logout()
                push('/login')
            }
        })
    }, [push])

    function fixDate(date: string){
        const tempDate = new Date(date)

        return new Date(tempDate.getTime() + tempDate.getTimezoneOffset()*60*1000)
    }

    
    async function saveUser(e: FormEvent){
        e.preventDefault()

        try {
            const response = await api.post('/users/', {
                username: email,
                bio, status, address, phone, role, name, birth: fixDate(birth), password, type
            })
    
            toast.success('Usuário criado com sucesso', {position: toast.POSITION.TOP_CENTER})
        
            push('/user/' + response.data)
        } catch(err) {
            toast.error('Email já cadastrado.', {position: toast.POSITION.TOP_CENTER})
        }
        
    }

    return (
        <div id="user-create" className="container">
            
            <PageHeader>
            </PageHeader>

            <main className="content">
                <div className="user-profile">
                    <form onSubmit={saveUser}>
                        <div className="header-icons">
                            <Link to='/'>
                                <img className="back-icon" src={backIcon} alt="Voltar"/>
                            </Link>

                            <button type="submit">
                                <img className="edit-icon" src={saveIcon} alt="Salvar"/>
                            </button>
                        </div>
                    
                        {/* <div className="user-header">
                            <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                        </div> */}

                        <div className="input-block">
                            <label>Nome</label>
                            <input type="text" required onChange={(e) => {setName(e.target.value)}} value={name}/>
                        </div>

                        <div className="input-block">
                            <label>Email</label>
                            <input type="email" required onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                        </div>

                        <div className="input-block">
                            <label>Senha</label>
                            <input type="password" required onChange={(e) => {setPassword(e.target.value)}} value={password} />
                        </div>
                        

                        <div className="input-block">
                            <label>Status</label>
                            <input type="text" onChange={(e) => {setStatus(e.target.value)}} value={status}/>
                        </div>

                        <div className="input-block">
                            <label>Data de nascimento</label>
                            <input type="date" onChange={(e) => {setBirth(e.target.value)}} value={birth}/>
                        </div>

                        <div className="input-block">
                            <label>Cargo</label>
                            <input type="text" onChange={(e) => {setRole(e.target.value)}} value={role}/>
                        </div>

                        <div className="input-block">
                            <label>Bio</label>
                            <textarea onChange={(e) => {setBio(e.target.value)}} value={bio}></textarea>
                        </div>

                        <div className="input-block">
                            <label>Telefone</label>
                            <input type="text" onChange={(e) => {setPhone(e.target.value)}} value={phone}/>
                        </div>

                        <div className="input-block">
                            <label>Endereço</label>
                            <input type="text" onChange={(e) => {setAddress(e.target.value)}} value={address}/>
                        </div>

                        <div className="input-block">
                            <label>Tipo</label>
                            <select value={type} onChange={(e) => {setType(e.target.value)}}>
                                <option value="2">Usuário</option>
                                <option value="1">Administrador</option>
                            </select>
                        </div>

                        <button className="save-button" type="submit">
                            Salvar
                        </button>
                    </form>
                </div>

            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserCreate