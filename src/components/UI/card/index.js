import React from 'react'
import './style.css'

function Card(props) {
    return (
        <>
            <div className="card"
                {...props}>
                <div className='cardheader'>
                    
                    {
                        props.headerleft && <div>{props.headerleft}</div>
                    }
                    {
                        props.headerright && <div>{props.headerright}</div>
                    }
                    </div>
                {props.children}
                
            </div>
        </>
    )
}



export default Card
