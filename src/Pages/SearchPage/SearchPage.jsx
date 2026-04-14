import React, { useEffect, useState } from 'react'
import './SearchPage.css'
import { useNavigate } from 'react-router-dom';
import ListingCard from '../../Components/ListingCard/ListingCard';
import { apiFetch } from '../../utils/api';

const SearchPage = () => {
  const [listings, setListings] = useState(null);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const data = async () => {
      setLoading(true)
      const response = await apiFetch('/api/listings/all', {
        method: 'GET',
      })
      const data = await response.json()
       setLoading(false)
      setListings(data.listings || [])
    }
    data();
  }, [])
const handleCardClick = (listingId) => {
  navigate(`/listing/${listingId}`);
}

  return (
    <div className='search_page'>
      <h1>Search Page</h1>
      <p>Welcome to the Search Page!</p>
      <div className='listings_container'>
      {loading ? (
        <div className='loader'>Loading...</div>
      ) : Array.isArray(listings) && listings.length > 0 ? (
        listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} handleCardClick={handleCardClick} />
        ))
      ) : (
        <p>No listings found</p>
      )}
      </div>
    </div>
  )
}

export default SearchPage