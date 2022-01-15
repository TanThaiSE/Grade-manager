import React from 'react'
import * as XLSX from "xlsx";

const ExportStudent = ({ lstData, fileName }) => {
    const headers = [['StudentID', 'FullName']];

    const exportToCSV = (apiData, fileName) => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet([]);
        XLSX.utils.sheet_add_aoa(ws, headers);
        XLSX.utils.sheet_add_json(ws, apiData, { origin: 'A2', skipHeader: true });
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

    return (
        <button className="btn btn-success" onClick={(event) => { exportToCSV(lstData, fileName) } }>Download StudentList</button>
    )
}

export default ExportStudent;
