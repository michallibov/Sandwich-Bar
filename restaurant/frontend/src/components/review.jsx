import React from 'react'

export const Review = (props) => {
  return (
    <div className="col-md-12">
        <label htmlFor="validationServer02" className="form-label">Review</label>
        <textarea
            className="form-control"
            aria-label="With textarea"
            id="validationServer02"
            value={props.review}
            onChange={props.handleReviewChange}
        />
        <span className='solid'>{props.review.length}/200 chars</span> 
    </div>
  )
}
