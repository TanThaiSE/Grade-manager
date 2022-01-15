import React from 'react'
import {TOKEN,URL_API} from '../../SettingValue';
import Axios from 'axios';
const RemoveAssignment = ({infoAss}) => {

    const handleSubmit = (e) => {
        let promise = Axios({
            method: 'DELETE',
            url: `${URL_API}/assignment/api/DeleteAssignment`,
            data:{id:infoAss.id},
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
        });
        promise.catch((error) => {
            console.log('handle remove assignment failed', error);
        });
    }
    return (
        <div>
            <button className='btn btn-danger mr-3' data-toggle="modal" data-target={`#modelRemoveAssignment${infoAss.id}`} >Remove</button>
            <div className="modal fade" id={`modelRemoveAssignment${infoAss.id}`} tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Do you want to remove assignment?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Remove</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RemoveAssignment;
