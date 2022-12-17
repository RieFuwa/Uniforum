import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'bootstrap';

function Post(props) {
  const { id, userId, universityName, connectedCommentId, commentText, createDate, commentLikes, userName } = props
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(commentLikes.length);
  const [likeId, setLikeId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState([]);

  let disabled = "638a26ce4558e44e8c57b19d" == null ? true : false;

  const handleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      saveLike();
      setLikeCount(likeCount + 1)
    }
    else {
      await deleteLike();
      setLikeCount(likeCount - 1)
    }

  }


  const saveLike = () => {
    axios.post("/like/add", {
      commentId: id,
      userId: userId,
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
    var likeControl = commentLikes.find((like => "" + like.userId === "638a26ce4558e44e8c57b19d"));

    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  useEffect(() => { checkLikes() }, [])
  return (
    <div class="col-sm-6 mt-4" >
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Yorum Id'si: {id} <br></br> Yazanın adı : {userName} <br></br> Yazdığı Uni:{universityName} </h5>
          <p class="card-text">Connected Comment Id{connectedCommentId} </p>
          <p class="card-text">Yazdıgı yorum: {commentText} </p>
          <p class="card-text">Yazdıgı zaman:{createDate} </p>
          <div className=' clearfix justify-content-start '>
            <a href="#" class="btn btn-primary  me-auto p-2">Yanıt ver</a>
            {disabled ?
              <a
                disabled
                className='w-25 p-3 text-dark'
                style={{ fontSize: "25px" }}

                onClick={handleLike}
                aria-label="add to favorites"
              >
                <FaHeart style={isLiked ? { color: "red" } : null} />

              </a>
              :
              <a
                className='w-25 p-3 text-dark'
                style={{ fontSize: "25px" }}
                onClick={handleLike}
                aria-label="add to favorites"
              >

                <FaHeart style={isLiked ? { color: "red" } : null} />
              </a>

            }
            {likeCount}


          </div>

        </div>
      </div>
    </div>

  )
}

export default Post
//<FaHeart className='mt-1 float-end' style={{fontSize:"25px"}}></FaHeart>
