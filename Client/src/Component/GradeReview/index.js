import React from 'react';
import { INFO, TOKEN,URL_API} from '../../SettingValue';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import HeaderGradeReview from '../HeaderGradeReview';
import './index.css';
import CommentForm from '../CommentForm';
import Comments from '../Comments';
const GradeReview = () => {
    const { link, assignmentId } = useParams();
    const location = useLocation();
    //const { infoAss, role } = location.state;
    const [backendComments, setBackendComments] = useState([]); //lấy data từ bên backend về
    const [activeComment, setActiveComment] = useState(null); //check is reply?

    const rootComments = backendComments.filter(
        (backendComment) => backendComment.parentid === 0
    );

    const getReplies = (commentId) =>
        backendComments
            .filter((backendComment) => backendComment.parentid === commentId)
            .sort((a, b) => new Date(a.createat).getTime() - new Date(b.createat).getTime());

    //F
    const handleAddComment = (text, parentid = 0) => {
        let dataSend =
        {
            comment: text,
            username: (JSON.parse(localStorage.getItem(INFO)).username),
            accountId: (JSON.parse(localStorage.getItem(INFO)).id),
            parentid: parentid, createat: new Date().toISOString(),
            assignmentId: location.state.infoAss.id,
            finalgrade: -1,
            link: link,
            role: location.state.role
        }
        // console.log('handleAddComment',dataSend);

        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/gradeReview/api/addComment`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            alert(res.data.message);
            setBackendComments([dataSend, ...backendComments]);
            setActiveComment(null);
        });
        promise.catch((error) => {
            console.log('handleAddComment  failed', error);
        });
    }

    //F
    const handleGetAllComments = () => {
        let promise = Axios({
            method: 'GET',
            url: `${URL_API}/gradeReview/api/getAllComments/${link}/${assignmentId}`,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setBackendComments(res.data);
        });
        promise.catch((error) => {
            console.log('handleGetAllComments  failed', error);
        });
    }

    const handleFinalDecision = (text, parentid = 0) => {
        let dataSend = {
            link: link,
            comment: `My final decision is: ${text} `,
            username: (JSON.parse(localStorage.getItem(INFO)).username),
            accountId: (JSON.parse(localStorage.getItem(INFO)).id),
            parentid: parentid,
            createat: new Date().toISOString(),
            assignmentId: location.state.infoAss.id,
            finalgrade: text
        }
        let promise = Axios({
            method: 'POST',
            url: `${URL_API}/gradeReview/api/addFinalDecision`,
            data: dataSend,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem(TOKEN) }
        });
        promise.then((res) => {
            setBackendComments([dataSend, ...backendComments]);
            setActiveComment(null);
        });
        promise.catch((error) => {
            console.log('handleFinalDecision  failed', error);
        });
    }
    //Run 1st
    useEffect(() => {
        if (localStorage.getItem(TOKEN)) {
            handleGetAllComments();
        }
    }, []);

    if (localStorage.getItem(TOKEN)) {
        return (
            <div>
                <HeaderGradeReview />
                <div className='container'>
                    <div className="row">
                        <h3 className='text-warning'>Name Assignment: {location.state.infoAss.name}</h3>
                        <CommentForm addComment={handleAddComment} submitLabel="Write" role={location.state.role} infoAss={location.state.infoAss} addFinalDecision={handleFinalDecision} />

                        <div className="comments-container">
                            {rootComments.map((rootComment) => (
                                <Comments
                                    key={rootComment.id || Math.random().toString(36).substring(2, 10)}
                                    comment={rootComment}
                                    replies={getReplies(rootComment.id)}
                                    activeComment={activeComment}
                                    setActiveComment={setActiveComment}
                                    addComment={handleAddComment}
                                    addFinalDecision={handleFinalDecision}
                                    currentUserId={JSON.parse(localStorage.getItem(INFO)).id}
                                    role={location.state.role}
                                    infoAss={location.state.infoAss}
                                />
                            ))}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
    else {
        return <Navigate to='/' />
    }
}

export default GradeReview;
