import React from 'react'
import { TOKEN, URL_API } from '../../SettingValue';
import { useState } from 'react';
import Axios from 'axios';

const UpdateAssignment = ({ infoAss, link }) => {
    const [valuesForm, setValuesForm] = useState(
        {
            name: infoAss.name,
            description: infoAss.description,
            grade: infoAss.grade
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value })
    }

    const handleSubmit = (e) => {
        let dataSend = { ...valuesForm, link, id: infoAss.id };
        let promise = Axios({
            method: 'PUT',
            url: `${URL_API}/assignment/api/UpdateAssignment`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
        });
        promise.catch((error) => {
            console.log('handle update assignment failed', error);
        });
    }
    return (
        <div>
            <button className='btn btn-warning text-white mr-3' data-toggle="modal" data-target={`#modelUploadAssignment${infoAss.id}`} >Update</button>
            <div className="modal fade" id={`modelUploadAssignment${infoAss.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Update Assignment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Name</p>
                                    <input type="text" className="form-control" defaultValue={infoAss.name} name="name" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <p>Description</p>
                                    <input type="text" className="form-control" defaultValue={infoAss.description} name="description" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <p>Grade</p>
                                    <input type="text" className="form-control" defaultValue={infoAss.grade} name="grade" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Update</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UpdateAssignment;
