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


  useEffect(() => {
    checkLikes()
  }, [])

  if (connectedCommentId === null) {

    return (
      <div class="col-sm mt-4 " >
        <div>
        </div>
        <div class="card border border-2 border-success">
          <div class="card-body">
            <div class="clearfix col-1 text-center  ">

              <Link to={{ pathname: '/user/' + user.id }}>
                <button type="button" class="btn btn-danger btn-lg rounded-circle fs-4">
                  {user.userName.charAt(0).toUpperCase()}
                </button>

              </Link>

              <h5 class="card-title fs-5 fw-bold">{/*Yorum Id'si: {id} */} {user.userName} </h5>
            </div>


            {/* <p class="card-text">Connected Comment Id{connectedCommentId} </p> */}
            <p class="card-text fs-5">
              {/* Yazdıgı yorum:  */}
              {commentText}
            </p>
            <p class="card-text">
              {/* Yazdıgı zaman: */}
              {createDate} </p>
            <div className=' clearfix justify-content-start '>

              <button href="#" class="btn btn-success   m-1 fs-6">Yanıt ver</button>
              <a
                disabled
                className=' p-2 text-dark'
                style={{ fontSize: "25px" }}

                onClick={disabled ? handleLike : null}
                aria-label="add to favorites"
              >
                <FaHeart style={isLiked ? { color: "red" } : null} />
              </a>

              {likeCount}
              <Accordion defaultActiveKey="1" >
                <Card className='mt-2 border border-1 border-success' style={{ backgroundColor: "transparent" }}>
                  <Card.Header >
                    <CustomToggle eventKey="0">Tüm Yanıtlar</CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">

                    <Card.Body>
                      {localStorage.getItem("signedUserId") != null ? <CreateRespondComment userId={localStorage.getItem("signedUserId")} connectedCommentId={id} universityId={universityId} getRespondComment={getRespondComment}></CreateRespondComment> : <></>}

                      {error ? "error" : isLoadedRespondComment ? respondCommentList.map((key, index) => (<RespondComment key={index} id={key.id} user={key.user}
                        commentText={key.commentText} createDate={key.createDate} commentLikes={key.commentLikes}></RespondComment>)) : "Loading"}

                    </Card.Body>

                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default Comment
//<FaHeart className='mt-1 float-end' style={{fontSize:"25px"}}></FaHeart>
