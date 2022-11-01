import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storage from '../components/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import '../css/AddCourse.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'

function AddCourse() {
    let imageUrl;

    const [course, setCourse] = useState({
        title: '',
        description: '',
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

    const handleImage = (files) => {
        setCourse({
            ...course,
            image: files[0],
        })
    }

    return (
        <div>
            <Navbar current={1}/>
            <div className="add-course">
                <div className="">
                    <h4 className=''>Add Course
                        <Link to={'/'} className="">Back</Link>
                    </h4>
                </div>
                <div className=''>
                    <form onSubmit={handleImageUpload}>
                        <div className="">
                            <div className="">
                                <label className="">
                                    Course Name
                                </label>
                                <div className="">
                                    <input
                                        name="title"
                                        type="text"
                                        className=""
                                        onChange={handleInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="">
                                Description
                            </label>
                            <div className="">
                                <textarea
                                    name="description"
                                    rows={3}
                                    className=""
                                    onChange={handleInput}
                                    defaultValue={''}
                                />
                            </div>
                        </div>
                        <div className="">
                            <label className="">
                                Price
                            </label>
                            <div className="">
                                <input
                                    name="price"
                                    type="text"
                                    className=""
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <label className="">
                                    Image
                                </label>
                                <div className="">
                                    <input
                                        name="image"
                                        type='file'
                                        id='image'
                                        className=""
                                        placeholder="www.example.com"
                                        onChange={(e) => handleImage(e.target.files)}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className='form-group my-3'>
                        <img src={course.image} id="loadedImg" className="img-fluid img-bordered" width="200px" />
                    </div> */}
                        <div className="">
                            <button type="submit" className=''>Save Course</button>
                        </div>
                        <button type="button" onClick={handleImageUpload}>asd</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCourse