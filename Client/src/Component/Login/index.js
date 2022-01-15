import React, { useState } from 'react';
import { FaUser, FaLock} from "react-icons/fa";
import './index.css';
import Axios from 'axios';
import { URL_API, INFO, TOKEN,ISADMIN } from '../../SettingValue';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
const Login = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleInputUsername = (event) => {
        setUsername(event.target.value)
    };
    const handleInputPassword = (event) => {
        setPassword(event.target.value)
    };

    const handleLogin = (event) => {
        event.preventDefault(); // ngăn ngừa reload lại trang
        let promise = Axios({
            url: `${URL_API}/login`,
            method: 'POST',
            data: { username, password }
        });

        promise.then((result) => {
            localStorage.setItem(INFO, JSON.stringify({ id: result.data.content.id, username: result.data.content.username }));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            if (result.data.content.isadmin == 1) {
                localStorage.setItem(ISADMIN,result.data.content.isadmin);
                navigate("/pageAdmin");
            }
            else {
                navigate("/classroom");
            }

        })
        promise.catch((err) => {
            alert('Login again');
            console.log('Error login: ', err);
        });
    };

    const handleRegister = () => {
        navigate("/register");
    }

    const responseGoogle = (response) => {
        console.log("quang");
        // console.log(response);
        let promise = Axios({
            url: `${URL_API}/google-sign-in/api`,
            method: 'POST',
            data: { tokenId: response.tokenId }
        });
        promise.then((result) => {
            localStorage.setItem(INFO, JSON.stringify(result.data.content));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            navigate("/classroom");
        })
        promise.catch((err) => {

            alert('Login again qunag');
            console.log('Error login: ', err);
        });
    }
    const responseErrorGoogle = (response) => {
        console.log("tan");

    }
    const responseFacebook = (response) => {
        // console.log(response);
        let promise = Axios({
            url: `${URL_API}/facebook-sign-in/api`,
            method: 'POST',
            data: { tokenId: response.accessToken }
        });
        promise.then((result) => {
            // console.log('kq tra ve sau login', result);
            localStorage.setItem(INFO, JSON.stringify(result.data.content));
            localStorage.setItem(TOKEN, result.data.tokenAccess);
            navigate("/classroom");
        })
        promise.catch((err) => {

            alert('Login again qunag');
            console.log('Error login: ', err);
        });
    }
    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="cardLogin">
                    <h1 className="text-center">Login</h1>
                    <div className="card-body" style={{ marginTop: '50px' }}>
                        <div className="form-group sizeformGroup" style={{ borderBottom: 'none' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <FaUser />
                                <input type="text" style={{ flexGrow: 1, marginLeft: '10px' }} name="username" className="form-control d-inline sizeInput" placeholder="username" onChange={handleInputUsername} />
                            </div>

                        </div>
                        <div className="form-group sizeformGroup" style={{ borderBottom: 'none' }}>
                            <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                                <FaLock />
                                <input type="password" name="password" style={{ flexGrow: 1, marginLeft: '10px' }} className="form-control d-inline sizeInput" placeholder="Password" onChange={handleInputPassword} />

                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100 mt-3" onClick={handleLogin} >SIGN IN</button>
                        </div>
                        <div className="form-group">
                            <p className="text-center">or sign in with</p>
                        </div>
                        <div className="d-flex justify-content-center align-items-center">
                            <GoogleLogin
                                clientId="398530816289-0muicg4r9jijupqash4l1gkg2p71tbai.apps.googleusercontent.com"
                                buttonText="Login with Google"
                                onSuccess={responseGoogle}
                                onFailure={responseErrorGoogle}
                                cookiePolicy='single_host_origin'
                            />
                        </div>

                        <div className="d-flex justify-content-center align-items-center">
                            <FacebookLogin
                                appId="3092075754367248"
                                autoLoad={true}
                                fields="name,email,picture"
                                textButton='Sign in with facebook'
                                callback={responseFacebook} />
                        </div>

                        <span >
                            <p className="text-center">Don't have an account? <Link to="/register"> SignUp</Link></p>
                            <p className="text-center">Did you forget password? <Link to="/forgotpassword"> Click here</Link></p>
                        </span>

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Login;