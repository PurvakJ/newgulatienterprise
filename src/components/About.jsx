import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {
  // High-quality shirt and jeans images for the about page
  const aboutImages = [
    {
      url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Premium cotton shirt collection',
      caption: 'Premium Shirt Collection'
    },
    {
      url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'High quality denim jeans',
      caption: 'Quality Denim'
    },
    {
      url: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      alt: 'Men casual wear',
      caption: 'Casual Collection'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="hero-title">Premium Shirts & Jeans Since 2020</h1>
            <p className="hero-subtitle">
              We specialize in quality men's clothing that combines comfort, style, and durability.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Introduction */}
      <section className="section founder-section">
        <div className="container">
          <div className="founder-grid">
            <div className="founder-content">
              <h2 className="section-title-small">Our Story</h2>
              <h3 className="founder-title">The Vision Behind NEW GULATI ENTERPRISE</h3>
              <div className="founder-quote">
                <p className="lead-text">
                  Welcome to NEW GULATI ENTERPRISE, your trusted destination for premium quality 
                  men's shirts and jeans. Born from a passion for exceptional craftsmanship and 
                  perfect fits, we specialize in bringing you the finest fabrics and latest styles.
                </p>
              </div>
              <p>
                Every shirt is crafted from premium cotton and blended fabrics, ensuring all-day 
                comfort and lasting durability. Our jeans collection features everything from 
                classic blue denim to modern distressed styles, all designed for the perfect fit.
              </p>
              <p className="highlight-text">
                Our mission? To provide the best quality shirts and jeans at affordable prices.
              </p>
            </div>
            <div className="founder-image">
              <div className="image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                  alt="NEW GULATI ENTERPRISE - Premium shirts and jeans collection"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section - The Art of Fashion */}
      <section className="section philosophy-section accent-bg">
        <div className="container">
          <h2 className="section-title">Why Choose Our Shirts & Jeans</h2>
          <div className="philosophy-content">
            <blockquote className="large-quote">
              "Quality fabrics, perfect fits, and timeless style."
            </blockquote>
            
            <div className="moments-grid">
              <div className="moment-item">
                <p>The comfort of premium cotton shirts for all-day wear.</p>
              </div>
              <div className="moment-item">
                <p>The durability of high-quality denim jeans that last for years.</p>
              </div>
              <div className="moment-item">
                <p>The confidence of wearing perfectly fitted clothing.</p>
              </div>
            </div>
            
            <p className="emphasis-text">
              From formal office wear to casual weekend looks, we've got you covered with the finest shirts and jeans.
            </p>
          </div>
        </div>
      </section>

      {/* Style Section - Our Design Philosophy */}
      <section className="section style-section">
        <div className="container">
          <h2 className="section-title">Our Collection</h2>
          <div className="style-grid">
            <div className="style-card">
              <span className="style-emoji">👔</span>
              <h3>Premium Shirts</h3>
              <p>Formal, casual, and party wear</p>
            </div>
            <div className="style-card">
              <span className="style-emoji">👖</span>
              <h3>Quality Jeans</h3>
              <p>Classic, slim, and relaxed fits</p>
            </div>
            <div className="style-card">
              <span className="style-emoji">✨</span>
              <h3>Premium Fabrics</h3>
              <p>Cotton, denim, and blends</p>
            </div>
            <div className="style-card">
              <span className="style-emoji">💫</span>
              <h3>Perfect Fit</h3>
              <p>Designed for Indian body types</p>
            </div>
          </div>
          <p className="style-footer">
            Each shirt and pair of jeans is carefully selected for quality, comfort, and style.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="section gallery-section">
        <div className="container">
          <div className="about-gallery">
            {aboutImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image.url} alt={image.alt} />
                <div className="gallery-caption">{image.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Craftsmanship */}
      <section className="section craftsmanship-section accent-bg">
        <div className="container">
          <h2 className="section-title">Quality You Can Trust</h2>
          <div className="craftsmanship-content">
            <p className="lead-text">
              We understand that quality matters when it comes to your clothing.
            </p>
            <p>
              Our shirts are made from premium cotton and high-quality blended fabrics that 
              offer breathability, comfort, and easy maintenance. Our jeans are crafted from 
              durable denim that retains its shape and color even after multiple washes.
            </p>
            <p>
              Every piece in our collection undergoes strict quality checks to ensure:
            </p>
            <ul className="quality-list">
              <li>✓ Perfect stitching and finishing</li>
              <li>✓ Colorfast fabrics that don't fade</li>
              <li>✓ Shrink-resistant materials</li>
              <li>✓ Comfortable fits for all body types</li>
            </ul>
            <p className="highlight-text">
              Quality isn't just a promise—it's our commitment to you.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section">
        <div className="container">
          <div className="philosophy-box">
            <h2 className="section-title">Our Promise to You</h2>
            <blockquote className="philosophy-quote">
              <p>We believe that everyone deserves to wear quality clothing that looks good and feels comfortable.</p>
              <p>That's why we source the finest fabrics and ensure every shirt and pair of jeans meets our high standards—</p>
              <p>so you can look your best every day without breaking the bank.</p>
            </blockquote>
            <p className="signature-text">That is the NEW GULATI ENTERPRISE promise.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>Find Your Perfect Fit</h2>
            <p>
              Looking for premium quality shirts and jeans that fit perfectly?<br />
              Explore our collection of carefully curated men's clothing—
            </p>
            <p className="cta-final">Your new favorite shirt or pair of jeans is just a click away.</p>
            <Link to="/collections" className="button button-large">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;