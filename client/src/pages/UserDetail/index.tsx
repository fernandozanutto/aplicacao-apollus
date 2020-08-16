import React, { useEffect, useState } from 'react'
import PageHeader from '../../components/PageHeader'

import './styles.css'
import { RouteComponentProps, Link, useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'

import backIcon from '../../assets/images/back-icon.svg'
import editIcon from '../../assets/images/edit-icon.svg'
import api from '../../services/api'
import { isAuthenticated, logout } from '../../services/auth'

interface MatchParams {
    id?: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const UserPage: React.FC<Props> = (props) => {

    const [id, setId] = useState(props.match.params.id)

    const {push} = useHistory()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [status, setStatus] = useState("")
    const [birth, setBirth] = useState("")
    const [role, setRole] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [age, setAge] = useState(0)
    const [isMe, setIsMe] = useState(false)

    useEffect(() => {
        isAuthenticated().then(response => {
            if(!response){
                logout()
                push('/login')
            }
        })

        api.get('/check-permission/' + id).then(response => {
            if(response){
                setIsMe(true)
            }
        }).catch(err => {
            setIsMe(false)
        })
    }, [])


    useEffect(() => {
        api.get('/users/' + id).then((response) => {
            const { data } = response
            

            // no caso de um campo opicional vir nulo, usar uma string vazia
            setName(data.name)
            setAddress(data.address || "")
            setStatus(data.status || "")
            setRole(data.role || "")
            setPhone(data.phone || "")
            setEmail(data.username)

            if(data.bio){
                const formattedBio = data.bio.replace("\r\n", "\\r\\n")
                setBio(formattedBio)
            } else {
                setBio("")
            }
            
            if(data.birth){
                const birthDate = new Date(data.birth)
                console.log(data.birth)
                console.log(new Date(data.birth).getTimezoneOffset())
                console.log(new Date(data.birth).getUTCMonth())

                const formattedBirthDate = birthDate.getUTCDate() + "/" 
                    + String(birthDate.getUTCMonth() + 1).padStart(2, "0") + "/" 
                    + birthDate.getUTCFullYear()
                setBirth(formattedBirthDate || "")

                const date1 = new Date(data.birth)
                const date2 = new Date()
                const diffTime = date2.getTime() - date1.getTime()

                setAge(Math.floor(diffTime / (1000 * 3600 * 24 * 365)))
            } else {
                setBirth("")
                setAge(0)
            }
        })

    }, [])
    
    return (
        <div id="user-page" className="container">
            
            <PageHeader>
            </PageHeader>


            <main className="content">
                <div className="user-profile">
                    <div className="header-icons">
                        <Link to="/">
                            <img className="back-icon" src={backIcon} alt="Voltar"/>
                        </Link>
                        {isMe ? (
                        <Link to="/user/1/edit">
                            <img className="edit-icon" src={editIcon} alt="Voltar"/>
                        </Link>
                        ) : null}
                    </div>
                    

                    <div className="user-header">
                        <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                        <div>
                            <h1>{name}</h1>
                            <p className="user-status">{status}</p>
                        </div>
                        
                    </div>

                    <div className="info-group">
                        Data de nascimento: <span className="user-info">{birth}</span>
                    </div>

                    <div className="info-group">
                        Idade: <span className="user-info">{birth ? `${age} ano(s)` : ""}</span>
                    </div>

                    <div className="info-group">
                        Cargo: <span className="user-info">{role}</span>
                    </div>

                    <div className="info-group">
                        Bio: <br />
                        {bio}
                    </div>

                    <div className="info-group">
                        Telefone: <span className="user-info">{phone}</span>
                    </div>

                    <div className="info-group">
                        Endereço: <span className="user-info">{address}</span>
                    </div>

                    <div className="info-group">
                        Email: <span className="user-info">{email}</span>
                    </div>

                </div>
                
            </main>

            <Footer></Footer>

        </div>
    )
}


export default UserPage