import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Navbar from '../components/Navbar/Navbar'
import '../css/CourseDetail.css'
import LoadingScreen from "react-loading-screen"
import Footer from '../components/Footer';

function CourseDetail() {
    const params = useParams();
    const course_id = params.id;

    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `/course/${course_id}`,
            );
            console.log(result.data.data[0]);
            setCourse(result.data.data[0]);
        };

        fetchData();
    }, [course_id])

    return (
        <div>
            <Navbar current={1} />
            {course ? <div className='CourseDetail'>
                <section className='left-section'>
                    <h1 className='header'>{course.title}</h1>
                    <div className='description'>{course.description}</div>
                    <h1 className='header'>Course Content</h1>
                    <div className='content'>
                        <div className='content-item'>
                            <div className='lesson-name'>
                                <i class="fa-solid fa-circle-play"></i>
                                Lesson 1: Introduction
                            </div>
                            <div className='duration'>1:00</div>
                        </div>
                        <div className='content-item'>
                            <div className='lesson-name'>
                                <i class="fa-solid fa-circle-play"></i>
                                Lesson 2: Introduction
                            </div>
                            <div className='duration'>1:00</div>
                        </div>
                        <div className='content-item'>
                            <div className='lesson-name'>
                                <i class="fa-solid fa-circle-play"></i>
                                Lesson 2: Introduction
                            </div>
                            <div className='duration'>1:00</div>
                        </div>
                        <div className='content-item'>
                            <div className='lesson-name'>
                                <i class="fa-solid fa-circle-play"></i>
                                Lesson 2: Introduction
                            </div>
                            <div className='duration'>1:00</div>
                        </div>
                        <div className='content-item'>
                            <div className='lesson-name'>
                                <i class="fa-solid fa-circle-play"></i>
                                Lesson 2: Introduction
                            </div>
                            <div className='duration'>1:00</div>
                        </div>
                    </div>
                </section>
                <section className='right-section'>
                    <div className='course-box'>
                        <img src={course.image} alt=''></img>
                        <Button className="learn-now-btn" onClick=''>Learn Now</Button>
                    </div>
                </section>
            </div> : 
            <div>
                <LoadingScreen
                    loading={true}
                    bgColor="rgba(0, 0, 0, 0.2)"
                    spinnerColor="#84fab0"
                    textColor="#676767"
                    logoSrc=""
                    text=""
                >
                </LoadingScreen>
                <div style={{ height: "100vh"}}></div>
            </div>
            }

            <Footer/>

        </div>
    )
}

export default CourseDetail