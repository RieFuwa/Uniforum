import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [isSend, setIsSend] = useState(false);
    let navigate = useNavigate()

    const [user,setUser]=useState({
        userTypeId:"638a26814558e44e8c57b19c",
        userName:"",
        userMail:"",
        userPassword:""
    })

    const {userName,userMail,userPassword}=user

    const onInputChange = (e)=>{
        setUser({...user, [e.target.name]:e.target.value})
        setIsSend(false)
    }

    const onSumbit = async(e)=>{
        e.preventDefault();
        await axios.post("/userAuth/register", user)
        setIsSend(true)
        navigate("/")
    }

    return (
        <div className='container' >
            <div className="row  ">

                <div className="col-md-4 offset-md-4 border rounded p-5 mt-5 shadow  " style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2">
                        Kayıt ol
                    </h2>
                    <form onSubmit={(e)=>onSumbit(e)}>

                        <div className="mb-3 font-monospace">
                            <label htmlFor="userName" className="form-label">Ad:</label>
                            <input required type={"text"} id="name" className="form-control" value={userName} maxLength={25} onChange={(e) => onInputChange(e)} placeholder="Ad" name="userName" ></input>
                        </div>

                        <div className="mb-3 font-monospace">
                            <label htmlFor="userMail" className="form-label">Mail:</label>
                            <input required type={"email"} id="mail" className="form-control" value={userMail} maxLength={50} onChange={(e) => onInputChange(e)} placeholder="Mail" name="userMail" ></input>
                        </div>

                        <div className="mb-4 font-monospace">
                            <label htmlFor="userPassword" className="form-label">Şifre:</label>
                            <input required type={"password"} id="pass" className="form-control" value={userPassword} maxLength={50} onChange={(e) => onInputChange(e)} placeholder="Şifre" name="userPassword" ></input>
                        </div>

                        <button type='sumbit' className="btn btn-success">Kayıt ol</button>
                        <Link to={"/"}><button className="btn btn-danger mx-1 " >İptal</button></Link>

                    </form>
                </div>
            </div></div>
    )
}

export default Register