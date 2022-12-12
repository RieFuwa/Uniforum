import React from 'react'
import { Link } from 'react-router-dom'

function Post(props) {
const{id,userId,universityId,connectedCommentId,commentText,createDate} = props

  return (
 
      <div class="col-sm-6 mt-4" >
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Yorum Id'si: {id} <br></br> Yazanın Id'si : {userId} <br></br> Yazdığı Uni id'si:{universityId} </h5>
            <p class="card-text">Connected Comment Id{connectedCommentId} </p>
            <p class="card-text">Yazdıgı yorum: {commentText} </p>
            <p class="card-text">Yazdıgı zaman:{createDate} </p>
            <a href="#" class="btn btn-primary">Yanıt ver</a>
          </div>
        </div>
      </div>
      
  )
}

export default Post