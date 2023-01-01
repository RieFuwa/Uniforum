import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Comment from '../components/Comment'
import '../scss/style.scss'
import { capitalizeFirstLetter } from '../helpers/StringFomatter';

function User() {
  const { userId } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadedComments, setIsLoadedComments] = useState(false);
  const [user, setUser] = useState();
  const [userComments, setUserComments] = useState();


  const getUserById = () => {
    axios.get("/user/" + userId).then(function (response) {

      return response.data
    }).then(
      (result) => {
        setIsLoaded(true);
        setUser(result);
      }, (error) => {
        setIsLoaded(true);
        setUser(error);
      })
  }

  const getUserComments = () => {
    axios.get("/comment/getAllUserComment?userId=" + userId).then(function (response) {
      console.log(response)
      return response.data
    }).then(
      (result) => {
        setIsLoadedComments(true);
        setUserComments(result);
      }, (error) => {
        setIsLoadedComments(true);
        setUser(error);
      })
  }



  useEffect(() => {
    getUserById()
    getUserComments()
  }, [])

  return (
    <div class='container'>
      <div class="row justify-content-center ">
        {isLoaded ?
          <div class="col-auto userInfoCol" >
            <div class="userPhoto m-4">
              {user.userName.charAt(0).toUpperCase()}
            </div>
            <p class="userName">{capitalizeFirstLetter(user.userName)}</p>
          </div> : "Loading"
        }
      </div>
      <div class="row justify-content-center ">
        {isLoadedComments ?
          <div class="col-sm-10 " >
            {userComments.map((key, index) => <Comment key={index} id={key.id} user={key.user}
              connectedCommentId={key.connectedCommentId} commentText={key.commentText} createDate={key.createDate} commentLikes={key.commentLikes} universityId={key.universityId}></Comment>)}
          </div> : "Loading"
        }
      </div>
    </div>

  )
}

export default User