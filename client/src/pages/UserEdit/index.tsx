import React, { FormEvent, useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { RouteComponentProps, Link as button, Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'

import backIcon from '../../assets/images/back-icon.svg'
import saveIcon from '../../assets/images/save-icon.svg'
import api from '../../services/api'
import { isAuthenticated, logout } from '../../services/auth'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const UserEdit: React.FC<Props> = (props) => {
    const id = props.match.params.id

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [birth, setBirth] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")


    const { push, goBack } = useHistory()

    useEffect(() => {
        isAuthenticated().then(response => {
            if(!response){
                logout()
                push('/login')
            }
        })
    }, [])

    useEffect(() => {

        async function pageLoaded(){
            try {
                const check = await api.get('/check-permission/' + id)
                console.log(check)
    
                const response = await api.get('/users/' + id)
    
                console.log(response.data)
                const { data } = response
    
                // no caso de um campo opicional vir nulo, usar uma string vazia
                setName(data.name)
                setAddress(data.address || "")
                setStatus(data.status || "")
                setRole(data.role || "")
                setPhone(data.phone || "")
                setEmail(data.username)
                setBio(data.bio || "")
                setBirth(data.birth || "")

            } catch (err){
                console.log(err)
                goBack()
            }
        }

        pageLoaded()

    }, [])


    
    async function saveUser(e: FormEvent){
        e.preventDefault()
        

        const a = await api.put('/users/' + id, {
            username: email,
            bio, status, address, phone, role, name, birth
        })

        console.log(a)

    }

    return (
        <div id="user-edit" className="container">
            
            <PageHeader>
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
                        </div>

                        <div className="input-block">
                            <label>Email</label>
                            <input type="email" onChange={(e) => {setEmail(e.target.value)}} value={email}/>
                        </div>

                        <div className="input-block">
                            <label>Nome</label>
                            <input type="text" onChange={(e) => {setName(e.target.value)}} value={name}/>
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

                        
                    </form>
                </div>

            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserEdit