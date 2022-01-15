import React from 'react';
import { useState} from 'react';

const InvitateTeacher = ({invitedTeacher}) => {
    const [infoInvite, setInfoInvite] = useState({
        emailNguoiNhan: '',
    })

    const handleChange = (e) => {
        let { name, value } = e.target;
        setInfoInvite({
            ...infoInvite,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        invitedTeacher(infoInvite);
    }

    return (
        <div>
            <div className="modal fade" id="modelIdAddTeacher" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Invite Teacher</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Email teacher</p>
                                    <input type="email" className="form-control" name="emailNguoiNhan" onChange={handleChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvitateTeacher;
