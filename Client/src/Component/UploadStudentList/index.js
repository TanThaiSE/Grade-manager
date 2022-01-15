import React from 'react'
import { TOKEN, URL_API } from '../../SettingValue';
import { useState } from 'react';
import Axios from 'axios';
import * as XLSX from "xlsx";

const UploadStudentList = ({ role, link }) => {
    const [lstStudent, setLstStudent] = useState([]);

    const readExcelStudentList = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);
                resolve(data);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
        promise.then((result) => {
            setLstStudent(result);
        });
    };

    const handleUploadStudentList = (e) => {
        // e.preventDefault();
        // console.log('handleUploadStudentList',lstStudent);
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/point/api/UploadStudentsExcelFile/${link}`,
            data: { dataSend: JSON.stringify(lstStudent) },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
        });
        promise.catch((error) => {
            console.log('handleUploadStudentList failed', error);
        });
    }
    return (
        <div>
            {(role === 'teacher') ? (<button className='btn btn-success mr-3' data-toggle="modal" data-target='#modelUploadStudentList' >Upload Student List</button>) : ('')}
            <div className="modal fade" id='modelUploadStudentList' tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Student List</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="file" onChange={(e) => { const file = e.target.files[0]; readExcelStudentList(file); }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleUploadStudentList}>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadStudentList;
