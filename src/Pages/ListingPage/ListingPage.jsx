import React, { useEffect, useState } from 'react'
import './ListingPage.css'
import { useParams } from 'react-router-dom';

const ListingPage = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const addTocart = (listingId) => {
  // Implement add to cart functionality here
  console.log(`Add listing ${listingId} to cart`);
  const response = fetch('http://localhost:5000/api/cart/add-to-cart', {
    method: 'POST',
    headers: {  
        'Content-Type': 'application/json',
        // Include authentication token if required
        'Authorization': localStorage.getItem('token')
    },
    body: JSON.stringify({ listingId })
});
    }
    useEffect(() => {
        const fetchListingDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:5000/api/fetch-listings/${id}`, {
                    method: 'GET',
                });
                const data = await response.json();
                if (data.status === 200) {
                    setListing(data.listing);
                } else {
                    setError(data.message || 'Failed to fetch listing');
                }
                console.log(data, '%%%%%%%%%==> listing details')
            } catch (error) {
                setError('Error fetching listing details');
                console.error('Error fetching listing details:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchListingDetails();
    }, [id])

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '60px 20px', fontSize: '18px', color: '#666' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', padding: '60px 20px', fontSize: '18px', color: '#e74c3c' }}>{error}</div>;
    }

    const { title, description, price = 0, images } = listing || {};
    const imagePath = Array.isArray(images) && images.length > 0 ? images[0] : null;
    const imageSrc = imagePath ? (imagePath.startsWith('http') ? imagePath : `http://localhost:5000${imagePath}`) : null;

    return (
        <div>
            <h1 className='listingHeading'>Listing Details</h1>
            <div className='listing_details'>
                <div className='image'>
                    {imageSrc ? (
                        <img src={imageSrc} alt={title} />
                    ) : (
                        <div style={{ 
                            width: '100%', 
                            height: '450px', 
                            background: '#f0f0f0', 
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#999'
                        }}>
                            No image available
                        </div>
                    )}
                </div>
                <div className='info'>
                    <div className='details'>
                        <p><strong>{title}</strong></p>
                        <p><strong>Description</strong> {description}</p>
                        <p><strong>Price:</strong> ${price.toFixed(2)}</p>
                        <button className='add-to-cart-btn' onClick={() => addTocart(listing._id)}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage