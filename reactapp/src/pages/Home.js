import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Slideshow from '../components/Slideshow';
import '../css/Home.css';
import banner from '../img/home_banner.jpg'

function Home() {
    return (
        <div className="App">
            <div className='banner'>
                <Navbar />
                {/* <img src={banner} alt="" className='banner-img'></img> */}
            </div>
            <div className="course-section">
                <div className="wrap-header">
                    <span className="header">Features Course</span>
                </div>
                <Slideshow />
            </div>
            <div className="course-section">
                <div className="wrap-header">
                    <span className="header">Features Course</span>
                </div>
                <Slideshow />
            </div>
        </div>
    )
}

export default Home;
