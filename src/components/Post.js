import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { Button } from 'bootstrap';

function Post(props) {
const{id,userId,universityId,connectedCommentId,commentText,createDate} = props
//const [isLiked, setIsLiked] = useState(false);
//const [likeCount, setLikeCount] = useState(likes.lentgh);
//const [likeId, setLikeId] = useState(null);
//let disabled = "638a26ce4558e44e8c57b19d" == null ? true:false;

// const handleLike = () => {
//   setIsLiked(!isLiked);
//   if(!isLiked){
//     saveLike();
//     setLikeCount(likeCount + 1)
//   }
//   else{
//     deleteLike();
//     setLikeCount(likeCount - 1)
//   }
    
//  }

// const saveLike = async() => {
//   await axios.post("/like/add",{
//    id:id,
//    userId:userId,
//   }).then(function(response){
//    console.log(response)
//   }).catch(function(error){
//    console.log(error)
//   })
// }

// const deleteLike = async()=>{
//   await axios.delete("/like/?likeId="+ likeId,{
//   }).catch(function(error){
//     console.log(error)
//   })
// }

// const checkLikes = () => {
//   var likeControl = likes.find((like =>  ""+like.userId === "638a26ce4558e44e8c57b19d"));
//   if(likeControl != null){
//     setLikeId(likeControl.id);
//     setIsLiked(true);
//   }
// }

// useEffect(() => {checkLikes()},[])
  return (
 
      <div class="col-sm-6 mt-4" >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Yorum Id'si: {id} <br></br> Yazanın Id'si : {userId} <br></br> Yazdığı Uni id'si:{universityId} </h5>
            <p class="card-text">Connected Comment Id{connectedCommentId} </p>
            <p class="card-text">Yazdıgı yorum: {commentText} </p>
            <p class="card-text">Yazdıgı zaman:{createDate} </p> 
            <div className=' clearfix'>
            <a href="#" class="btn btn-primary float-start">Yanıt ver</a>
            <FaHeart className='mt-1 float-end' style={{fontSize:"25px",color:"grey"}}></FaHeart>
{/* 
            {disabled ?                    
                  <Button 
                  className='mt-1 float-end'
                  style={{fontSize:"25px"}}
                    disabled
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FaHeart style={isLiked? { color: "red" } : null} />
                    </Button>
                     :
                    <Button 
                    onClick={handleLike}
                    aria-label="add to favorites"
                    >
                    <FaHeart style={isLiked? { color: "black" } : null} />
                    </Button>
                  }
  {likeCount} */}

            </div>
         
          </div>
        </div>
      </div>
      
  )
}

export default Post
//<FaHeart className='mt-1 float-end' style={{fontSize:"25px"}}></FaHeart>
