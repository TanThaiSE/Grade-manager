import React, { useState } from 'react';
import {TOKEN, URL_API} from '../../SettingValue';
import Axios from 'axios';
const CreateNotification = ({ role, link }) => {
    const [valuesForm, setValuesForm] = useState(
        {
            notice: ''
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/notification/api/CreateNotice`,
            data:{link:link,notice:valuesForm.notice},
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
        });
        promise.catch((error) => {
            console.log('create notification failed', error);
        });
    }
    return (
        <div>
            {(role === 'teacher') ? (<button className='btn btn-primary mr-3' data-toggle="modal" data-target='#modelCreateNotifi' >Create Notification</button>) : ('')}
            <div className="modal fade" id="modelCreateNotifi" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Notification</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Content</p>
                                    <input type="text" className="form-control" name="notice" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateNotification;