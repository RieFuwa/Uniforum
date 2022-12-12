import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
    const [isSend, setIsSend]=useState(false);
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");


    const handleName=(value)=>{
        setName(value);
        setIsSend(false);
      }
      const handleMail=(value)=>{
        setMail(value);
        setIsSend(false);
      }
      const handlePass=(value)=>{
        setPass(value);
        setIsSend(false);
      }

    return (
        <div className='container' >
            <div className="row  ">

                <div className="col-md-4 offset-md-4 border rounded p-5 mt-5 shadow  " style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2">
                        Kayıt ol
                    </h2>
                    <form >
                        <div className="mb-3 font-monospace">
                            <label htmlFor="userName" className="form-label">Ad:</label>
                            <input type={"text"} className="form-control" value={name} onChange={(i) => handleName(i.target.value)} placeholder="Ad" name="userName" required></input>
                        </div>


                        <div className="mb-3 font-monospace">
                            <label htmlFor="userMail" className="form-label">Mail:</label>
                            <input type={"text"} className="form-control"value={mail} onChange={(i) => handleMail(i.target.value)} placeholder="Mail" name="userMail" required></input>
                        </div>

                        <div className="mb-4 font-monospace">
                            <label htmlFor="userPassword" className="form-label">Şifre:</label>
                            <input type={"password"} className="form-control" value={pass} onChange={(i) => handlePass(i.target.value)} placeholder="Şifre" name="userPassword" required></input>
                        </div>

                        <button type="submit" class="btn btn-success">Kayıt ol</button>
                        <Link type="text" class="btn btn-danger mx-1" to="/">İptal</Link>
                        
                    </form>
                </div>
            </div></div>
    )
}

export default Register