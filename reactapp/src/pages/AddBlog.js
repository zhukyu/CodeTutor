import React, { useEffect, useState } from 'react'
import MDEditor, { commands } from "@uiw/react-md-editor";
import '../css/AddBlog.css'
import Navbar from '../components/Navbar/Navbar';
import { Button } from '../components/Button';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AddBlog() {
    document.title = 'Add Blog | Code Tutor';

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [fullFilled, setFullFilled] = useState(false);

    const navigate = useNavigate();

    const handleCreate = async () => {
        const data = new FormData();
        data.append('title', title);
        data.append('content', content);

        const res = await axios.post('/auth/add-blog', data)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.blog);
                    navigate(`/blog/${res.data.blog.id}/edit`)
                }
                else {
                    console.log(res.data);
                }
            })
            .catch((e) => {
                console.error("Failure", e);
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleCreate();
    }

    useEffect(() => {
        if (title.length > 0 && content.length > 0) {
            setFullFilled(true)
        }
        else {
            setFullFilled(false)
        }
    }, [title, content])

    const customButton = {
        name: "word-break",
        keyCommand: "word-break",
        buttonProps: { "aria-label": "Word Break" },
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M3,7.2h18c0.6,0,1-0.4,1-1s-0.4-1-1-1H3c-0.6,0-1,0.4-1,1S2.4,7.2,3,7.2z M9,15.2H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h6
            c0.6,0,1-0.4,1-1S9.6,15.2,9,15.2z M18.5,10.2H3c-0.6,0-1,0.4-1,1s0.4,1,1,1h15.5c0.8,0,1.5,0.7,1.5,1.5s-0.7,1.5-1.5,1.5h-2.8
            c0.3-0.4,0.4-0.9,0-1.3c-0.4-0.4-1-0.5-1.4-0.1l-2,1.7c0,0-0.1,0.1-0.1,0.1c-0.4,0.4-0.3,1.1,0.1,1.4l2,1.7c0.2,0.1,0.4,0.2,0.6,0.2
            c0.3,0,0.6-0.1,0.8-0.4c0.3-0.4,0.3-0.9,0-1.3h2.8c1.9,0,3.5-1.6,3.5-3.5S20.4,10.2,18.5,10.2z"/></svg>
        ),
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            handleCreate()
        }, 500);
        return () => clearTimeout(timer)
    }, [title, content]);

    return (
        <div>
            <Navbar current={2} back={'/blogs'} />
            <div className="AddBlog">
                <form className='AddBlog-form' onSubmit={handleSubmit}>
                    <div className='title-wrapper'>
                        <input className='title' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
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

export default AddBlog