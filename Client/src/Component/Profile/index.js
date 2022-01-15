import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { URL_API, TOKEN } from '../../SettingValue';
import './index.css';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    const [infoProfile, setInfoProfile] = useState({});
    const [userUpdateProfile, setUserUpdateProfile] = useState({
        name: '',
        phone: '',
        mssv: '',
        email: '',
    });

    const [userChangePass, setUserChangePass] = useState({
        currentPass: "",
        newPass: "",
        confirmpassword: "",

    });
    //run 1st
    useEffect(() => {
        getInfoProfile();
    }, [])

    const getInfoProfile = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/profile/api/ShowProfile`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoProfile(res.data[0]);
            setUserUpdateProfile(res.data[0]);
            // console.log('getInfoProfile', res.data[0]);
        });
        promise.catch((error) => {
            console.log('getInfoProfile failed', error);
        });
    }

    //
    const handleInput = (event) => {
        let { name, value } = event.target;
        setUserUpdateProfile({
            ...userUpdateProfile,
            [name]: value,
        });
    }

    const handleUpdateProfile = (event) => {
        event.preventDefault();
        let promise = Axios({
            url: `${URL_API}/profile/api/UpdateProfile`,
            method: 'PUT',
            data: userUpdateProfile,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });

        promise.then((result) => {
            setInfoProfile(userUpdateProfile);
            // if (result.data.message === 'existed') {
            //     console.log('infoProfile', infoProfile);
            //     alert('MSSV exist!');
            // } else {
            //     alert('UPDATE success');
            // }
        })
        promise.catch((err) => {
            console.log('Update Profile failed', err);
        });
    }
    const handleReturn = () => {
        navigate(-1);
    }

    const handleChangePass = (event) => {
        let { name, value } = event.target;
        setUserChangePass({
            ...userChangePass,
            [name]: value,
        });
    }

    const handleChangePassword = (event) => {
        if (userChangePass.newPass === userChangePass.confirmpassword) {
            let promise = Axios({
                url: `${URL_API}/profile/api/ChangePassword`,
                method: 'POST',
                data: userChangePass,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
            });
            promise.then((result) => {
                if(result.data.status==='success'){
                    alert('Change password success');
                }
                else if(result.data.status==='notmatch'){
                    alert(`Your current password don't correct`);
                    return;
                }
            })
            promise.catch((err) => {
                console.log('Update Profile failed', err);
            });
        }
        else {
            alert("password is not matched");
            return;
        }

    }
    return (
        <div>
            <div className="container">
                <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                    <div className="card cardProfile">
                        <h1 className="text-center">Profile</h1>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group sizeInputProfile">
                                        <p>Full name</p>
                                        <input type="text" name="name" className="form-control d-inline sizeInputProfile" onChange={handleInput} defaultValue={infoProfile.name} />
                                    </div>
                                    <div className="form-group sizeInputProfile">
                                        <p>Phone</p>
                                        <input type="text" name="phone" className="form-control d-inline sizeInputProfile" onChange={handleInput} defaultValue={infoProfile.phone} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group sizeInputProfile">
                                        <p>Email</p>
                                        <input type="email" name="email" className="form-control d-inline sizeInputProfile" onChange={handleInput} defaultValue={infoProfile.email} />
                                    </div>
                                    <div className="form-group sizeInputProfile">
                                        <p>Id</p>
                                        <input type="text" name="mssv" className="form-control d-inline sizeInputProfile" onChange={handleInput} readOnly value={infoProfile.mssv} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className="form-group">
                                    <button className="btn btn-success mr-5" onClick={handleUpdateProfile}>UPDATE PROFILE</button>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-danger ml-5" onClick={handleReturn}>TURN BACK</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="form-group d-flex justify-content-center" style={{ marginTop: 50 }}>
                    <div className="card cardProfile">
                        <h1 className="text-center">Change password</h1>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group sizeInputProfile">
                                        <p>Current password</p>
                                        <input type="password" name="currentPass" className="form-control d-inline sizeInputProfile" onChange={handleChangePass} />
                                    </div>
                                    <div className="form-group sizeInputProfile">
                                        <p>New password</p>
                                        <input type="password" name="newPass" className="form-control d-inline sizeInputProfile" onChange={handleChangePass} />
                                    </div>
                                    <div className="form-group sizeInputProfile">
                                        <p>Retype new password</p>
                                        <input type="password" name="confirmpassword" className="form-control d-inline sizeInputProfile" onChange={handleChangePass} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-row'>
                                <div className="form-group">
                                    <button className="btn btn-success mr-5" onClick={handleChangePassword}>Change</button>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-danger ml-5" onClick={handleReturn}>TURN BACK</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}
export default Profile;