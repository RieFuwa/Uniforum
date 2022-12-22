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
      <div className="row justify-content-center " >
        {university.map((key, index) => (
          <div className="col-md-3 mt-4 " key={index}>
            <div className="row row-cols-md-6 " ></div>
            <div className="card foto shadow " >
              <Link to={{ pathname: '/university/' + key.id }}><img src={key.universityPhotos} className="card-img " /></Link>
              <div className="card-body " >
                <h5 className="card-title   "> {key.universityName} </h5>
                <p className="card-text section-white font-monospace ">
                  {key.universityType.universityTypeName}
                </p>
                {/* <Link to={{ pathname: '/university/' + key.id }}> <a className="btn btn-primary">Universite Hakkında &nbsp; </a></Link> */}

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