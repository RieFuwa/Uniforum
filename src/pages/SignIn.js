import React from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
    return (
        <div className='container' >
            <div className="row ">

                <div className=" col-md-4 offset-md-4 border rounded p-5 mt-5 shadow" style={{ backgroundColor: "#040f1f", color: "white" }}>
                    <h2 className="text-center font-monospace mt-2 ">
                        Giriş Yap
                    </h2>
                    <form >
                        
                        <div className="mb-3 font-monospace">
                            <label htmlFor="userMail" className="form-label">Mail:</label>
                            <input type={"text"} className="form-control" placeholder="Mail" name="userMail" required></input>
                        </div>

                        <div className="mb-4 font-monospace">
                            <label htmlFor="userPassword" className="form-label">Şifre:</label>
                            <input type={"password"} className="form-control" placeholder="Şifre" name="userPassword" required></input>
                        </div>

                        <button type="submit" class="btn btn-success">Giriş</button>
                        <Link type="text" class="btn btn-danger mx-1" to="/">İptal</Link>
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