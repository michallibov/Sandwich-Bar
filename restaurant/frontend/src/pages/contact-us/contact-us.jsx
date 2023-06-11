import React, { useEffect, useState } from 'react'
import './contact-us.css';
import axios from 'axios';

export const ContactUs = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get("http://localhost:8800/reviews");
                setReviews(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchReviews();
    }, []);

  return (
      <div className='container'>
          <div className='contact'>
              <h3>Sandwich Bar</h3>
              <address>Sandwich Way St., New Sandwich</address>
              <p>telephone: +1313131313</p>
          </div>
          <div className='row row-cols-1 row-cols-md-2 g-4 justify-content-center'>
            {
              reviews.map((review) => {
                  return (
                    <div className="card col review" key={review.id}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src="./Unknown_person.jpg" className="img-fluid rounded-start" alt="..." />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                            <h4 className="card-title">{review.name}</h4>
                            <h5 className='card-title'>{review.reviewTitle}</h5>
                            <p className="card-text">{review.review}</p>
                            <span className={`fa fa-star ${review.stars >= 1 && 'checked'}`}></span>
                            <span className={`fa fa-star ${review.stars >= 2 && 'checked'}`}></span>
                            <span className={`fa fa-star ${review.stars >= 3 && 'checked'}`}></span>
                            <span className={`fa fa-star ${review.stars >= 4 && 'checked'}`}></span>
                            <span className={`fa fa-star ${review.stars >= 5 && 'checked'}`}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  )
              })
            }
           </div>
    </div>
  )
}
