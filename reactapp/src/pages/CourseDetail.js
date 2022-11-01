import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar'
import '../css/CourseDetail.css'

function CourseDetail() {
    const params = useParams();
    const course_id = params.id;

    const [course, setCourse] = useState({
        "id": 0,
        "title": '',
        "user_id": 0,
        "description": '',
        "image": '',
        "price": '',
        "rate": null,
        "name": ''
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `/course/${course_id}`,
            );
            console.log(result.data.data[0]);
            setCourse(result.data.data[0]);
        };

        fetchData();
    }, [])

    return (
        <div>
            <Navbar current={1} />
            <div className='CourseDetail'>
                <span className='header'>{course.title}</span>
                
            </div>
        </div>
    )
}

export default CourseDetail