import React from 'react';
import Axios from 'axios';
import * as XLSX from "xlsx";
import {TOKEN, URL_API} from '../../SettingValue';
const ExportAssignmentGrade = ({ infoAss, fileName }) => {
    const headers = [['StudentID', 'Grade']];

    const getListGradeAssignments = (bt, fileName) => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/GetAssignmentGrades/${bt.id}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            exportToCSV(res.data, fileName);
        });
        promise.catch((error) => {
            console.log('getListGradeAssignments failed', error);
        });
    }
    const exportToCSV = (apiData, fileName) => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, headers);
        XLSX.utils.sheet_add_json(ws, apiData, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    const handleExportGradeAssignment = (bt, fileName) => {
        getListGradeAssignments(bt, fileName);
    }
    return (
        <button className="btn btn-primary mr-3" onClick={(event) => { handleExportGradeAssignment(infoAss, fileName) }}>Download assignment grades</button>
    )
}

export default ExportAssignmentGrade;
