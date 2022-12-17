import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import { Button } from 'bootstrap';
import CreatePost from '../components/CreatePost';

function University() {
  const { universityId } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isInitialMount = useRef(true);
  const [universityById, setUniversityById] = useState([]);
  const [uniComment, setUniComment] = useState([]);


  const getUniversityById = async () => {
    await axios.get("/university/" + universityId).then(function (response) {
      console.log(response);
      return response.data
    }).then(
      (result) => {
        console.log(result)
        setUniversityById(result);
      }, (error) => {
        console.log(error)

      })
  }

  const getUniversityComment = async () => {
    await axios.get("/comment/getAllUniversityComment?universityId=" + universityId).then(function (response) {
      console.log(response);
      return response.data
    }).then(
      (result) => {
        setIsLoaded(true)
        console.log(result)
        setUniComment(result);
      }, (error) => {
        setIsLoaded(true)
        setError(true)
        console.log(error)

      })
  }

  useEffect(() => {
    getUniversityById()
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getUniversityComment();
    }
  }, [])


  return (

    <div className='container-sm'>
      <div className="card ">
        <img src={universityById.universityPhotos}></img>
        <div className="card-header">
          <h1>{universityById.universityName}</h1><span class="badge text-bg-success">UniversityType </span>
          <Link to={"/"}><span className="badge text-bg-danger">Menüye dön</span></Link>

        </div>
      </div>

      <CreatePost userId="638a26ce4558e44e8c57b19d" universityId={universityId} getUniversityComment={getUniversityComment}></CreatePost>


      <h2 className='mt-4 text-center'>YORUMLAR</h2>

      <div className='row'>
        
        {error ? "error" : isLoaded ? uniComment.map((key, index) => (<Post key={index} id={key.id} userId={key.user.id} userName={key.user.userName}
          universityName={key.university.universityName} connectedCommentId={key.connectedCommentId} commentText={key.commentText} createDate={key.createDate} commentLikes={key.commentLikes} getUniversityComment={getUniversityComment}></Post>)) : "Loading"}
      
      </div>

    </div>
  )
}

export default University
// {universityById.id}
// {universityById.universityName}