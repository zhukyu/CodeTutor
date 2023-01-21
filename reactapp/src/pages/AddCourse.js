import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import storage from '../components/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import '../css/AddCourse.css'
import '../css/CourseDetail.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { Button } from '../components/Button'
import Footer from '../components/Footer'
import Swal from 'sweetalert2'

function AddCourse() {
    let imageUrl

    const navigate = useNavigate()

    const [course, setCourse] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
    })

    const [courseDemo, setCourseDemo] = useState({
        title: 'Course Name',
        description: 'Course description',
        price: '',
        image: 'https://www.studytienganh.vn/upload/2021/06/106292.jpg',
    })

    const [lessons, setLessons] = useState([
        { name: '', URL: '' }
    ])

    const [percent, setPercent] = useState(0);

    const [fullFilled, setFullFilled] = useState(false);

    useEffect(() => {
        if (Object.values(course).every(course => course !== '') &&
        lessons.map(lesson => Object.values(lesson).every(val => val !== '')).every(val => val)) {
            setFullFilled(true)
        }
        else {
            setFullFilled(false)
        }
    }, [lessons, course])


    const saveLesson = async (courseID) => {
        let data = {
            course_id: courseID,
            lessons: lessons
        }

        const res = await axios.post('/admin/add-lesson-multiple', data)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Course added successfully',
                        icon: 'success',
                        confirmButtonText: 'Huray!',
                        confirmButtonColor: '#57D9AC',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/courses')
                        }
                    })
                }
                else {
                    console.log(res.data);
                }
            })
    }

    const saveCourse = async () => {
        console.log(course);
        console.log(imageUrl);

        const data = new FormData();
        data.append('title', course.title);
        data.append('description', course.description);
        data.append('image', imageUrl);
        data.append('price', course.price);

        const res = await axios.post('/admin/add-course', data)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.course_id)
                    saveLesson(res.data.course_id)
                }
                else {
                    console.log(res.data);
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
        if (e.target.value === '') {
            setCourseDemo({
                ...courseDemo,
                [e.target.name]: e.target.placeholder
            });
        }
        else {
            setCourseDemo({
                ...courseDemo,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleLessonInput = (index, e) => {
        const values = [...lessons];
        values[index][e.target.name] = e.target.value;
        setLessons(values);
        console.log(lessons);
    }

    const handleAddLesson = () => {
        setLessons([...lessons, { name: '', URL: '' }]);
    }

    const handleRemoveLesson = (index) => {
        const values = [...lessons];
        values.splice(index, 1);
        setLessons(values);
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
            imgtag.src = event.target.result;
            setCourseDemo({ ...courseDemo, image: event.target.result })
        };

        reader.readAsDataURL(selectedFile);

    }



    return (
        <div>
            <Navbar current={1} back={'/courses'} />
            <div className="add-course">
                <div className="">
                    <h4 className='header'>Add Course</h4>
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
                                        placeholder="Course Name"
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
                                        placeholder="Course Description"
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
                                        placeholder="Price"
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
                            </div>
                            <div className='right-side'>
                                <div className='CourseDetail'>
                                    <section className='left-section'>
                                        <h1 className='header'>{courseDemo.title}</h1>
                                        <div className='description'>{courseDemo.description}</div>
                                        <h1 className='header'>Course Content</h1>
                                        <div className='content'>
                                            {lessons.map((lesson, index) => (
                                                <div className='content-item' key={index}>
                                                    <div className='lesson-name'>
                                                        <i className="fa-solid fa-circle-play"></i>
                                                        Lesson {index + 1}: {lesson.name}
                                                    </div>
                                                    <div className='duration'>1:00</div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                    <section className='right-section'>
                                        <div className='course-box'>
                                            <img src={courseDemo.image} id="loadedImg" className="" width="200px" alt='' />
                                            <div className='learn-now-btn'>
                                                <Button type='button' className="">Learn Now</Button>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className='add-lesson'>
                            <table>
                                <colgroup>
                                    <col span="1" style={{ width: "1%" }} />
                                    <col span="1" style={{ width: "46%" }} />
                                    <col span="1" style={{ width: "50%" }} />
                                    <col span="1" style={{ width: "3%" }} />
                                </colgroup>
                                <tbody>
                                    <tr>
                                        <th>No.</th>
                                        <th>Lesson name</th>
                                        <th>Lesson URL</th>
                                        <th>Action</th>
                                    </tr>
                                    {lessons.map((lesson, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <input
                                                        name='name'
                                                        placeholder='Lesson Name'
                                                        value={lesson.name}
                                                        onChange={event => handleLessonInput(index, event)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name='URL'
                                                        placeholder='Lesson URL'
                                                        value={lesson.URL}
                                                        onChange={event => handleLessonInput(index, event)}
                                                    />
                                                </td>
                                                <td>
                                                    <div className='delete-lesson'
                                                        onClick={() => handleRemoveLesson(index)}
                                                        style={{ pointerEvents: lessons.length === 1 ? "none" : "auto", opacity: lessons.length === 1 ? 0.4 : 1 }}
                                                    >
                                                        <i className="fa-solid fa-trash" ></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='add-lesson'>
                            <Button className='btn-add-lesson' type="button" buttonStyle='btn--rounded' buttonSize='btn--small' onClick={handleAddLesson}>Add Lesson</Button>
                        </div>
                        <div className="save-course">
                            <Button
                                type="submit"
                                className='save-course-btn'
                                disabled={!fullFilled}
                            >Save Course</Button>
                        </div>
                    </form>
                </div>
            </div >
            <Footer />
        </div >
    )
}

export default AddCourse