import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import CourseItem from '../components/CourseItem';
import Navbar from '../components/Navbar/Navbar';
import '../css/Home.css';
import bannerImg from '../img/banner_image.jpg'
import dot from '../img/dot.svg'

let items = [
    {
        rate: 30,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
    {
        rate: 100,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
    {
        rate: 30,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
    {
        rate: 80,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "1.200.000đ"
    },
    {
        rate: 90,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
    {
        rate: 50,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
    {
        rate: 60,
        title: "Object Oriented-Programming in C++",
        author: "Zhukyu",
        description: "General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.",
        price: "Free"
    },
]

function Home() {
    return (
        <div className="App">
            <Navbar />
            <div className="banner">
                <div className="wrap-banner">
                    <div className="wrap-banner-img">
                        <img className="banner-img-dot" src={dot} alt="dot"/>
                        <img className="banner-img" src={bannerImg} alt="bannerImg"/>
                        <div className="banner-stat">
                            <div className="stat-members">
                                <i className="fa-solid fa-user"></i>
                                <p>120k Members</p>
                            </div>
                            <div className="stat-courses">
                                <i className="fa-solid fa-graduation-cap"></i>
                                <p>10 Courses</p>
                            </div>
                            <div className="stat-teachers">
                                <i className="fa-solid fa-person-chalkboard"></i>
                                <p>30 Teachers</p>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-banner-paragraph">
                        <div className="banner-paragraph">
                            <div className="banner-header">CODE TUTOR: PLACE WHERE EVERYONE CAN BE CODER!</div>
                            <div className="banner-description">Improve your development skills by taking courses from out best teachers. With Code Tutor, learning to code has never been easier!</div>
                            <Button className="learn-more-btn" onClick={(e) => { e.preventDefault(); window.location.replace("/#course-section") }}>Learn More</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap-home">
                <div className="course-section" id="course-section">
                    <div className="wrap-header">
                        <span className="header">Features Courses</span>
                        <Link to="#" className="all-courses">
                            <span>All Courses</span>
                            <i className="fa-solid fa-greater-than"></i>
                        </Link>
                    </div>
                    <div className="row">
                        {items.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <CourseItem
                                        rate={item.rate}
                                        title={item.title}
                                        author={item.author}
                                        description={item.description}
                                        price={item.price}
                                    />
                                </div>
                            )
                        })}
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
                            {items.map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <CourseItem
                                            rate={item.rate}
                                            title={item.title}
                                            author={item.author}
                                            description={item.description}
                                            price={item.price}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
