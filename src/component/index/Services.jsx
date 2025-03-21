import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <div className='main'>
    {/* Services Section */}
    <section id="services" className="services section" style={{paddingTop:"120px"}}>

      {/* Section Title */}
      <div className="container section-title">
        <h2>Our Services</h2>
      </div>{/* End Section Title */}

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-4 col-md-6" data-aos-delay="100">
            <div className="service-item  position-relative">
              <div className="icon">
                <i className="bi bi-activity"></i>
              </div>
              <h3>Business Consulting</h3>
              <p>We provide expert consulting services to help your business grow. Our team offers valuable insights to improve your processes and strategies.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="200">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-broadcast"></i>
              </div>
              <h3>Digital Marketing</h3>
              <p>Our digital marketing services cover SEO, social media management, PPC, and more to help you reach your target audience effectively.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="300">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-easel"></i>
              </div>
              <h3>Graphic Design</h3>
              <p>Our team creates stunning visual content to elevate your brand identity. From logos to marketing materials, we’ve got you covered.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="400">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-bounding-box-circles"></i>
              </div>
              <h3>Web Development</h3>
              <p>We offer full-stack web development services, delivering responsive, user-friendly websites tailored to your business needs.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="500">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-calendar4-week"></i>
              </div>
              <h3>Event Management</h3>
              <p>We specialize in planning and executing events of all sizes. Our team ensures every detail is taken care of for a successful event.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

          <div className="col-lg-4 col-md-6" data-aos-delay="600">
            <div className="service-item position-relative">
              <div className="icon">
                <i className="bi bi-chat-square-text"></i>
              </div>
              <h3>Customer Support</h3>
              <p>We offer 24/7 customer support to ensure your clients’ needs are always met, providing efficient and friendly assistance.</p>
              <Link to="service-details.html" className="readmore stretched-link">Read more <i className="bi bi-arrow-right"></i></Link>
            </div>
          </div>{/* End Service Item */}

        </div>

      </div>

    </section>{/* /Services Section */}
    </div>
  )
}

export default Services
