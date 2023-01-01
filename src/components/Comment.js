import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import RespondComment from './RespondComment';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import CreateRespondComment from './CreateRespondComment';
import '../scss/style.scss'
import { DeleteWithAuth, PostWithAuth } from '../services/HttpService';
import { capitalizeFirstLetter, formatDate } from '../helpers/StringFomatter';


function Comment(props) {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      handleSubmit()
    );

    return (
      <button
        type="button"
        class="btn btn-primary"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const { id, user, commentText, createDate, commentLikes, universityId, connectedCommentId } = props
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(commentLikes.length);
  const [likeId, setLikeId] = useState(null);
  const [error, setError] = useState(null);
  const [respondCommentList, setRespondCommentList] = useState([]);
  const [isLoadedRespondComment, setIsLoadedRespondComment] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  let disabled = localStorage.getItem("signedUserId") == null ? false : true;


  const getRespondComment = async () => {
    await axios.get("/comment/commentAnswers?connectedCommentId=" + id).then(function (response) {
      return response.data
    }).then(
      (result) => {
        setIsLoadedRespondComment(true);
        setRespondCommentList(result);
      }, (error) => {
        setIsLoadedRespondComment(true);
        setError(error);
      })
  }

  const saveLike = async () => {
    await PostWithAuth("/like/add", {
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

  const deleteComment = async () => {
    await DeleteWithAuth("/comment/" + id, {
    }).then(function (response) {
      setIsDeleted(true)
    }).catch(function (error) {
      console.log(error)
    })

  }

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

  const checkLikes = () => {
    var likeControl = commentLikes.find((like => "" + like.userId === localStorage.getItem("signedUserId")));
    if (likeControl != null) {
      setLikeId(likeControl.id);
      setIsLiked(true);
    }
  }

  const handleSubmit = async () => {
    await getRespondComment();
  }





  useEffect(() => {
    checkLikes()
  }, [])

  if (connectedCommentId === null && !isDeleted) {
    return (
      <Accordion defaultActiveKey="1">
        <Card className='mt-3 border border-1 ' style={{ backgroundColor: "White" }}>

          <div class="card-body">
            <div class="row">
              <div class="col-auto">
                <Link to={{ pathname: '/user/' + user.id }}>
                  <button type="button" class="btn userbttn btn-lg">
                    {user.userName.charAt(0).toUpperCase()}
                  </button>
                </Link>
              </div>
              <div class="col p-0 d-flex ">
                <h5 >{capitalizeFirstLetter(user.userName)}
                  <p class="dateText">{formatDate(createDate)} </p>
                </h5>
              </div>
              {
                user.id == localStorage.getItem('signedUserId') ?
                  <div class="col-auto">
                    <button type='button' class='btn btn-danger' onClick={deleteComment}>Delete</button>
                  </div> :
                  null
              }
            </div>

            <p class="card-text fs-5">
              {commentText}
            </p>

            <CustomToggle eventKey="0">
              Tüm Yanıtlar
            </CustomToggle>

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
              {likeCount}

              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  {localStorage.getItem("signedUserId") != null ? <CreateRespondComment userId={localStorage.getItem("signedUserId")} connectedCommentId={id} universityId={universityId}
                    getRespondComment={getRespondComment}></CreateRespondComment> : <></>}
                  {error ? "error" : isLoadedRespondComment ? respondCommentList.map((key, index) => (<RespondComment key={index} id={key.id} user={key.user}
                    commentText={key.commentText} createDate={formatDate(key.createDate)} commentLikes={key.commentLikes}></RespondComment>)) : "Loading"}
                </Card.Body>
              </Accordion.Collapse>
            </div>
          </div>
        </Card>
      </Accordion>


    )
  }
}

export default Comment
//<FaHeart className='mt-1 float-end' style={{fontSize:"25px"}}></FaHeart>
