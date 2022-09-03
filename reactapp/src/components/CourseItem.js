import React from 'react'
import { Link } from 'react-router-dom'
import '../css/CourseItem.css'

function CourseItem(props) {
    return (
        <div className="course-item">
            <div className="course-image">
                <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="" />
            </div>
            <div className="course-content">
                <span className="star-rating">
                    <span style={{width: `${props.rate}%`}}>
                    </span> 
                </span>
                <div className="course-title">
                    <Link to="#" >Object Oriented-Programming in C++</Link>
                </div>
                <div className="course-author">
                    <Link to="#">Zhukyu</Link>
                </div>
                <p className="course-description">
                    General Informatics is the basic subject of Informatics. This course focuses on providing basic and comprehensive knowledge of computer softwares and basic computer skills so that users can grasp the basic but highly applicable knowledge in daily computer use.
                </p>
                <hr />
                <h4 className="course-price">
                    Free
                </h4>
            </div>
        </div>
    )
}

export default CourseItem