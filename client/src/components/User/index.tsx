import React from 'react'

import './styles.css'


const User = () => {
    function teste(){
        console.log('aaaaaa')
    }

    return (
        <div onClick={teste} className="user-container">
            <div className="user-header">
                <img className="user-avatar" src="https://assets1.ignimgs.com/2018/06/21/hollowknight-1280-1529623462572.jpg" alt="Avatar do usuário"/>
                <div>
                    <h1>Fernando Zanutto</h1>
                    <p>Jogando Hollow Knight</p>
                </div>
                
            </div>


            <p className="user-bio">Aqui é o meu resumo bio etc etc etc. asodihasiodhas, aodhasdhasdudhawdh</p>

        </div>
    )
}


export default User