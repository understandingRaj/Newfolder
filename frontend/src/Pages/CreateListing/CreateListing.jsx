import React, { useEffect, useState } from 'react';
import './CreateListing.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { apiFetch, apiUrl } from '../../utils/api';

const CreateListing = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [details, setDetails] = useState({
    title: '',
    description: '',
    price: '',
    images: []
  });
console.log(details.images.length,'%%%%%%%%%==> details')
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    try {
      const response = await apiFetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data,'%%%%%%%%%==> data')

      if (!response.ok || !Array.isArray(data.files)) {
        throw new Error(data.message || 'Image upload failed');
      }

      setDetails((prev) => ({ ...prev, images: [...prev.images, ...data.files] }));
      setError(null);
      setMessage('Images uploaded successfully');
    } catch (err) {
      setError(err.message || 'Image upload failed');
      setMessage(null);
    }
  }

  const removeImage = (index) => {
    setDetails((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setDetails((prev) => ({ ...prev, [name]: value }))
    setError(null)
    setMessage(null)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    const response = await apiFetch('/api/listings/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        ...details,
        price: Number(details.price),
        images: Array.isArray(details.images) ? details.images : []
      }),
    })
    const data = await response.json()

    if (data.status === 200) {
      setDetails({
        title: '',
        description: '',
        price: '',
        images: []
      })
      setMessage(data.message)
      setError(null)
      // navigate('/s')
    } else {
      setError(data.message)
    }
  };

  return (
    <div className='create-listing-form'>
      <div className='createlistingheading'>Create Listing</div>

      <form onSubmit={handleSubmit}>
        <div>
          <label className='file-input-label'>Title *</label>
          <input
            name="title"
            value={details.title}
            type="text"
            placeholder='e.g., Vintage Watch'
            onChange={handleOnChange}
            // className='inputbox'
          />
        </div>

        <div>
          <label className='file-input-label'>Description *</label>
          <input
            name="description"
            value={details.description}
            placeholder='Describe your item in detail...'
            rows="4"
            onChange={handleOnChange}
            // className='inputbox'
          />
        </div>

        <div>
          <label className='file-input-label'>Price ($) *</label>
          <input
            name="price"
            value={details.price}
            type="number"
            placeholder='0.00'
            step="0.01"
            onChange={handleOnChange}
            // className='inputbox'
          />
        </div>

        <div>
          <label className='file-input-label'>Upload Images</label>
          <div className='file-input-wrapper'>
            <input
              id="fileInput"
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className='file-input-text'>
                <p>📷 Click to upload or drag & drop</p>
                <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>PNG, JPG up to 10MB</p>
              </div>
            </label>
          </div>
          {details.images.length > 0 && (
            <div className='image-preview'>
              {details.images.map((image, index) => {
                console.log(image,'%%%%%%%%%==> image')
                if (!image) return null;
                
                let imagePath = image;
                if (typeof image === 'object' && image.filename) {
                  imagePath = `/uploads/${image.filename}`;
                } else if (typeof image === 'object' && image.path) {
                  imagePath = image.path.replace(/\\/g, '/').replace('server', '');
                }
                
                const imageSrc = apiUrl(imagePath);
                return (
                  <div key={index} className='image-preview-item'>
                    <img src={imageSrc} alt={`Preview ${index + 1}`} />
                    <div
                      // type='button'
                      className='remove-btn'
                      onClick={() => removeImage(index)}
                      title='Remove image'
                    >
                      ×
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <button 
          type='submit' 
          disabled={!details.title || !details.description || !details.price}
        >
          Create Listing
        </button>

        {error && <p className='form-message error'>{error}</p>}
        {message && !error && <p className='form-message success'>{message}</p>}
      </form>
    </div>
  );
};

export default CreateListing;