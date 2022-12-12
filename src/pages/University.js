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


  const getUniversityById = () => {
    axios.get("/university/" + universityId).then(function (response) {
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

  const getUniversityComment = async() => {
  await  axios.get("/comment/getAllUniversityComment?universityId=" + universityId).then(function (response) {
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
      <div class="card ">
        <img src={universityById.universityPhotos}></img>
        <div class="card-header">
          <h1>{universityById.universityName}</h1><span class="badge text-bg-success">UniversityType:{universityById.universityTypeId}</span>
          <Link to={"/"}><span class="badge text-bg-danger">Menüye dön</span></Link>

        </div>
      </div>

   <CreatePost userId="638a26ce4558e44e8c57b19d" universityId={universityId} getUniversityComment={getUniversityComment}></CreatePost>


      <h2 className='mt-4 text-center'>YORUMLAR</h2>

      <div className='row'>
        {error ? "error" : isLoaded ? uniComment.map((key , index) => (<Post key={index} id={key.id} userId={key.userId}
          universityId={key.universityId} connectedCommentId={key.connectedCommentId} commentText={key.commentText} createDate={key.createDate}></Post>)) : "Loading"}
      </div>

    </div>
  )
}

export default University
// {universityById.id}
// {universityById.universityName}