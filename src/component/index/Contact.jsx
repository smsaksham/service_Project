import React from 'react'

const Contact = () => {
  return (
    <div className='margin-top-30' style={{paddingTop:"55px"}}>
          {/* Contact Section */}
    <section id="contact" className="contact section">

      {/* Section Title */}
      <div className="container section-title" >
        <h2>Contact</h2>
      </div>{/* End Section Title */}
      <div className="container"  data-aos-delay="100">
        <div className="row gx-lg-0 gy-4">
          <div className="col-lg-4">
            <div className="info-container d-flex flex-column align-items-center justify-content-center">
              <div className="info-item d-flex"  data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Address</h3>
                  <p>A108 Adam Street, New York, NY 535022</p>
                </div>
              </div>{/* End Info Item */}

              <div className="info-item d-flex"  data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0"></i>
                <div>
                  <h3>Call Us</h3>
                  <p>+1 5589 55488 55</p>
                </div>
              </div>{/* End Info Item */}

              <div className="info-item d-flex"  data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email Us</h3>
                  <p>info@example.com</p>
                </div>
              </div>{/* End Info Item */}

              <div className="info-item d-flex"  data-aos-delay="500">
                <i className="bi bi-clock flex-shrink-0"></i>
                <div>
                  <h3>Open Hours:</h3>
                  <p>Mon-Sat: 11AM - 23PM</p>
                </div>
              </div>{/* End Info Item */}

            </div>

          </div>

          <div className="col-lg-8">
            <form className="php-email-form"  data-aos-delay="100">
              <div className="row gy-4">

                <div className="col-md-6">
                  <input type="text" name="name" className="form-control" placeholder="Your Name" required=""/>
                </div>

                <div className="col-md-6 ">
                  <input type="email" className="form-control" name="email" placeholder="Your Email" required=""/>
                </div>

                <div className="col-md-12">
                  <input type="text" className="form-control" name="subject" placeholder="Subject" required=""/>
                </div>

                <div className="col-md-12">
                  <textarea className="form-control" name="message" rows="8" placeholder="Message" required=""></textarea>
                </div>

                <div className="col-md-12 text-center">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>

                  <button type="submit">Send Message</button>
                </div>

              </div>
            </form>
          </div>{/* End Contact Form */}

        </div>

      </div>

    </section>{/* /Contact Section */}
    </div>
  )
}

export default Contact
