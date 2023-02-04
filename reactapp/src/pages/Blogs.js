import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import LoadingScreen from "react-loading-screen"
import { Button } from '../components/Button';
import axios from 'axios';
import BlogItem from '../components/BlogItem';
import '../css/Blogs.css'

function Blogs() {
    document.title = 'Blogs | Code Tutor';
    const [blogs, setBLogs] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.querySelector('.NavbarItems').classList.add('scrolled');
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/blogs',
            );
            console.log(result.data.data);
            setBLogs(result.data.data);
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar current={2} />
            {blogs ? <div className='Blogs'>
                <div className="blog-section" id="blog-section">
                    <div className="wrap-header">
                        <span className="header">Featured blogs</span>
                        {localStorage.getItem('role') === 'admin' ? <Link to={'/add-blog'} className="">
                            <Button className="" onClick=''>Add blog</Button>
                        </Link> : ''}
                    </div>
                    {blogs.map((item, index) => {
                        return (
                            <div className="item" key={index}>
                                <BlogItem
                                    id={item.id}
                                    user_id={item.user_id}
                                    title={item.title}
                                    author={item.name}
                                    content={item.content}
                                    updated_at={item.updated_at}
                                />
                            </div>
                        )
                    })}
                </div>
            </div> : <div>
                <LoadingScreen
                    loading={true}
                    bgColor="rgba(0, 0, 0, 0.2)"
                    spinnerColor="#84fab0"
                    textColor="#676767"
                    logoSrc=""
                    text=""
                >
                </LoadingScreen>
                <div style={{ height: "100vh" }}></div>
            </div>}
            <Footer />
        </div>
    )
}

export default Blogs