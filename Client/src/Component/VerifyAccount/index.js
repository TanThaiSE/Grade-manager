import React from 'react';
import { URL_API} from '../../SettingValue';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useEffect } from 'react';
const VerifyAccount = () => {
    const { tokenEmail } = useParams();
    const navigate = useNavigate();
       //Run 1st
       useEffect(() => {
        handleVerifyEmail();
    }, []);

    const handleVerifyEmail=()=>{
        let promise = Axios({
            url: `${URL_API}/register/api/verifyemail`,
            method: 'POST',
            data: {emailToken:tokenEmail}
        });

        promise.then((result) => {
            alert(result.data.message);
            navigate("/");
        })
        promise.catch((err) => {
            alert('Verify email failed');
            console.log('Verify email login: ', err);
            navigate("/");
   
        });
    }
    return (
        <div>
            
        </div>
    )
}

export default VerifyAccount;
