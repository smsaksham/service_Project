import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <main className="main">
  {/* Hero Section */}
    <section id="hero" className="hero section accent-background">
      <div className="container position-relative"  data-aos-delay="100">
        <div className="row gy-5 justify-content-between">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h2><span>Welcome to </span><span className="accent">GoServe</span></h2>
            <p>Bringing innovative solutions and personalized care to every task, because your satisfaction is what drives us.</p>
            <div className="d-flex">
              <Link to="/about"  className="btn-get-started">Get Started</Link>
              <Link to="https://www.youtube.com/watch?v=Y7f98aduVJ8" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></Link>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2">
            <img src="/index_accets/assets/img/hero-img.svg" className="img-fluid" alt=""/>
          </div>
        </div>
      </div>

      <div className="icon-boxes position-relative"  data-aos-delay="200">
        <div className="container position-relative">
          <div className="row gy-4 mt-5">

            <div className="col-xl-3 col-md-6">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-easel"></i></div>
                <h4 className="title"><Link to="" className="stretched-link">Creative Designs</Link></h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div className="col-xl-3 col-md-6">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-gem"></i></div>
                <h4 className="title"><Link to="" className="stretched-link">Premium Quality</Link></h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div className="col-xl-3 col-md-6">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-geo-alt"></i></div>
                <h4 className="title"><Link to="" className="stretched-link">Global Reach</Link></h4>
              </div>
            </div>
            {/*End Icon Box */}
            <div className="col-xl-3 col-md-6">
              <div className="icon-box">
                <div className="icon"><i className="bi bi-command"></i></div>
                <h4 className="title"><Link to="" className="stretched-link">Reliable Services</Link></h4>
              </div>
            </div>
            {/*End Icon Box */}
          </div>
        </div>
      </div>
    </section>
    </main>
    </div>
  )
}

export default Home;
