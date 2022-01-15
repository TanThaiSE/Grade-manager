import React from 'react';
import { NavLink } from 'react-router-dom';
import { INFO, TOKEN, INFCLASS } from '../../SettingValue';
import { Navigate } from 'react-router-dom';
const HeaderClassRoom = () => {
    const handleLogOut = () => {
        localStorage.removeItem(TOKEN);
        localStorage.removeItem(INFO);
        localStorage.removeItem(INFCLASS);
    }
    if (localStorage.getItem(TOKEN)) {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark ">
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav mx-auto mt-2 mt-lg-0 nav nav-pills" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="pill" href="#Newsfeed">Newsfeed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#Assignment">Assignment</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#People">People</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#Grade">Grade</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="pill" href="#Notification">Notification</a>
                        </li>
                    </ul>

                    <div className="nav-item dropdown my-2 my-lg-0">
                        <a className="nav-link dropdown-toggle" href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hello {JSON.parse(localStorage.getItem(INFO)).username}</a>
                        <div className="dropdown-menu" aria-labelledby="dropdownId">
                            <NavLink className="dropdown-item" to='/profile'>View profile</NavLink>
                            <NavLink className="dropdown-item" to='/' onClick={handleLogOut}>Sign out</NavLink>
                        </div>
                    </div>

                </div>
            </nav>

        )
    }
    else {
        return <Navigate to='/' />
    }
}
export default HeaderClassRoom;