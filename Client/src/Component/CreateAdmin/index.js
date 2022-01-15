import React, {useState } from 'react'
const CreateAdmin = ({addAdmin}) => {

    const [createAdmin, setcreateAdmins] = useState({
        username: "",
        password: "",
        email: "",
        name: "",
        phone: "",
        confirmpassword: "",

    });

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setcreateAdmins({ ...createAdmin, [name]: value })
    }
    const handleSubmit = (e) => {
        let checkFull=Object.values(createAdmin).filter((item)=>{return item===''});
        if(checkFull.length){
            alert("Please fill all field");
            return;
        }
        else{
            if (createAdmin.password === createAdmin.confirmpassword) {
                addAdmin(createAdmin);
            }
            else{
                alert("password is not matched");
                return;
            }
        }

    }
    return (
        <div>
            <div className="modal fade" id="modelAddAdmin" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Create Admin Account</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Name</label>
                                <input type="text" className="form-control" name="name" onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input type="text" className="form-control" name="username" onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label >Confirm Password</label>
                                <input type="password" className="form-control" name="confirmpassword" onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label >Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} required/>
                            </div>
                            <div className="form-group">
                                <label >Phone</label>
                                <input type="number" className="form-control" name="phone" onChange={handleChange} required/>
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

export default CreateAdmin;
