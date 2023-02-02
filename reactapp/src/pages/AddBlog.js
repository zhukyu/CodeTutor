import React, { useEffect, useState } from 'react'
import MDEditor from "@uiw/react-md-editor";
import '../css/AddBlog.css'
import Navbar from '../components/Navbar/Navbar';
import { Button } from '../components/Button';
import Footer from '../components/Footer';

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`;

function AddBlog() {
    document.title = 'Add Blog | Code Tutor';

    const [title, setTitle] = useState('');
    const [value, setValue] = useState(mkdStr);
    const [fullFilled, setFullFilled] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(title);
        console.log(value);
    }

    useEffect(() => {
        if (title.length > 0 && value.length > 0) {
            setFullFilled(true)
        }
        else {
            setFullFilled(false)
        }
    }, [title, value])

    return (
        <div>
            <Navbar current={1} back={'/blogs'} />
            <div className="AddBlog">
                <form className='AddBlog-form' onSubmit={handleSubmit}>
                    <div className='title-wrapper'>
                        <input className='title' type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div data-color-mode="light" className='editor-wrapper'>
                        <MDEditor value={value} onChange={setValue} height={'100%'} textareaProps={{
                            placeholder: "Please enter Content"
                        }} />
                    </div>
                    <div className="add-blog">
                        <Button
                            type="submit"
                            className='add-blog-btn'
                            disabled={!fullFilled}
                        >Add Blog</Button>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default AddBlog