import React from 'react'
import { Link } from 'react-router-dom'

const DisplayRestaurantReviews = ({id}) => {
  return (
    <>
    <Link to={`/review/restaurants/${id}`} style={{ textDecoration: 'none' }}> Add a Review {id}</Link>
    </>
  )
}

export default DisplayRestaurantReviews