import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Navbar() {

    var navigate = useNavigate()

    const onLogoutClicked = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("signedUserId")
        localStorage.removeItem("signedUserName")
        navigate(0)
    }

    return (
        <div className="container font-monospace ">
            <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#040f1f" }}>
                <div className="container-fluid">
                    <Link className="navbar-brand fs-3 " style={{ color: 'white' }} to="/">
                        UniForum
                    </Link>
                    {localStorage.getItem("signedUserId") == null ?
                        <Link to="/signin"> <button className="btn btn-success">Sign in</button> </Link> : <div>
                            <button className="btn btn-success">Profile</button>
                            <button className="btn btn-danger" onClick={onLogoutClicked}>Logout</button>
                        </div>}
                </div>
            </nav>
        </div>
    );

}
export default Navbar;