import React from 'react'
import MDEditor from '@uiw/react-md-editor';
import '../css/BlogItem.css';
import { Link } from 'react-router-dom';

function BlogItem(props) {

    const handleShotContent = () => {
        let content = props.content;
        let lines = content.split('\n');
        let shortContent = '';
        lines.map((line, index) => {
            if (/^[a-zA-Z]/.test(line)) {
                line = line.replace(/\*\*/g, '');
                line = line.replace(/\*/g, '');
                line = line.replace(/\~\~/g, '');
                shortContent += line + ' ';
            }
        })
        shortContent = shortContent.split(' ').slice(0, 30).join(' ') + '...';
        return shortContent;
    }

    const handleReadingTime = () => {
        let content = props.content;
        let lines = content.split('\n');
        let words = 0;
        lines.map((line, index) => {
            if (/^[a-zA-Z]/.test(line)) {
                line = line.replace(/\*\*/g, '');
                line = line.replace(/\*/g, '');
                line = line.replace(/\~\~/g, '');
                words += line.split(' ').length;
            }
        })
        let time = Math.round(words / 150);
        return time;
    }

    const handleTimeDifference = () => {
        let date = new Date(props.updated_at);
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

    let shotContent = handleShotContent();
    let readingTime = handleReadingTime();

    return (
        <div className="blog-item">
            <Link to={`/user/${props.user_id}`} style={{display: 'inline-block'}}>
                <div className="blog-author" >
                    <div className="avatar">
                        <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="avatar" />
                    </div>
                    <h4>{props.author}</h4>
                </div>
            </Link>
            <div className="blog-title">
                <Link to={`/blog/${props.id}`}>
                    <h2>{props.title}</h2>
                </Link>
            </div>
            <div className="blog-content" data-color-mode="light">
                <MDEditor.Markdown source={shotContent} />
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
    )
}

export default BlogItem