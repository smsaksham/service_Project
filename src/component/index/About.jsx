import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className='main'>
    <div >
    <section id="about" className="about section" style={{paddingTop:"120px"}}>
      {/* Section Title */}
      <div className="container section-title" >
        <h2>About Us<br/></h2>
      </div>{/* End Section Title */}

      <div className="container">

        <div className="row gy-4">
          <div className="col-lg-6"  data-aos-delay="100">
            <h3>Our Mission & Vision</h3>
            <img src="/index_accets/assets/img/about.jpg" className="img-fluid rounded-4 mb-4" alt=""/>
            <p>At GoServe, we believe in the power of seamless solutions to elevate businesses and individuals alike. We are a dedicated team of professionals who offer a diverse range of services designed to meet your unique needs. Whether you're a startup looking for support, a business aiming to streamline processes, or an individual needing a helping hand, we have you covered.</p>
          </div>
          <div className="col-lg-6"  data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">
              Our services span across multiple industries, including consulting, marketing, development, creative design, and much more. We take pride in providing personalized services that are tailored to each client, ensuring a perfect fit with your goals and challenges.
              </p>
              <ul>
                <li><i className="bi bi-check-circle-fill"></i> <span>Customer-Centricity: We prioritize our clients' needs and ensure the highest quality of service.</span></li>
                <li><i className="bi bi-check-circle-fill"></i> <span>Excellence: Striving for perfection in every service we provide.</span></li>
                <li><i className="bi bi-check-circle-fill"></i> <span>Integrity: Conducting business with honesty and transparency.</span></li>
                <li><i className="bi bi-check-circle-fill"></i> <span>Innovation: Always evolving with the latest trends and solutions.</span></li>
              </ul>
              <p>
            We're not just a service provider; we're a partner in your journey toward success.
            Explore our services today, and let GoServe make a difference for you!  </p>

              <div className="position-relative mt-4">
                <img src="index_accets/assets/img/about-2.jpg" className="img-fluid rounded-4" alt=""/>
                <Link to="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox pulsating-play-btn"></Link>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
        </div>
    </div>
  )
}

export default About