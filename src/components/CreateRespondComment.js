import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { PostWithAuth } from '../services/HttpService';

function CreateRespondComment(props) {
  const { connectedCommentId, userId, universityId, getRespondComment } = props
  const [respondCommentText, setRespondCommentText] = useState("");
  const [isSend, setIsSend] = useState(false);


  const saveRespondComment = async () => {
    await PostWithAuth("/comment/add", {
      connectedCommentId: connectedCommentId,
      userId: userId,
      universityId: universityId,
      commentText: respondCommentText
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }

  const handleSumbit = async () => {
    if (respondCommentText.trim().length !== 0) {
      await saveRespondComment();
      setIsSend(true);
      setRespondCommentText("");
      getRespondComment();
    } else {
      console.log("bos")
    }

  }

  const handleRespondComment = (value) => {
    setRespondCommentText(value);
    setIsSend(false);
  }


  return (
    <div class="card text-center mt-3 border border-1 border-primary">

      <div class="card-header fs-5">
        Yanıt ver
      </div>
      <form>
        <div class="card-body ">

          <input type={"text"} className="form-control mt-2" placeholder="Yanıtla" maxLength={200} value={respondCommentText} name="commentText" onChange={(i) => handleRespondComment(i.target.value)} required ></input>

          <a class="btn btn-success mt-2" onClick={handleSumbit}>Gönder</a>
        </div>
      </form>


    </div>
  )
}

export default CreateRespondComment