import React from 'react'

export const ReviewTitle = (props) => {
  return (
    <div className="col-md-8">
        <label htmlFor="validationServer01" className="form-label">Review Title</label>
        <input
            type="text"
            className={'form-control '}
            id="validationServer01"
            value={props.reviewTitle}
            onChange={props.handleReviewTitleChange}
            required
        />
        <span className='solid'>{props.reviewTitle.length}/30 chars</span> 
    </div>
  )
}
