import React from 'react';
import {TOKEN, URL_API } from '../../SettingValue';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ViewInfoClassAdmin from '../ViewInfoClassAdmin';
const ManageClasses = () => {
    const [lstClasses, setLstClasses] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortItem, setSortItem] = useState('ascending');
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllListClass();
        }
    }, []);

    const getAllListClass = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/classroom/api/GetTotalClasses`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstClasses(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListClass failed', error);
        });
    }


    //
    const handleDisplayClassList = (lst,sortItem) => {
        if (lst.length) {
            let resultLst=sortByTime(lst,sortItem);
            return resultLst.filter((val) => {
                if (searchItem === '') {
                    return val;
                }
                else if ((val.name.toLowerCase().includes(searchItem.toLowerCase()))) {
                    return val;
                }
            })
                .map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.room}</td>
                            <td>
                                <div className='d-flex flex-row'>
                                    <ViewInfoClassAdmin infoClass={item}/>
                                </div>

                            </td>
                        </tr>

                    )
                })
        }
    }
    const sortByTime = (lst, op) => {
        if (lst.length) {
            if (op === 'ascending') { //tang
                return lst.sort((a, b) => new Date(a.createat).getTime() - new Date(b.createat).getTime());
            }
            else if (op === 'descending') { //giam
                return lst.sort((a, b) => new Date(b.createat).getTime() - new Date(a.createat).getTime());
            }
        }

    }


    return (
        <div id="manageclasses" className="container tab-pane fade">

            <h1 className='text-center my-2'>List class</h1>

            <div className='d-flex flex-row justify-content-center my-3'>
                <p>Search:</p>
                <input type="text" className="form-control ml-2" onChange={(e) => { setSearchItem(e.target.value) }} placeholder='Search...' style={{ width: '34%' }} />
            </div>

            <div className='d-flex flex-row justify-content-end my-3'>
                <p className='mr-2'>Sorted by time</p>
                <select  onChange={(e)=>{setSortItem(e.target.value)}}>
                    <option value='ascending'>Ascending</option>
                    <option value='descending'>Descending</option>
                </select>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Room</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {handleDisplayClassList(lstClasses,sortItem)}
                </tbody>
            </table>
        </div>
    )
}

export default ManageClasses;







