import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storage from '../components/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import '../css/AddCourse.css'
import '../css/CourseDetail.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { Button } from '../components/Button'
import Footer from '../components/Footer'

function AddCourse() {
    let imageUrl

    const [loadedImgSrc, setLoadedImgSrc] = useState('https://www.studytienganh.vn/upload/2021/06/106292.jpg');

    const [course, setCourse] = useState({
        title: 'Course Name',
        description: 'Course description',
        price: '',
        image: '',
    })

    const [percent, setPercent] = useState(0);

    const saveCourse = async () => {
        console.log(course);
        console.log(imageUrl);

        const data = new FormData();
        data.append('title', course.title);
        data.append('description', course.description);
        data.append('image', imageUrl);
        data.append('price', course.price);

        const res = await axios.post('/auth/add-course', data)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data);
                }
                else {
                    console.log(res);
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `/files/${course.image.name}`)

        const uploadTask = uploadBytesResumable(storageRef, course.image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                // update progress
                setPercent(percent);
                console.log(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    imageUrl = url;
                    saveCourse();
                });
            }
        );
    }

    const handleInput = (e) => {
        setCourse({
            ...course,
            [e.target.name]: e.target.value
        });
    }

    const handleImage = (event) => {
        setCourse({
            ...course,
            image: event.target.files[0],
        })

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementsByClassName("loadedImg");
        imgtag.title = selectedFile.name;

        reader.onload = function (event) {
            console.log(loadedImgSrc);
            imgtag.src = event.target.result;
            setLoadedImgSrc(event.target.result);
        };

        reader.readAsDataURL(selectedFile);

    }

    return (
        <div>
            <Navbar current={1} />
            <div className="add-course">
                <div className="">
                    <h4 className='header'>Add Course</h4>
                    <Link to={'/courses'} className="">Back</Link>
                </div>
                <div className=''>
                    <form className='form-add-course' onSubmit={handleImageUpload}>
                        <div className='form-input-field'>
                            <div className='left-side'>
                                <div className="form-row">
                                    <label className="form-header">
                                        Course Name
                                    </label>
                                    <input
                                        name="title"
                                        type="text"
                                        className="form-input"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className='form-row'>
                                    <label className="form-header">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        rows={6}
                                        className="form-input"
                                        onChange={handleInput}
                                        defaultValue={''}
                                    />
                                </div>
                                <div className="form-row">
                                    <label className="form-header">
                                        Price
                                    </label>
                                    <input
                                        name="price"
                                        type="text"
                                        className="form-input"
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="form-row">
                                    <label className="form-header">
                                        Image
                                    </label>
                                    <div className='file-wrapper'>
                                        <label className="custom-file-upload">
                                            <input
                                                name="image"
                                                type='file'
                                                id='image'
                                                className="form-input"
                                                placeholder="www.example.com"
                                                onChange={(e) => handleImage(e)}
                                            />
                                            <i className="fa fa-cloud-upload"></i> Image Upload
                                        </label>
                                    </div>
                                </div>
                                {/* <div className='form-image'>
                                    <img src={loadedImgSrc} className="loadedImg" width="200px" />
                                </div> */}
                            </div>
                            <div className='right-side'>
                                <div className='CourseDetail'>
                                    <section className='left-section'>
                                        <h1 className='header'>{course.title}</h1>
                                        <div className='description'>{course.description}</div>
                                        <h1 className='header'>Course Content</h1>
                                        <div className='content'>
                                            <div className='content-item'>
                                                <div className='lesson-name'>
                                                    <i className="fa-solid fa-circle-play"></i>
                                                    Lesson 1: Introduction
                                                </div>
                                                <div className='duration'>1:00</div>
                                            </div>
                                            <div className='content-item'>
                                                <div className='lesson-name'>
                                                    <i className="fa-solid fa-circle-play"></i>
                                                    Lesson 2: Introduction
                                                </div>
                                                <div className='duration'>1:00</div>
                                            </div>
                                            <div className='content-item'>
                                                <div className='lesson-name'>
                                                    <i className="fa-solid fa-circle-play"></i>
                                                    Lesson 2: Introduction
                                                </div>
                                                <div className='duration'>1:00</div>
                                            </div>
                                            <div className='content-item'>
                                                <div className='lesson-name'>
                                                    <i className="fa-solid fa-circle-play"></i>
                                                    Lesson 2: Introduction
                                                </div>
                                                <div className='duration'>1:00</div>
                                            </div>
                                        </div>
                                    </section>
                                    <section className='right-section'>
                                        <div className='course-box'>
                                            <img src={loadedImgSrc} id="loadedImg" className="" width="200px" />
                                            <Button className="learn-now-btn" onClick=''>Learn Now</Button>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className='add-lesson'>
                            <table>
                                <colgroup>
                                    <col span="1" style={{ width: "30%" }} />
                                    <col span="1" style={{ width: "50%" }} />
                                    <col span="1" style={{ width: "20%" }} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>Lesson name</th>
                                        <th>Lesson URL</th>
                                        <th>Action</th>
                                    </tr>
                                    <tr>
                                        <td>Python code</td>
                                        <td>Example.com</td>
                                        <td>Delete</td>
                                    </tr>
                                    <tr>
                                        <td>Python code</td>
                                        <td>Example.com</td>
                                        <td>Delete</td>
                                    </tr>
                                    <tr>
                                        <td>Python code</td>
                                        <td>Example.com</td>
                                        <td>Delete</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="save-course">
                            <Button type="submit" className=''>Save Course</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AddCourse