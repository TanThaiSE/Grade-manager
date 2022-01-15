import React, { useState } from 'react'
import { INFO } from '../../SettingValue';
const CommentForm = ({ submitLabel, addComment, handleCancel, hasCancelButton = true, role, infoAss, addFinalDecision }) => {
    const [valuesForm, setValuesForm] = useState(
        {
            comment: '',
            nameStudent: JSON.parse(localStorage.getItem(INFO)).username,
            gradeComposition: infoAss.grade,
            currentGrade: '',
            expectGrade: '',
            explan: ''
        }
    );
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValuesForm({ ...valuesForm, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (role === 'teacher' && submitLabel === 'Write') {
            let dataSend = valuesForm.comment;
            addComment(dataSend);
            setValuesForm({ ...valuesForm, comment: '' });
        }
        else if (role === 'student' && submitLabel === 'Write') {
            let dataSend = `Student: ${valuesForm.nameStudent} - Grade composition: ${valuesForm.gradeComposition} - Current grade: ${valuesForm.currentGrade} - Student Expectation grade: ${valuesForm.expectGrade} - Student explanation: ${valuesForm.explan}`;
            addComment(dataSend);
        }
        else if (submitLabel === 'Reply') {
            let dataSend = valuesForm.comment;
            addComment(dataSend);
            setValuesForm({ ...valuesForm, comment: '' });
        }
        else if (submitLabel === 'Decision') {
            let dataSend = valuesForm.comment;
            addFinalDecision(dataSend);
        }
    }
    return (
        <form onSubmit={handleSubmit} >

            {role === 'teacher' && (
                <div className="form-group">
                    <textarea className="form-control comment-form-textarea" name="comment" rows="3" onChange={handleChange} value={valuesForm.comment} required />
                </div>)}
            {role === 'student' && (
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <p>Student</p>
                            <input type="text" className="form-control" name="nameStudent" readOnly value={JSON.parse(localStorage.getItem(INFO)).username} />
                        </div>
                        <div className="form-group">
                            <p>Grade composition</p>
                            <input type="text" className="form-control" name="gradeComposition" readOnly value={infoAss.grade} />
                        </div>
                        <div className="form-group">
                            <p>Student explanation</p>
                            <textarea className="form-control comment-form-textarea" name="explan" rows="3" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <p>Current grade</p>
                            <input type="text" className="form-control" name="currentGrade" onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <p>Student expectation grade</p>
                            <input type="text" className="form-control" name="expectGrade" onChange={handleChange} required />
                        </div>
                    </div>
                </div>)}

            {((submitLabel === 'Reply') || (submitLabel === 'Decision')) && (
                <div className="form-group">
                    <textarea className="form-control comment-form-textarea" name="comment" rows="3" onChange={handleChange} required />
                </div>)}

            {submitLabel === 'Write' && (<button className="comment-form-button">
                {submitLabel}
            </button>)}

            {submitLabel === 'Reply' && (<button className="comment-form-button">
                {submitLabel}
            </button>)}

            {submitLabel === 'Decision' && (<button className="comment-form-button">
                {submitLabel}
            </button>)}

            {hasCancelButton && submitLabel !== 'Write' && (
                <button type="button" className="comment-form-button comment-form-cancel-button" onClick={handleCancel}>
                    Cancel
                </button>)}

        </form>


    )
}

export default CommentForm;