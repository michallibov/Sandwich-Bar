import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import axios from 'axios';

import { Review } from './review.jsx';
import { ReviewTitle } from './reviewTitle.jsx';
import { StarRating } from './starRating.jsx';

function EditReviewModal({ setOpenModal }) {
  const [review, setReview] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [stars, setStars] = useState(null);
  const [cookie] = useCookies(['customer']);
  const [successfulMessage, setSuccessfulMessage] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const customerID = cookie.customer.customerID;
        console.log(customerID)
        const res = await axios.post("http://localhost:8800/myReview", { customerID });
        setReview(res.data[0].review);
        setReviewTitle(res.data[0].reviewTitle);
        setStars(res.data[0].stars);
      } catch (err) {
        console.log(err);
      }
    }
    fetchReviews();
  }, [cookie.customer.customerID]);

  const handleReviewChange = (event) => {
    const curReview = event.target.value;

    if(curReview.length <= 200)
        setReview(curReview);
  };

  const handleReviewTitleChange = (event) => {
    const curReviewTitle = event.target.value;

    if(curReviewTitle.length <= 30)
        setReviewTitle(curReviewTitle);
  };

  async function updateReview(event) {
    event.preventDefault();

    const customerID = cookie.customer.customerID;
    try {
      const response = await axios.post("http://localhost:8800/editReview", { customerID, review, reviewTitle, stars });
        if (response.data.code === 200) {
          setSuccessfulMessage(response.data.message);
      }
      setOpenModal(false);
    } catch {
      console.log("Something went wrong.");
    }
  }

  return (
    <div className="modalBackground">
        <div className="edit-modal">
          <div className="titleCloseBtn">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                setOpenModal(false);
              }}
            ></button>
          </div>
          <div>
          <form className="row g-3" onSubmit={updateReview}>
            {successfulMessage && (
                <div className='alert alert-success' role="alert">
                    {successfulMessage}    
                </div>
            )}
                <ReviewTitle reviewTitle={reviewTitle} handleReviewTitleChange={handleReviewTitleChange} />
                <div className='col-md-4 star-div'>
                    <StarRating stars={stars} setStars={setStars}/>
                </div>
                <Review review={review} handleReviewChange={handleReviewChange} />
                <div className="col-12 submit mt-4">
                    <button className="btn btn-secondary" type="submit">Edit</button>
                </div>
            </form>
          </div>
        </div>
      </div>
  )
}
export default EditReviewModal;