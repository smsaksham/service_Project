import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
        <footer id="footer" className="footer accent-background">

<div className="container footer-top">
  <div className="row gy-4">
    <div className="col-lg-5 col-md-12 footer-about">
      <Link to="/" className="logo d-flex align-items-center">
        <span className="sitename">GoServe</span>
      </Link>
      <p>Bringing innovative solutions and personalized care to every task, because your satisfaction is what drives us..</p>      
      <div className="social-links d-flex mt-4">
        <Link to=""><i className="bi bi-twitter-x"></i></Link>
        <Link to=""><i className="bi bi-facebook"></i></Link>
        <Link to=""><i className="bi bi-instagram"></i></Link>
        <Link to=""><i className="bi bi-linkedin"></i></Link>
      </div>
    </div>

    <div className="col-lg-2 col-6 footer-links">
      <h4>Useful Links</h4>
      <ul>
        <li><Link to="#">Home</Link></li>
        <li><Link to="#">About us</Link></li>
        <li><Link to="#">Services</Link></li>
        <li><Link to="#">Terms of service</Link></li>
        <li><Link to="#">Privacy policy</Link></li>
      </ul>
    </div>

    <div className="col-lg-2 col-6 footer-links">
      <h4>Our Services</h4>
      <ul>
        <li><Link to="#">Web Design</Link></li>
        <li><Link to="#">Web Development</Link></li>
        <li><Link to="#">Product Management</Link></li>
        <li><Link to="#">Marketing</Link></li>
        <li><Link to="#">Graphic Design</Link></li>
      </ul>
    </div>

    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
      <h4>Contact Us</h4>
      <p>A108 Adam Street</p>
      <p>New York, NY 535022</p>
      <p>United States</p>
      <p className="mt-4"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
      <p><strong>Email:</strong> <span>info@example.com</span></p>
    </div>

  </div>
</div>

<div className="container copyright text-center mt-4">
  <p>© <span>Copyright</span> <strong className="px-1 sitename">GoServe</strong> <span>All Rights Reserved</span></p>
</div>

</footer>
    </div>
  )
}

export default Footer
