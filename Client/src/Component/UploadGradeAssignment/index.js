import React from 'react'
import { TOKEN, URL_API } from '../../SettingValue';
import { useState } from 'react';
import Axios from 'axios';
import * as XLSX from "xlsx";

const UploadGradeAssignment = ({ infoAss,link }) => {
    const [lstGradeAss, setLstGradeAss] = useState([]);

    const readExcelGradeAss = (file) => {
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
            setLstGradeAss(result);
        });
    };

    const handleUploadGradeAssignment = (e) => {
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/assignment/api/GradeStudentsAssignment`,
            data: { lstAss: JSON.stringify(lstGradeAss), assignmentId: infoAss.id,link:link },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
        });
        promise.catch((error) => {
            console.log('handleUploadGradeAssignment failed', error);
        });
    }
    return (
        <div>
            <button className='btn btn-success mr-3' data-toggle="modal" data-target={`#modelUploadGradesFile${infoAss.id}`} >Upload grades file</button>
            <div className="modal fade" id={`modelUploadGradesFile${infoAss.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Upload Grade Assignment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="file" onChange={(e) => { const file = e.target.files[0]; readExcelGradeAss(file); }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleUploadGradeAssignment}>Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadGradeAssignment;
