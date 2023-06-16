import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { StarRating } from './starRating';
import axios from 'axios';
import '../pages/contact-us/contact-us.css'
import { ReviewTitle } from './reviewTitle';
import { Review } from './review';

export const CreateReview = () => {
    const [reviewTitle, setReviewTitle] = useState('');
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [cookie] = useCookies(['customer']);
    const [errorMessage, setErrorMessage] = useState('');
    const [successfulMessage, setSuccessfulMessage] = useState('');

    async function postReview(event) {
        event.preventDefault();

        const customerID = cookie.customer.customerID;
        try {
            const response = await axios.post("http://localhost:8800/postReview", { customerID, review, reviewTitle, stars });
            if (response.data.code === 200) {
                setSuccessfulMessage(response.data.message);
                setErrorMessage('');
            }
            else {
                setErrorMessage(response.data.message);
                setSuccessfulMessage('');
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    
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

    return (
        <div className='container write-review'>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            {successfulMessage && (
                <div className='alert alert-success' role="alert">
                    {successfulMessage}    
                </div>
            )}
            <form className="row g-3" onSubmit={postReview}>
                <ReviewTitle reviewTitle={reviewTitle} handleReviewTitleChange={handleReviewTitleChange} />
                <div className='col-md-4 star-div'>
                    <StarRating stars={stars} setStars={setStars}/>
                </div>
                <Review review={review} handleReviewChange={handleReviewChange} />
                <div className="col-12 submit mt-4">
                    <button className="btn btn-secondary" type="submit">Post</button>
                </div>
            </form>
        </div>
    )
}
