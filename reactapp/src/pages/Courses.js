import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseItem from '../components/CourseItem';
import Navbar from '../components/Navbar/Navbar';
import { Button } from '../components/Button';
import '../css/Courses.css'
import LoadingScreen from "react-loading-screen"
import Footer from '../components/Footer';

function Courses() {
    const [courses, setCourses] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0);
        document.querySelector('.NavbarItems').classList.add('scrolled');
    });
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/courses',
            );
            setCourses(result.data.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar current={1} />
            {courses ? <div className='Courses'>
                <div className="course-section" id="course-section">
                    <div className="wrap-header">
                        <span className="header">Features Courses</span>
                        <Link to={'/add-course'} className="">
                            <Button className="learn-now-btn" onClick=''>Add Course</Button>
                        </Link>
                    </div>
                    <div className="row">
                        {courses.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <CourseItem
                                        id={item.id}
                                        image={item.image}
                                        rate={item.rate}
                                        title={item.title}
                                        author={item.name}
                                        description={item.description}
                                        price={item.price}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> : <div>
                <LoadingScreen
                    loading={true}
                    bgColor="rgba(0, 0, 0, 0.2)"
                    spinnerColor="#84fab0"
                    textColor="#676767"
                    logoSrc=""
                    text=""
                >
                </LoadingScreen>
                <div style={{ height: "100vh" }}></div>
            </div>}
            <Footer />
        </div>
    )
}

export default Courses