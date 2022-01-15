import React from 'react';
import ExportStudent from '../ExportStudent';


const TabPeople = ({role,lstStudents,lstTeachers,fileNameStudentList,displayTeacherStudent}) => {
    return (
        <div id="People" className="container tab-pane fade container">
        {(role === 'teacher') ? (<ExportStudent lstData={lstStudents} fileName={fileNameStudentList}/>) : ('')}
            <div className='row'>
                <div className='col-md-12'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Teachers</th>
                                {(role === 'teacher') ? (<th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddTeacher">Invite teacher</button></th>) : (<th></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {displayTeacherStudent(lstTeachers)}
                        </tbody>
                    </table>

                </div>
                <div className='col-md-12'>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Students</th>
                                {(role === 'teacher') ? (<th><button className='btn btn-success' data-toggle="modal" data-target="#modelIdAddStudent">Invite student</button></th>) : (<th></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {displayTeacherStudent(lstStudents)}
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    )
}

export default TabPeople;
