import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
const ExportTotalGradeStudent = ({ lstRowNameAss, lstGradeStudent, displayTRowNameAssignment, handleTotalGrade, role }) => {

    const displayTBody = (arrayGradeStu) => {
        let result = [];
        if (arrayGradeStu.length) {
            for (let i = 0; i < arrayGradeStu.length; i++) {
                let temp = [];
                let tdGrade = arrayGradeStu[i].lstAssAndGrade.map((item, index) => {
                    return (
                        <td key={`tdGrade${index}`}>
                            {item.grade}
                        </td>
                    );
                });
                temp.push(
                    <tr key={`trGrade${i}`}>
                        <td>{arrayGradeStu[i].mssv}</td>
                        {tdGrade}
                        {handleTotalGrade(lstRowNameAss, arrayGradeStu[i].lstAssAndGrade,role)}
                    </tr>
                )
                result.push(temp);
            }
        }

        return result;
    }
    return (
        <div>
            {(role === 'teacher') ? (
                <table className="table" id='gradeBoardTable' style={{ display: 'none' }}>
                    <thead>
                        <tr>
                            {displayTRowNameAssignment(lstRowNameAss,1)}
                        </tr>
                    </thead>
                    <tbody>
                        {displayTBody(lstGradeStudent)}
                    </tbody>
                </table>
            ) : ('')}
            {(role === 'teacher') ? (
                <ReactHTMLTableToExcel
                    className='btn btn-success mr-3'
                    table='gradeBoardTable'
                    filename='Grade Board AllStudents'
                    sheet='Sheet'
                    buttonText='Download grade board'
                />
            ) : ('')}

        </div>
    )
}

export default ExportTotalGradeStudent;
