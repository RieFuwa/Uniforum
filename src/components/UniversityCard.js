import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { Link } from 'react-router-dom';
function UniversityCard() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [university, setUniversity] = useState([]);

  const getUniversity = () => {
    axios.get("/university/getAll").then(function (response) {
        console.log(response);
        return response.data
    }).then(
        (result) => {
            setIsLoaded(true);
            setUniversity(result);
        }, (error) => {
            setIsLoaded(true);
            setError(error);
        })
}

  useEffect(() => {
    getUniversity();
  }, [])

  if (error) {
    return <div> Error !!!</div>;
  } else if (!isLoaded) {
    return <div> Loading... </div>;
  } else {
    return (
      <div class="row justify-content-center " >
        {university.map((key,index) => (
          <div class="col-md-3 mt-4 "key={index}>
            <div class="row row-cols-md-6 " ></div>
            <div class="card foto shadow " >
              <Link to={{pathname:'/university/' + key.id}}><img src={key.universityPhotos} class="card-img " /></Link>
              <div class="card-body " >
                <h5 class="card-title   "> {key.universityName} </h5>
                <p class="card-text section-white font-monospace ">
                {key.universityTypeId}
                </p>
                <Link to={{pathname:'/university/' + key.id}}> <a class="btn btn-primary">Universite Hakkında &nbsp; </a></Link>
              
              </div>
            </div>
          </div>))}
      </div>
    )
  }

}

export default UniversityCard

 // <div class='container row-cols-6 row-cols-md-12 mt-5 justify-content-center'>
  //     <div class="card"   >
  //       <a ><img src="https://raw.githubusercontent.com/RieFuwa/Cimage/main/Braum.jpg" class="card-img-top " /></a>
  //       <div class="card-body">
  //         <h5 class="card-title">Card title</h5>
  //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  //         <a href="#" class="btn btn-primary">Go somewhere</a>
  //       </div>
  //     </div>
  //   </div>