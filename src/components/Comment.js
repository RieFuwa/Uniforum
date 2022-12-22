import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import RespondComment from './RespondComment';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import CreateRespondComment from './CreateRespondComment';
import './comment.scss'


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

  const handleSubmit = async () => {
    await getRespondComment();
  }

  const getRespondComment = async () => {
    await axios.get("/comment/commentAnswers?connectedCommentId=" + id).then(function (response) {
      console.log(response);
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

  const formatDate = (strDate) => {
    var date = new Date(strDate)
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var formattedDate = date.toLocaleDateString("en-US", options)
    return formattedDate;
  }

  const capitalizeFirstLetter = (str) => {
    console.log(str)
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


  useEffect(() => {
    checkLikes()
  }, [])

  if (connectedCommentId === null) {
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
              <div class="col p-0">
                <h5 >{capitalizeFirstLetter(user.userName)}
                  <p class="dateText">
                    {formatDate(createDate)} </p>
                </h5>
              </div>
            </div>

            <p class="card-text fs-5">
              {commentText}
            </p>

            <CustomToggle eventKey="0">Tüm Yanıtlar</CustomToggle>
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
                  {localStorage.getItem("signedUserId") != null ? <CreateRespondComment userId={localStorage.getItem("signedUserId")} connectedCommentId={id} universityId={universityId} getRespondComment={getRespondComment}></CreateRespondComment> : <></>}

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