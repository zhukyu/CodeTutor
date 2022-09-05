import React from 'react'
import { Link } from 'react-router-dom';
import CourseItem from '../components/CourseItem';
import Navbar from '../components/Navbar/Navbar';
import '../css/Home.css';

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
        price: 12000
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
            <div className='banner'>
                <Navbar />
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
                        {items.map((item) => {
                            return (
                                <div className="item">
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
                            {items.map((item) => {
                                return (
                                    <div className="item">
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
