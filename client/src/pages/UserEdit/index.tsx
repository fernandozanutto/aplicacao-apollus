import React, { FormEvent, useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { RouteComponentProps, Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'

import backIcon from '../../assets/images/back-icon.svg'
import saveIcon from '../../assets/images/save-icon.svg'
import api from '../../services/api'
import { isAuthenticated, logout, login } from '../../services/auth'
import { toast } from 'react-toastify'

interface MatchParams {
    id: string
}

interface Props extends RouteComponentProps<MatchParams> {}

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
    const [password, setPassword] = useState("")
    const [type, setType] = useState("2")
    const [isAdmin, setIsAdmin] = useState(false)
    const [isMe, setIsMe] = useState(false)


    const { push, goBack } = useHistory()

    useEffect(() => {

        async function pageLoaded(){
            
            const loggedUser = await api.get('/me')
            
            if(loggedUser.data.id !== Number(id) && loggedUser.data.type !== 1){
                console.log('nao tem autorização')
                goBack();
            }
            else {
                if(loggedUser.data.type === 1){
                    setIsAdmin(true)
                }
                if(loggedUser.data.id === Number(id)){
                    setIsMe(true)
                }

                const response = await api.get('/users/' + id)
    
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
                setType(data.type || 2)
            }
        }

        isAuthenticated().then(response => {
            if(!response){
                logout()
                push('/login')
            } else {
                pageLoaded()
            }
            
        })

    }, [goBack, id, push])

    function fixDate(date: string){
        const tempDate = new Date(date)

        return new Date(tempDate.getTime() + tempDate.getTimezoneOffset()*60*1000)
    }
    
    async function saveUser(e: FormEvent){
        e.preventDefault()

        const token = await api.put('/users/' + id, {
            username: email,
            bio, status, address, phone, role, name, birth: fixDate(birth), password, type
        })
        toast.success('Alterações salvas com sucesso', {position: toast.POSITION.TOP_CENTER})
        if(isMe){
            console.log(token)
            login(token.data)
        }
    
        push('/user/' + id)
    }

    function deleteUser(e: FormEvent){
        e.preventDefault()

        if(window.confirm("Deseja realmente deletar o usuário?")){
            api.delete('/users/' + id)
            .then(() => {
                toast.success('Usuário deletado com sucesso.', {position: toast.POSITION.TOP_CENTER})
                if(isMe){
                    logout()
                }
                push('/')
            }).catch(()=> {
                toast.error('Falha ao deletar usuário.', {position: toast.POSITION.TOP_CENTER})
            })
        }
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
                            <input type="password" onChange={(e) => {setPassword(e.target.value)}} value={password} placeholder="Deixe em branco para manter a senha atual"/>
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

                        {isAdmin ? (
                        <div className="input-block">
                            <label>Tipo</label>
                            <select value={type} onChange={(e) => {setType(e.target.value)}}>
                                <option value="2">Usuário</option>
                                <option value="1">Administrador</option>
                            </select>
                        </div>
                        ) : null}

                        <button className="save-button" type="submit">
                            Salvar
                        </button>

                        <button className="delete-button" onClick={deleteUser}>
                            Deletar Usuário
                        </button>
                    </form>
                </div>

            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserEdit