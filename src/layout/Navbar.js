import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <div className="container font-monospace ">
            <nav class="navbar navbar-expand-lg " style={{ backgroundColor: "#040f1f" }}>
                <div class="container-fluid">
                    <Link class="navbar-brand fs-3 " style={{color:'white'}} to="/">
                        UniForum
                    </Link>
            
                        <Link   to="/signin"> <button class="btn btn-success">Sign in</button> </Link>
                    
                </div>
            </nav>
        </div>
    );

}
export default Navbar;