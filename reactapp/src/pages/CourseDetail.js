import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Navbar from '../components/Navbar/Navbar'
import '../css/CourseDetail.css'
import LoadingScreen from "react-loading-screen"
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../utility/actions';

function CourseDetail() {
    const params = useParams();
    const course_id = params.id;

    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([
        { name: '', URL: '' }
    ])

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);
            const result = await axios(
                `/course/${course_id}`,
            );
            setCourse(result.data.courses[0]);
            setLessons(result.data.lessons);
        };

        fetchData();
    }, [course_id])

    const handleLoginPopup = (e) => {
        dispatch(toggleState());
        var item = document.querySelector('.popup-login');
        item.classList.add('is-active');
    }

    return (
        <div>
            <Navbar current={1} />
            {course ? <div className='CourseDetail'>
                <section className='left-section'>
                    <h1 className='header'>{course.title}</h1>
                    <div className='description'>{course.description}</div>
                    <h1 className='header'>Course Content</h1>
                    <div className='content'>
                        {lessons.map((lesson, index) => (
                            <div className='content-item' key={index}>
                                <div className='lesson-name'>
                                    <i className="fa-solid fa-circle-play"></i>
                                    Lesson {index + 1}: {lesson.name}
                                </div>
                                <div className='duration'>{lesson.duration.slice(3)}</div>
                            </div>
                        ))}
                    </div>
                </section>
                <section className='right-section'>
                    <div className='course-box'>
                        <img src={course.image} alt=''></img>
                        {localStorage.getItem('access_token') ?
                            <Link to={`/learning/${course.id}`} className="learn-now-btn">
                                <Button>Learn Now</Button>
                            </Link>
                            : <div className="learn-now-btn" onClick={handleLoginPopup}>
                                <Button>Learn Now</Button>
                            </div>}
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
                    <div style={{ height: "100vh" }}></div>
                </div>
            }
            <Footer />
        </div>
    )
}

export default CourseDetail