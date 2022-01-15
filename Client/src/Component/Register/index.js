import React, { useState } from 'react';
import Axios from 'axios';
import { URL_API} from '../../SettingValue';
import './index.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [userRegister, setUserRegister] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        phone: "",
        confirmpassword: "",

    });
    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserRegister({
            ...userRegister,
            [name]: value,
        });
    }
    const handleRegister = (event) => {
        // event.preventDefault();
        if (userRegister.password === userRegister.confirmpassword) {
            let promise = Axios({
                url: `${URL_API}/register`,
                method: 'POST',
                data: {createat:new Date().toISOString(),...userRegister}
            });

            promise.then((result) => {
                alert(`register success\n Please verify account in your email`);
                navigate("/");
            })
            promise.catch((err) => {
                // alert(`register failed`,{createat:new Date().toISOString(),...userRegister});
                // console.log('register failed', {createat:new Date().toISOString(),...userRegister});
                console.log('register failed',err);
            });
        }
        else {
            alert("password is not matched");
            return;
        }

    }
    const handleReturn = () => {
        navigate("/");
    }

    return (
        <div className="container">
            <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                <div className="card cardRegister">
                    <h1 className="text-center">Sign up</h1>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group sizeformGroupRegister">
                                    <input type="text" name="name" className="form-control d-inline sizeInputRegister" placeholder="Fullname" onChange={handleInput} />
                                </div>
                                <div className="form-group sizeformGroupRegister">
                                    <input type="number" name="phone" className="form-control d-inline sizeInputRegister" placeholder="Phone" onChange={handleInput} />
                                </div>
                                <div className="form-group sizeformGroupRegister">
                                    <input type="password" name="password" className="form-control d-inline sizeInputRegister" placeholder="Password" onChange={handleInput} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group sizeformGroupRegister">
                                    <input type="email" name="email" className="form-control d-inline sizeInputRegister" placeholder="Email" onChange={handleInput} />
                                </div>
                                <div className="form-group sizeformGroupRegister">
                                    <input type="text" name="username" className="form-control d-inline sizeInputRegister" placeholder="Username" onChange={handleInput} />
                                </div>
                                <div className="form-group sizeformGroupRegister">
                                    <input type="password" name="confirmpassword" className="form-control d-inline sizeInputRegister" placeholder="Repeat password" onChange={handleInput} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary w-100" onClick={handleRegister}>CREATE ACCOUNT</button>
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
export default Register;