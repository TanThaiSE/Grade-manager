import React from 'react'
import { Link } from 'react-router-dom';
const Class =({cl}) => {
   let {name, description,room, link} = cl;
    return (

         <div className="card" style={{ width: '18rem' }}>
         <div className="card-body">
             <h5 className="card-title">Name: {name}</h5>
             <p className="card-text">Room: {room}</p>
             <p className="card-text">Description: {description}</p>
             <Link to={link} className="btn btn-primary">Join</Link>
         </div>
     </div>
    )
}
export default Class;
