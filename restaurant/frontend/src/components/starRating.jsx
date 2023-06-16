import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa';
import '../pages/contact-us/contact-us.css'

export const StarRating = ({stars, setStars}) => {
    const [hover, setHover] = useState(null);

    return (
        <div>
            {
                [...Array(5)].map((star, i) => {
                    const ratingValue = i + 1;
                    return (
                        <label key={i}>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => setStars(ratingValue)}                                
                            />
                            <FaStar
                                className='star'
                                color={ratingValue <= (hover || stars) ? "#ffc107" : "white"}
                                size={20}
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    )
                })
            }
        </div>
    )
}
