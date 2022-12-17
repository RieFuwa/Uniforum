import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <div className="container font-monospace ">
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#040f1f" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 " style={{color:'white'}} to="/">
                        UniForum
                    </Link>
            
                        <Link   to="/signin"> <button className="btn btn-success">Sign in</button> </Link>
                    
                </div>
            </nav>
        </div>
    );

}
export default Navbar;