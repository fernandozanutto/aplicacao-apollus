import React from 'react'
import './styles.css'

interface PageHeaderProps {

}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    return (
        <header className="app-header">
            <h1 className="header-title">Apollus</h1>

            {props.children}
        </header>
    )
}

export default PageHeader