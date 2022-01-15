import React, {useState } from 'react'

const JoinClass = ({joinClass }) => {
    const [valuesForm, setvaluesForm] = useState({ link: '' })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setvaluesForm({ ...valuesForm, [name]: value })
    }



    const handleSubmit = (e) => {
        // e.preventDefault();
        joinClass(valuesForm.link)
    }
    return (
        <div>
            <div className="modal fade" id="modelIdJoin" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Join Class</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="form-group">
                                    <p>Enter Link or code</p>
                                    <input type="text" className="form-control" name="link" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Join</button>
                            </div>

                        </form>



                    </div>
                </div>
            </div>
        </div>

    )

}

export default JoinClass;