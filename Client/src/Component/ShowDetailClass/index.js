import React from 'react';
import {TOKEN, INFCLASS, URL_API, URL_FRONTEND } from '../../SettingValue';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Axios from 'axios';
import { Navigate } from 'react-router-dom';
import HeaderClassRoom from '../HeaderClassRoom';
import InvitateTeacher from '../Invitation/InvitateTeacher';
import InvitateStudent from '../Invitation/InvitateStudent';
import TabPeople from '../TabPeople';
import TabDetail from '../TabDetail';
import CreateAssignment from '../CreateAssignment';
import ExportAssignmentGrade from '../ExportAssignmentGrade';
import UploadGradeAssignment from '../UploadGradeAssignment';
import TabGrade from '../TabGrade';
import UpdateAssignment from '../UpdateAssignment';
import RemoveAssignment from '../RemoveAssignment';
import TabNotifications from '../TabNotifications';

const ShowDetailClass = () => {
    const { link } = useParams();
    const [infoClass, setInfoClass] = useState([]);
    const [infoGradeStructure, setInfoGradeStructure] = useState([]);
    const [role, setRole] = useState('');
    const [lstTeachers, setLstTeachers] = useState([]);
    const [lstStudents, setLstStudents] = useState([]);
    const [lstAsments, setLstAsments] = useState([]);

    const fileNameStudentList = "StudentList"; // here enter filename for your excel file
    const fileNameAssignmentGrade = "GradeAssignment";
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getDetailClassroom();
            getInfoGradeStructure();
            getRoleInClass();
            getAllListTeachers();
            getAllListStudents();
            getAllListAssignments();
        }
    }, []);

    const getDetailClassroom = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowDetailClass/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoClass(res.data[0]);
            localStorage.setItem(INFCLASS, JSON.stringify(res.data[0]));
            // this.getAllListAssignmentInClasses();
            // this.getNameAssignment();
            // this.getStudentWithPointAssignment();
        });
        promise.catch((error) => {
            console.log('getDetailClassroom failed', error);
        });
    }

    const getInfoGradeStructure = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/ShowGradeStructure/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setInfoGradeStructure(res.data);
        });
        promise.catch((error) => {
            console.log('getInfoGradeStructure failed', error);
        });
    }

    const getRoleInClass = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/idenRole/api/IdentifyRole/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setRole(res.data[0].role);
            // console.log('getRoleInClass', res.data[0].role);
        });
        promise.catch((error) => {
            console.log('getRoleInClass failed', error);
        });
    }

    const getAllListTeachers = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowListTeachers/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstTeachers(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListTeachers failed', error);
        });
    }

    const getAllListStudents = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/ShowListStudents/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstStudents(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListStudents failed', error);
        });
    }

    const getAllListAssignments = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/assignment/api/GetALLListAssignment/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstAsments(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListAssignments failed', error);
        });
    }

    /////
    const displayInfoGradeStructure = (lst) => {
        if (lst.length) {
            return lst.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.grade} (đ)</td>
                    </tr>
                )
            })
        }
        else {
            return (
                <tr>
                    <td>Not found</td>
                    <td>Not found</td>
                </tr>
            );
        }

    }

    const displayTeacherStudent = (lst) => {
        if (lst.length) {
            return lst.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.name}</td>
                    </tr>
                )
            });
        }
        else {
            return (<tr><td></td></tr>);
        }
    }

    const handleInvitedTeacher = (info) => {
        let link = URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailTeacher`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedTeacher', res);
            if (!res.data.status) {
                alert(res.data.message);
            }
            else {
                getAllListTeachers();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedTeacher', error);
        });
    }

    const handleInvitedStudent = (info) => {
        let link = URL_FRONTEND + '/classroom/' + infoClass.link;
        let dataSend = { ...info, link };
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/sendEmail/SendEmailStudent`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('handleInvitedStudent', res);
            if (!res.data.status) {
                alert(res.data.message);
            }
            else {
                getAllListStudents();
            }
        });
        promise.catch((error) => {
            console.log('handleInvitedStudent', error);
        });
    }

    const handleDisplayAssignment = (lst) => {
        if (lst.length) {
            return lst.map((bt, index) => {
                return (
                    <Draggable key={index} draggableId={index + ''} index={index}>
                        {(provided) =>
                        (
                            <div className="card" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <div className="card-header">
                                    Name Assignment : {bt.name}
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">Description: {bt.description}</h5>
                                    <p className="card-text">Grade: {bt.grade}</p>
                                    {
                                        (role === 'teacher') ? (
                                            <div className='d-flex flex-row'>
                                                <UpdateAssignment infoAss={bt} link={link} />
                                                <RemoveAssignment infoAss={bt} />
                                                <ExportAssignmentGrade infoAss={bt} fileName={fileNameAssignmentGrade} />
                                                <UploadGradeAssignment infoAss={bt} link={link} />
                                                <Link to={`/classroom/${link}/gradereview/${bt.id}`} state={{ infoAss: bt,role:role,link:link }} className="btn btn-secondary text-white mr-3">Grade review</Link>
                                            </div>
                                        ) : (
                                            <div className='d-flex flex-row'>
                                                <Link to={`/classroom/${link}/gradereview/${bt.id}`} state={{ infoAss: bt,role:role }} className="btn btn-secondary text-white mr-3">Grade review</Link>
                                            </div>
                                        )
                                    }
                                </div>

                            </div>)
                        }
                    </Draggable>
                )
            });
        }
        else {
            return (
                <div></div>
            );
        }

    }

    const handleAddAssignment = (dataSend) => {
        let promise = Axios({
            url: `${URL_API}/assignment/api/CreateAssignment`,
            method: 'POST',
            data: { link: link, name: dataSend.name, description: dataSend.description, grade: dataSend.grade, rank: lstAsments.length + 1 },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            getAllListAssignments();
            getInfoGradeStructure();
            console.log('handleAddAssignment success');
        });
        promise.catch((error) => {
            console.log('handleAddAssignment failed');
        });
    }

    const handleUpdateRank = (lst) => {
        return lst.filter((bt, index) => {
            return bt.rank = index + 1
        })
    }

    const arrangeAssignmentPostition = (lst) => {
        let promise = Axios({
            method: 'PUT',
            url: `${URL_API}/assignment/api/ArrangeAssignment/${link}`,
            data: { dataSend: JSON.stringify(lst) },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            console.log('arrangeAssignmentPostition', res.data);
            setLstAsments(lst);
        });
        promise.catch((error) => {
            console.log('arrangeAssignmentPostition failed', error);
        });
    }
    /////
    const onDragEnd = (result) => {
        const { destination, source, reason } = result;
        if (!destination || reason === 'CANCEL') {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }
        const lstAssignments = Object.assign([], lstAsments);
        const droppedUser = lstAsments[source.index];
        lstAssignments.splice(source.index, 1);
        lstAssignments.splice(destination.index, 0, droppedUser);
        const tempLstAsgment = handleUpdateRank(lstAssignments);
        arrangeAssignmentPostition(tempLstAsgment);

    }


    if (localStorage.getItem(TOKEN)) {
        return (
            <div>
                <HeaderClassRoom />
    
                {/* Tab panes */}
                <div className="tab-content">
    
                    <TabDetail infoClass={infoClass} infoGradeStructure={infoGradeStructure}
                        displayInfoGradeStructure={displayInfoGradeStructure} />
    
                    <div id="Assignment" className="container tab-pane fade container">
                        <div className='row'>
                            <div>
                                {(role === 'teacher') ? (<button className='btn btn-success' data-toggle="modal" data-target="#modelAddAssignment" >Add assignment</button>) : ('')}
                                < CreateAssignment addass={handleAddAssignment} />
                            </div>
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId='dp1'>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {handleDisplayAssignment(lstAsments)}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
    
                    <TabPeople role={role} lstStudents={lstStudents} lstTeachers={lstTeachers}
                        fileNameStudentList={fileNameStudentList} displayTeacherStudent={displayTeacherStudent} />
                    <TabGrade role={role} link={link} />
                    <TabNotifications role={role} link={link} />
                    
                </div>
                <InvitateTeacher invitedTeacher={handleInvitedTeacher} />
                <InvitateStudent invitedStudent={handleInvitedStudent} />
            </div>
        )
    }
    else {
        return <Navigate to='/' />
    }

}
export default ShowDetailClass;