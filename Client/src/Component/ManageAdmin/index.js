import React from 'react';
import {TOKEN,URL_API } from '../../SettingValue';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ViewInfoInAdmin from '../ViewInfoInAdmin';
import CreateAdmin from '../CreateAdmin';
const ManageAdmin = () => {
    const [lstadmin, setLstAdmin] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortItem, setSortItem] = useState('ascending');
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllListAdmin();
        }
    }, []);

    const getAllListAdmin = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/admin/api/viewadminlist`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstAdmin(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListAdmin failed', error);
        });
    }

    const handleCreateAdmin = (dataSend) => {
        let promise = Axios({
            url: `${URL_API}/admin/api/createadmin`,
            method: 'POST',
            data: { createat: new Date().toISOString(), ...dataSend },
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
            getAllListAdmin();
        });
        promise.catch((error) => {
            console.log('handleCreateAdmin failed');
        });
    }

    //
    const handleDisplayAdminList = (lst,sortItem) => {
        if (lst.length) {
            let resultLst=sortByTime(lst,sortItem);
            return resultLst.filter((val) => {
                if (searchItem === '') {
                    return val;
                }
                else if ((val.name.toLowerCase().includes(searchItem.toLowerCase())) || (val.email.toLowerCase().includes(searchItem.toLowerCase()))) {
                    return val;
                }
            })
                .map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                                <div className='d-flex flex-row'>
                                    <ViewInfoInAdmin infoPeople={item} />
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
        <div id="manageadmin" className="container tab-pane active">

            <button className='btn btn-success' data-toggle="modal" data-target="#modelAddAdmin" >Create Admin Account</button>
            <CreateAdmin addAdmin={handleCreateAdmin} />

            <h1 className='text-center my-2'>List admin</h1>

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
                        <th>Email</th>
                        <th>Option</th>
                    </tr>
                </thead>
                <tbody>
                    {handleDisplayAdminList(lstadmin,sortItem)}
                </tbody>
            </table>
        </div>
    )
}

export default ManageAdmin;
