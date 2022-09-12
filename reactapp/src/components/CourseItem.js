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
                    <Link to="#" >{props.title}</Link>
                </div>
                <div className="course-author">
                    <Link to="#">{props.author}</Link>
                </div>
                <p className="course-description">
                    {props.description}
                </p>
                <hr />
                <h4 className="course-price">
                    {props.price}
                </h4>
            </div>
        </div>
    )
}

export default CourseItem
