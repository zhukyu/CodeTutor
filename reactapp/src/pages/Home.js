import React from 'react'
import { Link } from 'react-router-dom';
import CourseItem from '../components/CourseItem';
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
            <div className="wrap-home">
                <div className="course-section">
                    <div className="wrap-header">
                        <span className="header">Features Courses</span>
                        <Link to="#" className="all-courses">
                            <span>All Courses</span>
                            <i className="fa-solid fa-greater-than"></i>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="item">
                            <CourseItem rate={30} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={90} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                    </div>
                </div>
                <div className="course-section">
                    <div className="wrap-header">
                        <span className="header">Features Blogs</span>
                        <Link to="#" className="all-courses">
                            <span>All Blogs</span>
                            <i className="fa-solid fa-greater-than"></i>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="item">
                            <CourseItem rate={30} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={90} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                        <div className="item">
                            <CourseItem rate={60} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
