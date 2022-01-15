import React from 'react';
import {TOKEN,ISADMIN } from '../../SettingValue';
import { Navigate } from 'react-router-dom';
import HeaderAdmin from '../HeaderAdmin';
import ManageClasses from '../ManageClasses';
import ManageAdmin from '../ManageAdmin';
import ManageUser from '../ManageUser';
import ManageMapIDStudent from '../ManageMapIDStudent';
const PageAdmin = () => {

    if (localStorage.getItem(TOKEN) && localStorage.getItem(ISADMIN)) {
        return (
            <div>
                <HeaderAdmin />
                <div className="container">
                    <div className="tab-content">
                        <ManageAdmin />
                        <ManageUser />
                        <ManageClasses />
                        <ManageMapIDStudent/>
                    </div>
                </div>


            </div>
        )
    }
    else {
        return <Navigate to='/' />
    }
}
export default PageAdmin;