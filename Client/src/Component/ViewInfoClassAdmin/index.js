import React from 'react';
import {URL_FRONTEND} from '../../SettingValue';
const ViewInfoClassAdmin = ({infoClass}) => {
    return (
        <div>
            <button className='btn btn-primary text-white mr-3' data-toggle="modal" data-target={`#modelViewsDetailClasses${infoClass.id}`} >View Details</button>
            <div className="modal fade" id={`modelViewsDetailClasses${infoClass.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Information</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>ID</p>
                                    <input type="text" className="form-control" readOnly value={infoClass.id} />
                                </div>
                                <div className="form-group">
                                    <p>Name</p>
                                    <input type="text" className="form-control" readOnly value={infoClass.name}/>
                                </div>
                                <div className="form-group">
                                    <p>Description</p>
                                    <input type="text" className="form-control" readOnly value={infoClass.description}/>
                                </div>
                                <div className="form-group">
                                    <p>Room</p>
                                    <input type="text" className="form-control" readOnly value={infoClass.room}/>
                                </div>
                                <div className="form-group">
                                    <p>Link</p>
                                    <input type="text" className="form-control" readOnly value={URL_FRONTEND + '/classroom/' + infoClass.link} />
                                </div>
                                <div className="form-group">
                                    <p>Code room</p>
                                    <input type="text" className="form-control" readOnly value={infoClass.coderoom} />
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

export default ViewInfoClassAdmin;
