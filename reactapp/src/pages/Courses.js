import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CourseItem from '../components/CourseItem';
import Navbar from '../components/Navbar/Navbar';
import '../css/Courses.css'

function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
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
            <div className='Courses'>
                <div className="course-section" id="course-section">
                    <div className="wrap-header">
                        <span className="header">Features Courses</span>
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
            </div>
        </div>
    )
}

export default Courses