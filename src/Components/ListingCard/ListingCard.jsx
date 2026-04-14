import React from 'react'
import './ListingCard.css'
import { apiUrl } from '../../utils/api';

const ListingCard = (props) => {
  const { images, description, price = '', title } = props?.listing || {};
  const imagePath = Array.isArray(images) && images.length > 0 ? images[0] : null;
  const imageSrc = imagePath ? apiUrl(imagePath) : null;
  return (
    <div className='card-container' onClick={() => props.handleCardClick(props.listing._id)}>
      {imageSrc ? (
        <img src={imageSrc} alt={title || 'Listing image'} className='cardimage' />
      ) : (
        <div className='card-image-placeholder'>No image</div>
      )}
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
    </div>
  )
}

export default ListingCard