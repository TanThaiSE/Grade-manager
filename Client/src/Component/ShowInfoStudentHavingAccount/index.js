import React from 'react';
import './index.css';
const ShowInfoStudentHavingAccount = ({infoShow}) => {
    return (
        <div>
            <p className='InfoStudentHavingAccount' data-toggle="modal" data-target={`#modelShowInfoStudentHavingAccount${infoShow.mssv}`} style={{cursor:'point'}} >{infoShow.mssv} - {infoShow.fullName}</p>
            <div className="modal fade" id={`modelShowInfoStudentHavingAccount${infoShow.mssv}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Infomation Student</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Full Name</p>
                                    <input type="text" className="form-control" readOnly value={infoShow.fullName} />
                                </div>
                                <div className="form-group">
                                    <p>Student Id</p>
                                    <input type="text" className="form-control" readOnly value={infoShow.mssv}/>
                                </div>
                                <div className="form-group">
                                    <p>Email</p>
                                    <input type="text" className="form-control" readOnly value={infoShow.email}/>
                                </div>
                                <div className="form-group">
                                    <p>Phone number</p>
                                    <input type="text" className="form-control" readOnly value={infoShow.phone}/>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ShowInfoStudentHavingAccount;
