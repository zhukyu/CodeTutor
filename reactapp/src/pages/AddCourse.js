import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import storage from '../components/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import '../css/AddCourse.css'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'
import { Button } from '../components/Button'
import Footer from '../components/Footer'

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

    const handleImage = (event) => {
        setCourse({
            ...course,
            image: event.target.files[0],
        })

        var selectedFile = event.target.files[0];
        var reader = new FileReader();

        var imgtag = document.getElementById("loadedImg");
        imgtag.title = selectedFile.name;

        reader.onload = function (event) {
            imgtag.src = event.target.result;
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
                    <form onSubmit={handleImageUpload}>
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
                                rows={3}
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
                            <label class="custom-file-upload">
                                <input
                                    name="image"
                                    type='file'
                                    id='image'
                                    className="form-input"
                                    placeholder="www.example.com"
                                    onChange={(e) => handleImage(e)}
                                />
                                <i class="fa fa-cloud-upload"></i> Image Upload
                            </label>
                        </div>
                        <div className='form-image'>
                            <img src={course.image} id="loadedImg" className="img-fluid img-bordered" width="200px" />
                        </div>
                        <div className="">
                            <Button type="submit" className=''>Save Course</Button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AddCourse