import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { apiGet, apiPost } from '../utils/api';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FaStar, FaRegStar } from 'react-icons/fa';
import './Home.css'; // Make sure to import the CSS

function Home() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  
  // Review form states
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

  const watchRating = watch('rating');

  useEffect(() => {
    if (watchRating) {
      setSelectedRating(parseInt(watchRating));
    }
  }, [watchRating]);

  // High-quality shirt and jeans images for men's clothing
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Classic denim jeans',
      caption: 'Premium Denim Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Formal cotton shirts',
      caption: 'Elegant Formal Shirts'
    },
    {
      url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Casual jeans outfit',
      caption: 'Everyday Casual Wear'
    },
    {
      url: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Men in denim jacket',
      caption: 'Denim Jacket Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Stylish men shirt',
      caption: 'Designer Shirts'
    },
    {
      url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Men fashion casual',
      caption: 'Modern Casual Style'
    },
    {
      url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Men clothing display',
      caption: 'Complete Your Look'
    }
  ];

  // Featured collection covers - shirt and jeans focused
  const collectionCovers = [
    {
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Premium Shirts'
    },
    {
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Denim Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Casual Jeans'
    },
    {
      url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Party Wear'
    }
  ];

  // Three featured fashion images - focused on shirts and jeans
  const featuredImages = [
    {
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Premium jeans collection',
      caption: 'Premium Denim',
      position: 'left'
    },
    {
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Formal shirts',
      caption: 'Formal Collection',
      position: 'center'
    },
    {
      url: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Denim jacket style',
      caption: 'Denim Style',
      position: 'right'
    }
  ];

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '30px', width: '100%', zIndex: 10 }}>
        <ul style={{ margin: '0', display: 'flex', justifyContent: 'center', gap: '10px' }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.5)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
      />
    )
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      // Fetch collections data
      const collectionsData = await apiGet('collections');
      setCollections(Array.isArray(collectionsData) ? collectionsData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setValue('rating', rating.toString());
  };

  const onSubmit = async (formData) => {
    try {
      setSubmitting(true);
      await apiPost({
        action: 'addReview',
        ...formData,
        rating: parseInt(formData.rating)
      });
      toast.success('Review submitted successfully! Thank you for your feedback.');
      reset();
      setSelectedRating(0);
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <Slider ref={sliderRef} {...carouselSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <div 
                className="carousel-image"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${image.url})`,
                }}
              />
              <div className="carousel-caption">
                <h2>{image.caption}</h2>
                <p>Premium quality shirts and jeans at NEW GULATI ENTERPRISE</p>
                <button 
                  onClick={() => window.open('/collections', '_self')}
                  className="button carousel-button"
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {/* Custom navigation arrows */}
        <button 
          onClick={() => sliderRef.current?.slickPrev()}
          className="carousel-arrow prev"
        >
          ←
        </button>
        <button 
          onClick={() => sliderRef.current?.slickNext()}
          className="carousel-arrow next"
        >
          →
        </button>

        {/* Slide counter */}
        <div className="slide-counter">
          {currentSlide + 1} / {carouselImages.length}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section">
        <div className="container">
          <div className="welcome-content">
            <h1>Premium Shirts & Jeans - NEW GULATI ENTERPRISE</h1>
            <p>
              Welcome to NEW GULATI ENTERPRISE, your trusted destination for premium quality 
              men's shirts and jeans. We specialize in bringing you the finest fabrics, 
              perfect fits, and latest styles. Whether you're looking for formal shirts, 
              casual denim, or trendy party wear, we have something for every occasion.
              Based in India, we deliver quality and style right to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Three Featured Images Section with Varied Caption Positions */}
      <section className="section accent-bg">
        <div className="container">
          <h2 className="section-title">Our Premium Collection</h2>
          <div className="featured-grid">
            {featuredImages.map((image, index) => (
              <div 
                key={index} 
                className={`featured-card featured-${image.position}`}
              >
                <div className="featured-image-wrapper">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="featured-image"
                  />
                  <div className={`featured-caption caption-${image.position}`}>
                    <h3>{image.caption}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider thick" />

      {/* About Section with Image */}
      <section className="section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Quality Shirts & Perfect Fit Jeans</h2>
              <blockquote>
                <p>NEW GULATI ENTERPRISE - Where Quality Meets Style.</p>
              </blockquote>
              <p>
                We specialize in men's fashion, particularly premium shirts and high-quality jeans. 
                Our shirts are crafted from the finest cotton and blended fabrics, ensuring comfort 
                and durability. Our jeans collection features everything from classic blue denim 
                to modern distressed styles, all designed for the perfect fit and long-lasting wear.
              </p>
              <p>
                From formal office wear to casual weekend looks, we've got you covered. Each piece 
                is carefully selected to meet our quality standards and your style expectations.
              </p>
            </div>
            <div className="about-image">
              <div className="image-wrapper">
                <img 
                  src="https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="Premium jeans and shirts collection"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="section accent-bg">
          <div className="container">
            <h2 className="section-title">Shop by Collection</h2>
            <div className="collections-grid">
              {collections.slice(0, 3).map((collection, index) => (
                <Link to={`/collection/${collection.id}`} key={collection.id} className="collection-card">
                  <div className="collection-image">
                    <img 
                      src={collectionCovers[index % collectionCovers.length].url}
                      alt={collection.name}
                    />
                  </div>
                  <div className="collection-info">
                    <h3>{collection.name}</h3>
                    <p className="collection-description">
                      {collection.description || 'Discover our latest collection of shirts and jeans'}
                    </p>
                    <span className="view-collection">
                      Shop Collection →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link to="/collections" className="button">
                View All Collections
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-grid">
            <div className="cta-image">
              <img 
                src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                alt="Men's fashion collection"
              />
            </div>
            <div className="cta-content">
              <h2>Stay Updated on New Arrivals</h2>
              <p>
                Subscribe to our newsletter and be the first to know about new shirt and jeans collections, 
                exclusive offers, and style inspiration. Join the NEW GULATI ENTERPRISE community today.
              </p>
              <Link to="/contact" className="button">
                Subscribe Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="section review-form-section">
        <div className="container">
          <div className="review-form-header">
            <h2 className="section-title">Share Your Experience</h2>
            <p className="section-subtitle">
              We value your feedback! Let us know about your experience with our shirts and jeans.
            </p>
          </div>

          <div className="review-form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="review-form">
              {/* Hidden input for rating */}
              <input 
                type="hidden" 
                {...register('rating', { required: 'Please select a rating' })} 
              />

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Your Name *</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email *</label>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>
              </div>

              {/* Single Line Star Rating */}
              <div className="form-group">
                <label className="form-label">Your Rating *</label>
                <div className="single-line-rating">
                  <div className="rating-stars-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`rating-star ${star <= (hoverRating || selectedRating) ? 'active' : ''}`}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        {star <= (hoverRating || selectedRating) ? <FaStar /> : <FaRegStar />}
                      </span>
                    ))}
                  </div>
                </div>
                {errors.rating && <span className="error-message">{errors.rating.message}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Your Review *</label>
                <textarea
                  rows="5"
                  placeholder="Tell us about your experience with our shirts, jeans, and service..."
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  {...register('description', { 
                    required: 'Review is required',
                    minLength: {
                      value: 20,
                      message: 'Please write at least 20 characters'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Review cannot exceed 1000 characters'
                    }
                  })}
                />
                {errors.description && <span className="error-message">{errors.description.message}</span>}
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className="button submit-button"
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;