import React from 'react'
const ViewInfoInAdmin = ({infoPeople}) => {
    return (
        <div>
            <button className='btn btn-primary text-white mr-3' data-toggle="modal" data-target={`#modelViewsDetailInfo${infoPeople.id}`} >View Details</button>
            <div className="modal fade" id={`modelViewsDetailInfo${infoPeople.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
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
                                    <input type="text" className="form-control" readOnly value={infoPeople.id} />
                                </div>
                                <div className="form-group">
                                    <p>Username</p>
                                    <input type="text" className="form-control" readOnly value={infoPeople.username} />
                                </div>
                                <div className="form-group">
                                    <p>Name</p>
                                    <input type="text" className="form-control" readOnly value={infoPeople.name}/>
                                </div>
                                <div className="form-group">
                                    <p>Email</p>
                                    <input type="text" className="form-control" readOnly value={infoPeople.email}/>
                                </div>
                                <div className="form-group">
                                    <p>Phone</p>
                                    <input type="text" className="form-control" readOnly value={infoPeople.phone}/>
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

export default ViewInfoInAdmin;
