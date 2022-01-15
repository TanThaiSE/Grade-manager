import React, { useState, useEffect } from 'react'
import { URL_API, TOKEN } from '../../SettingValue';
import Header from '../Header/Header';
import Class from '../Classroom';
import Axios from 'axios';
import CreateClass from '../CreateClass';
import JoinClass from '../JoinClass';
import { Navigate } from 'react-router-dom';


const ClassRoom = () => {

    const [listClassroom, setListClassroom] = useState([]);

    const getAllClassRoom = () => {
        let promise = Axios({
            url: `${URL_API}/classroom/api/GetListClasses`,
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((result) => {
            setListClassroom(result.data)
        });
        promise.catch((er) => {
            console.log("Erroor classroom", er);
        })
    }


    const handleAddNewClass = (dataSend) => {
        let tempClass = [...listClassroom];
        let getRandlink = new Date();
        let link = getRandlink.getTime() + '';
        let coderoom=(Math.random() + 1).toString(36).substring(2);
        dataSend = { ...dataSend, link,coderoom,createat:new Date().toISOString() };
        tempClass.push(dataSend);
        // console.log('add new class111:',tempClass);
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/classroom/api/CreateClass`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            // console.log('add new class ', tempClass);
            setListClassroom(tempClass);
            // console.log('Create Class success', dataSend);
        });
        promise.catch((error) => {
            console.log('Create Class success fail', error);
        });
    }

    const handleJoinClass = (inputLink) => {
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/classroom/api/joinClassByLink`,
            data:{link:inputLink},
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((result) => {
            alert(result.data.message);
        });
        promise.catch((error) => {
            console.log('handleJoinClass failed', error);
        });

    }

    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllClassRoom()
        }
    }, [])


    const displayListClass = (lst) => {

        if (lst.length) {
            return lst.map((cl, index) => {
                return (
                    <div className="col-md-3" key={index}>
                        <Class cl={cl} />
                    </div>
                );
            })
        }
        else {
            return (<div></div>)
        }
    }

    if (localStorage.getItem(TOKEN)) {
        return (
            <div>
                <Header />
                <div className='container'>
                    <div className='row'>
                        {displayListClass(listClassroom)}
                    </div>
                </div>
                <CreateClass addClass={handleAddNewClass} />
                <JoinClass joinClass={handleJoinClass} />
            </div>
        )

    }
    else {
        return <Navigate to='/' />
    }

}

export default ClassRoom;