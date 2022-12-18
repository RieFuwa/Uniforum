import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
    const [isSend, setIsSend] = useState(false);
    let navigate = useNavigate()
    const [user, setUser] = useState({
        userMail: "",
        userPassword: ""
    })
    const { userMail, userPassword } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
        setIsSend(false)
    }

    const onSumbit = async (e) => {
        e.preventDefault();
        await axios.post("/userAuth/login", user).then(
            function (response) {
                localStorage.setItem("token", response.data.accessToken)
                localStorage.setItem("signedUserId", response.data.userId)
                localStorage.setItem("signedUserName", response.data.userName)
            }
        )
        setIsSend(true)
        navigate(-1)
    }

    return (
        <div className='container' >
            <div className="row ">

                <div className=" col-md-4 offset-md-4 border rounded p-5 mt-5 shadow" style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2 ">
                        Giriş Yap
                    </h2>
                    <form onSubmit={(e) => onSumbit(e)} >

                        <div className="mb-3 font-monospace">
                            <label htmlFor="userMail" className="form-label">Mail:</label>
                            <input required type={"email"} id="mail" className="form-control" value={userMail} maxLength={50} onChange={(e) => onInputChange(e)} placeholder="Mail" name="userMail" ></input>
                        </div>

                        <div className="mb-4 font-monospace">
                            <label htmlFor="userPassword" className="form-label">Şifre:</label>
                            <input required type={"password"} id="pass" className="form-control" value={userPassword} maxLength={50} onChange={(e) => onInputChange(e)} placeholder="Şifre" name="userPassword" ></input>
                        </div>

                        <button type='sumbit' className="btn btn-success">Giriş</button>
                        <Link to={"/"}><button className="btn btn-danger mx-1 " >İptal</button></Link>
                        <div className='mt-3'>
                            <p>
                                Hesabınız yok mu ?  &nbsp;
                                <Link className='' type="text" to="/register">
                                    Kayıt olun
                                </Link>
                            </p>
                        </div>

                    </form>
                </div>
            </div></div>
    )
}

export default SignIn