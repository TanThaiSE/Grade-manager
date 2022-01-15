import React, { useState } from 'react';
import Axios from 'axios';
import { URL_API } from '../../SettingValue';
import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [userGetPassword, setUserGetPassword] = useState({
        email: "",
    });
    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserGetPassword({
            ...userGetPassword,
            [name]: value,
        });
    }
    const handleGetPassword = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/forgotPassword`,
            method: 'POST',
            data: userGetPassword
        });

        promise.then((result) => {
            alert(result.data.message);
            navigate("/");
        })
        promise.catch((err) => {

            console.log('send email failed', err);
        });
    }
    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="card cardForgot">
                    <h1 className="text-center">Get password</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group sizeformGroupForgot">
                                    <input type="text" name="email" className="form-control d-inline sizeInputForgot" placeholder="Your email" onChange={handleInput} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100" onClick={handleGetPassword}>SEND</button>
                        </div>
                        <div className="form-group">
                            <Link to="/"> BACK TO SIGN IN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ForgotPassword;