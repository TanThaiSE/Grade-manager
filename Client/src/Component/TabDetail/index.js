import React from 'react';
import {URL_FRONTEND } from '../../SettingValue';
const TabDetail = ({infoClass,infoGradeStructure,displayInfoGradeStructure}) => {
    return (
        <div id="Newsfeed" className="container tab-pane active container">
        <div className='row'>

            <div className='col-md-12'>
                <h3>Class name : {infoClass.name}</h3>
                <h3>Content: {infoClass.description}</h3>
                <h3>Room:{infoClass.room}</h3>
                <h3>Link: {URL_FRONTEND + '/classroom/' + infoClass.link}</h3>
                <h3>Code: {infoClass.coderoom}</h3>
            </div>

            <div className='col-md-12'>
                <h1 className='text-center'>Grade Structure</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Point</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayInfoGradeStructure(infoGradeStructure)}
                    </tbody>
                </table>
            </div>

        </div>

    </div>
    )
}

export default TabDetail;
