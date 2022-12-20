import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

function RespondComment(props) {

  const { id, user, commentText, createDate,commentLikes } = props
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(commentLikes.length);
  const [likeId, setLikeId] = useState(null);
  const [error, setError] = useState(null);
  let disabled = localStorage.getItem("signedUserId") == null ? false : true;


  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else {
      setLikeCount(likeCount - 1)
      await deleteLike();
    }
  }
  const saveLike = () => {
    axios.post("/like/add", {
      commentId: id,
      userId: localStorage.getItem("signedUserId"),
    }).then(function (response) {
      setLikeId(response.data.id)

    }).catch(function (error) {
      console.log(error)
    })
  }

  const deleteLike = async () => {
    await axios.delete("/like/" + likeId, {
    }).catch(function (error) {
      console.log(error)
    })
  }

  const checkLikes = () => {
    var likeControl = commentLikes.find((like => "" + like.userId === localStorage.getItem("signedUserId")));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  useEffect(() => {
    checkLikes()
  }, [])
  return (
    <div class=" mt-4 " >
      <div class="card border border-1 border-success">
        <div class="card-body ">
          <div class="clearfix col-1 text-center  ">
            
             <Link to={{ pathname: '/user/' + user.id }}>
              
                <button type="button" class="btn btn-danger btn-sm rounded-circle fs-5">
                  {user.userName.charAt(0).toUpperCase()}
                </button>

              </Link>

              <p class="card-title  fw-bold">{/*Yorum Id'si: {id} */} {user.userName} </p>
          </div>
      
          {/* <h3>yorum idsi: {id} </h3> */}
          {/* <h4>conntenctedcomment id : {connectedCommentId} </h4> */}
          {/* <p class="card-text">Connected Comment Id{connectedCommentId} </p> */}
          <p class="card-text">
            {/* Yazdıgı yorum:  */}
            {commentText}
          </p>
          <p class="card-text">
            {/* Yazdıgı zaman: */}
            {createDate} </p>
          <div className=' clearfix justify-content-start '>
            <a
              disabled
              className=' text-dark'
              style={{ fontSize: "25px" }}

              onClick={disabled ? handleLike : null}
              aria-label="add to favorites"
            >
              <FaHeart style={isLiked ? { color: "red" } : null} />
            </a>
            &nbsp;&nbsp;
            {likeCount}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RespondComment