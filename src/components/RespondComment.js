import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { DeleteWithAuth, PostWithAuth } from '../services/HttpService';

function RespondComment(props) {

  const { id, user, commentText, createDate, commentLikes } = props
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
    PostWithAuth("/like/add", {
      commentId: id,
      userId: localStorage.getItem("signedUserId"),
    }).then(function (response) {
      setLikeId(response.data.id)

    }).catch(function (error) {
      console.log(error)
    })
  }

  const deleteLike = async () => {
    await DeleteWithAuth("/like/" + likeId, {
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

    <div class="card-body">
      <div class="row">
        <div class="col-auto">
          <Link to={{ pathname: '/user/' + user.id }}>
            <button type="button" class="btn userbttn btn-lg">
              {user.userName.charAt(0).toUpperCase()}
            </button>
          </Link>
        </div>
        <div class="col p-0">
          <h5 >{user.userName}
            <p class="dateText">
              {createDate} </p>
          </h5>
        </div>
      </div>

      <p class="card-text fs-5">
        {commentText}
      </p>


      <div className=' clearfix justify-content-start '>
        <a
          disabled
          className=' p-1 text-dark'
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

  )
}

export default RespondComment





