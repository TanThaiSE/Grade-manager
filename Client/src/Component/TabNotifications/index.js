
import React from 'react';
import {TOKEN,URL_API} from '../../SettingValue';
import { useState, useEffect } from 'react';
import Axios from 'axios';
const TabNotifications = ({ role, link }) => {
    const [lstNotifi, setLstNodifi] = useState([]);

    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            getAllListNotifications();
        }
    }, []);


    const getAllListNotifications = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/notification/api/getAllNotification/${link}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setLstNodifi(res.data);
        });
        promise.catch((error) => {
            console.log('getAllListNotifications failed', error);
        });
    }
    //
    const handleShowNotification = (lst,role) => {
        if (lst.length) {
            // console.log('handleShowNotification',lst);
            return lst.map((item, index) => {
                if (item.typeNotification === 'finalgradecomposition') {
                    return (
                        <div key={index} className="comment" style={{border:'solid black 2px',marginTop:'22px',paddingTop:'0px',paddingBottom:'13px',paddingLeft:'33px'}}>
                            <div className="comment-right-part">
                                <div className="comment-content">
                                    <div className="text-dark">Teacher notices that:{item.notice}</div>
                                </div>
                            </div>
                        </div>);

                }

                else if (item.typeNotification === 'gradereview') {
                    return (
                        <div key={index} className="comment" style={{border:'solid black 2px',marginTop:'22px',paddingTop:'0px',paddingBottom:'13px',paddingLeft:'33px'}}>
                            <div className="comment-right-part">
                                <div className="comment-content">
                                    <div className="text-dark">{item.username} commented in grade review</div>
                                </div>
                            </div>
                        </div>);
                }
                else{
                    return (
                        <div key={index} className="comment" style={{border:'solid black 2px',marginTop:'22px',paddingTop:'0px',paddingBottom:'13px',paddingLeft:'33px'}}>
                            <div className="comment-right-part">
                                <div className="comment-content">
                                    <div className="text-danger">{item.username} creates a final decision mark on your review </div>
                                </div>
                            </div>
                        </div>);
                }
            });
        }

    }
    return (
        <div id="Notification" className="container tab-pane fade container">
            {handleShowNotification(lstNotifi,role)}
        </div>
    )


}
export default TabNotifications;