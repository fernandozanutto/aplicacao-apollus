import React from 'react'
import './styles.css'
import { Link } from 'react-router-dom'

interface PageHeaderProps {

}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="app-header">
            <Link to="/" className="header-link">
                <h1 className="header-title">Apollus</h1>
            </Link>
            

            {props.children}
        </header>
    )
}

export default PageHeader