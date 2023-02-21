import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';
import LoadingScreen from "react-loading-screen"
import '../css/BlogDetail.css'

function BlogDetail() {
    const params = useParams();
    const blog_id = params.id;

    const [data, setData] = useState('');
    const [sticky, setSticky] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);
            const result = await axios(
                `/blog/${blog_id}`,
            );
            console.log(result.data);
            setData(result.data.data);
            setUserName(result.data.user_name);
            document.title = result.data.data.title + ' | Code Tutor';
        };

        fetchData();
    }, [])

    const handleReadingTime = () => {
        let content = data.content;
        let words = 0;
        if (content) {
            let lines = content.split('\n');
            lines.map((line, index) => {
                if (/^[a-zA-Z]/.test(line)) {
                    line = line.replace(/\*\*/g, '');
                    line = line.replace(/\*/g, '');
                    line = line.replace(/\~\~/g, '');
                    words += line.split(' ').length;
                }
            })
        }
        let time = Math.round(words / 150);
        return time;
    }

    const handleTimeDifference = () => {
        let date = new Date(data.updated_at);
        let current = new Date();
        let diff = current - date;
        let diffYears = Math.floor(diff / 31536000000);
        let diffMonths = Math.floor(diff / 2592000000);
        let diffDays = Math.floor(diff / 86400000);
        let diffHours = Math.floor((diff % 86400000) / 3600000);
        let diffMinutes = Math.round(((diff % 86400000) % 3600000) / 60000);
        if (diffYears > 0) {
            return diffYears + ' years ago';
        }
        if (diffMonths > 0) {
            return diffMonths + ' months ago';
        }
        if (diffDays > 0) {
            return diffDays + ' days ago';
        }
        else if (diffHours > 0) {
            return diffHours + ' hours ago';
        }
        else if (diffMinutes === 0) {
            return 'Just now';
        }
        else {
            return diffMinutes + ' minutes ago';
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setSticky(true);
            }
            else {
                setSticky(false);
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    let readingTime = handleReadingTime();

    return (
        <div>
            <Navbar current={2} back={'/blogs'} />
            {data ?
                <div className="BlogDetail" data-color-mode="light">
                    <div className="controller-wrapper" >
                        <div
                            className='controller'
                            id='controller'
                        >
                            <Link
                                to={`/user/${data.user_id}`}
                                style={{ pointerEvents: sticky ? 'auto' : 'none' }}>
                                <div
                                    className="avatar"
                                    style={{ visibility: sticky ? 'visible' : 'hidden' }}
                                    enabled={sticky}
                                >
                                    <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="avatar" />
                                </div>
                            </Link>
                            <div className="votes">
                                <button className="btn-vote">
                                    <i className="fa-solid fa-caret-up"></i>
                                </button>
                                <div className="points">
                                    {data.vote > 0 ? `+${data.vote}` : data.vote === 0 ? `0` : `${data.vote}`}
                                </div>
                                <button className="btn-vote">
                                    <i className="fa-solid fa-caret-down"></i>
                                </button>
                            </div>
                            <div className="bookmark">
                                <button className="btn-bookmark">
                                    <i className="fa-regular fa-bookmark"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="blog-container">
                        <div className="blog-title">
                            <h1>{data.title}</h1>
                        </div>
                        <div className="blog-author-wrapper">
                            <div className="blog-author" >
                                <Link to={`/user/${data.user_id}`}>
                                    <div className="avatar">
                                        <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="avatar" />
                                    </div>
                                </Link>
                                <Link to={`/user/${data.user_id}`}>
                                    <h4>{userName}</h4>
                                </Link>
                            </div>
                            <div className='blog-info'>
                                <div className="blog-date">
                                    <span>{handleTimeDifference()}</span>
                                </div>
                                <span>·</span>
                                <div className="blog-reading-time">
                                    <span>{readingTime} min read</span>
                                </div>
                            </div>
                        </div>
                        <MDEditor.Markdown source={data.content} />
                    </div>
                </div>
                :
                <div>
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
                </div>
            }
            <Footer />
        </div>
    )
}

export default BlogDetail