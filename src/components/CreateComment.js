import axios from 'axios';
import React, { useState } from 'react'


function CreateComment(props) {
    const { userId, universityId, getUniversityComment } = props;
    const [commentText, setComment] = useState("");
    const [isSend, setIsSend] = useState(false);


    const saveComment = async () => {
        await axios.post("/comment/add", {
            userId: userId,
            universityId: universityId,
            commentText: commentText
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }


    const handleSumbit = async () => {
        if (commentText.trim().length !== 0) {
            await saveComment();
            setIsSend(true);
            setComment("");
            getUniversityComment();
        } else {
            console.log("bos")
        }

    }



    const handleComment = (value) => {

        setComment(value);
        setIsSend(false);
    }


    return (
        <div class="card text-center mt-3 border border-2 border-primary">

            <div class="card-header fs-5">
                Üniversite hakkında yorum yap
            </div>
            <form>
                <div class="card-body ">

                    <input type={"text"} className="form-control mt-2" placeholder="Yorum" maxLength={200} value={commentText} name="commentText" onChange={(i) => handleComment(i.target.value)} required ></input>

                    <a class="btn btn-success mt-2" onClick={handleSumbit}>Gönder</a>
                </div>
            </form>


        </div>
    )
}

export default CreateComment