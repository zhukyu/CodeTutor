import React, { useEffect, useState } from 'react'
import MDEditor, { commands } from "@uiw/react-md-editor";
import '../css/AddBlog.css'
import Navbar from '../components/Navbar/Navbar';
import { Button } from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditBlog() {
    document.title = 'Edit Blog | Code Tutor';
    const params = useParams();
    const blog_id = params.id;

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);
            const result = await axios(
                `auth/blog/${blog_id}`,
            ).then((res) => {
                console.log(res.data);
                if(res.data.status === 200) {
                    setTitle(res.data.blog.title);
                    setContent(res.data.blog.content);
                }
                else {
                    navigate('/blogs');
                }
            });
        };

        fetchData();
    }, [])

    document.title = 'Edit Blog | Code Tutor';

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fullFilled, setFullFilled] = useState(false);
    const [updated, setUpdated] = useState(false);

    const navigate = useNavigate();
    
    const handleUpdate = async () => {
        setUpdated(false)
        const data = new FormData();
        data.append('title', title);
        data.append('content', content);

        const res = await axios.post(`/auth/edit-blog/${blog_id}`, data)
            .then((res) => {
                if (res.data.status === 200) {
                    setUpdated(true)
                    console.log(res.data);
                }
                else if(res.data.status === 404) {
                    navigate('/blogs');
                    console.log(res.data);
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    const handlePublish = async (e) => {
        e.preventDefault();
    
        const res = await axios.put(`/auth/publish-blog/${blog_id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Course published successfully',
                        icon: 'success',
                        confirmButtonText: 'Huray!',
                        confirmButtonColor: '#57D9AC',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/blogs')
                        }
                    })
                }
                else {
                    console.log(res.data);
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    useEffect(() => {
        if (title.length > 0 && content.length > 0) {
            setFullFilled(true)
        }
        else {
            setFullFilled(false)
        }
    }, [title, content])

    useEffect(() => {
        const timer = setTimeout(() => {
            handleUpdate();
        }, 500);
        return () => clearTimeout(timer)
    }, [title, content]);

    return (
        <div>
            <Navbar current={2} back={'/blogs'} />
            <div className="AddBlog">
                <form className='AddBlog-form' onSubmit={handlePublish}>
                    <div className='title-wrapper'>
                        <input className='title' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <span className='blog-status'>
                            {updated ? 'Updated' : 'Updating...'}
                        </span>
                    </div>
                    <div data-color-mode="light" className='editor-wrapper'>
                        <MDEditor
                            value={content}
                            onChange={setContent}
                            height={'100%'}
                            textareaProps={{
                                placeholder: "Please enter Content"
                            }}
                        // commands={[
                        //     commands.bold,
                        //     commands.italic,
                        //     commands.strikethrough,
                        //     commands.hr,
                        //     customButton,
                        //     commands.title,
                        //     commands.divider,
                        //     commands.quote,
                        //     commands.code,
                        //     commands.codeBlock,
                        //     commands.image,
                        //     commands.divider,
                        //     commands.unorderedListCommand,
                        //     commands.orderedListCommand,
                        //     commands.checkedListCommand,
                        // ]}
                        />
                    </div>
                    <div className="add-blog">
                        <Button
                            type="submit"
                            className='add-blog-btn'
                            disabled={!fullFilled}
                        >Publish Blog</Button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default EditBlog