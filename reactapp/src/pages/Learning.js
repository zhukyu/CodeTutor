import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Navbar from '../components/Navbar/Navbar'
import '../css/Learning.css'
import LoadingScreen from "react-loading-screen"
import Footer from '../components/Footer';
import logo from '../logo.svg';
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

function Learning() {

    const params = useParams();
    const course_id = params.id;

    const playerRef = useRef(null);

    const [title, setTitle] = useState('');
    const [lessons, setLessons] = useState(null);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            window.scrollTo(0, 0);
            const result = await axios(
                `/course/${course_id}/lessons`,
            );
            setLessons(result.data.data);
            setTitle(result.data.title[0].title);
            document.title = result.data.title[0].title;
        };
        fetchData();
    }, [])

    const handleLesson = (e, index) => {
        if (index === current) return;
        if (playerRef.current) {
            const element = document.querySelectorAll('.lesson')[index];
            const items = document.querySelectorAll('.lesson');
            items.forEach(item => {
                item.classList.remove('selected');
            })
            element.classList.add('selected');
            e.preventDefault();
            setCurrent(index);
        }
    }
    return (
        <div>
            <div className='nav-learning'>
                <Link to={`/course/${course_id}`} className='back-btn' title='Back'>
                    <i className="fa-solid fa-angle-left"></i>
                </Link>
                <Link to='/' className="logo">
                    <img className="logo-icon" src={logo} alt="logo" />
                </Link>
                <div className='course-title'>
                    <h3>{title}</h3>
                </div>
            </div>
            {lessons ? <div className='Learning'>
                <div className='left-section'>
                    <div className='video-wrapper'>
                        <div className='video' >
                            <Plyr
                                ref={playerRef}
                                type="video"
                                source={{ type: 'video', sources: [{ src: lessons[current].URL, type: 'video/mp4' }] }}
                                options={{
                                    controls: [
                                        'play-large', // The large play button in the center
                                        'rewind', // Rewind by the seek time (default 10 seconds)
                                        'play', // Play/pause playback
                                        'fast-forward', // Fast forward by the seek time (default 10 seconds)
                                        'progress', // The progress bar and scrubber for playback and buffering
                                        'current-time', // The current time of playback
                                        'duration', // The full duration of the media
                                        'mute', // Toggle mute
                                        'volume', // Volume control
                                        'captions', // Toggle captions
                                        'settings', // Settings menu
                                        'pip', // Picture-in-picture (currently Safari only)
                                        'fullscreen', // Toggle fullscreen
                                    ],
                                }}

                                onPlay={() => console.log('The video has started playing')}
                            />
                            {/* <button onClick={() => {
                            console.log(playerRef.current)
                            playerRef.current.plyr.play();
                        }}>Play</button>
                        <p>{duration}</p> */}
                        </div>
                    </div>
                    <h2>{title}</h2>
                </div>
                <div className='right-section'>
                    <div className='course-content'>
                        <h3>Course Content</h3>
                    </div>
                    <div className='lessons-list'>
                        {lessons.map((lesson, index) => {
                            return (
                                <div className='lesson' key={index} onClick={(e) => handleLesson(e, index)}>
                                    <h4 className='lesson-title'>{`Lesson ${index + 1}: ${lesson.name}`}</h4>
                                    <p ><i className="fa-solid fa-circle-play" ></i> {lesson.duration.slice(3)}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> :
                <div>
                    {/* <LoadingScreen
                        loading={true}
                        bgColor="rgba(0, 0, 0, 0.2)"
                        spinnerColor="#84fab0"
                        textColor="#676767"
                        logoSrc=""
                        text=""
                    >
                    </LoadingScreen> */}
                    <div style={{ height: "100vh" }}></div>
                </div>
            }

            {/* <Footer /> */}

        </div>
    )
}

export default Learning