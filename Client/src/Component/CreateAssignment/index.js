import React, {useState } from 'react'
const CreateAssignment = ({addass}) => {
    const [createAss, setCreateAsss] = useState(
        {
            name: '',
            description: '',
            grade:'',
        }
    )
    const handleChange = (e) => {
        const { name, value } = e.target; 
        setCreateAsss({ ...createAss, [name]: value })
    }
    const handleSubmit = (e) => {
        addass(createAss);
    }
    return (
        <div>
            <div className="modal fade" id="modelAddAssignment" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add assigment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" name="name" onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input type="text" className="form-control" name="description" onChange={handleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="grade">Grade</label>
                                <input type="text" className="form-control" name="grade" onChange={handleChange}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAssignment;
