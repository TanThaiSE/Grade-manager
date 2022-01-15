import React, { useState } from 'react';
import {TOKEN, URL_API } from '../../SettingValue';
import Axios from 'axios';
const MapStudentId = ({ infoPeople, getAllListUser }) => {
    const [valuesForm, setValuesForm] = useState(
        {
            mssvUpdate: '',
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value })
    }

    const handleMappingStudentId = (e) => {
        let dataSend = { ...infoPeople, mssvupdate: valuesForm.mssvUpdate };
        let promise = Axios({
            method: 'PUT',
            url: `${URL_API}/user/api/mapping`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
            getAllListUser();
        });
        promise.catch((error) => {
            console.log('handleMappingStudentId failed', error);
        });
    }

    return (
        <div>
            <button className='btn btn-primary text-white mr-3' data-toggle="modal" data-target={`#modelMapStudentIdAd${infoPeople.id}`} >Map</button>
            <div className="modal fade" id={`modelMapStudentIdAd${infoPeople.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Mapping StudentID</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Student ID</p>
                                    <input type="text" className="form-control" name="mssvUpdate" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleMappingStudentId}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default MapStudentId;