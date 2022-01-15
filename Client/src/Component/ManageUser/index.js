import React from 'react';
import {TOKEN, URL_API } from '../../SettingValue';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ViewInfoInAdmin from '../ViewInfoInAdmin';
const ManageUser = () => {
    const [lstUser, setLstUser] = useState([]);
    const [searchItem, setSearchItem] = useState('');
    const [sortItem, setSortItem] = useState('ascending');
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllListUser();
        }
    }, []);

    const getAllListUser = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/user/api/viewuserlist`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstUser(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListUser failed', error);
        });
    }
    const handleLockAccount=(info)=>{
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/user/api/lockandunlockacc`,
            data:{idacc:info.id,lockacc:info.lockacc},
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            getAllListUser();
        });
        promise.catch((error) => {
            console.log('handleLockAccount failed', error);
        });

    }

    //
    const handleDisplayUserList = (lst,sortItem) => {
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
                                    <button className='btn btn-danger text-white mr-3' onClick={()=>{handleLockAccount(item)}} >
                                        {item.lockacc==0?('Lock'):('Unlock')}
                                    </button>
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
        <div id="manageuser" className="container tab-pane fade">

            <h1 className='text-center my-2'>List user</h1>

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
                    {handleDisplayUserList(lstUser,sortItem)}
                </tbody>
            </table>
        </div>
    )
}

export default ManageUser;







