import axios from 'axios';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import Navbar from '../components/Navbar/Navbar'
import '../css/Learning.css'
import LoadingScreen from "react-loading-screen"
import Footer from '../components/Footer';
import logo from '../logo.svg';
import "plyr-react/plyr.css"
import Plyr, { usePlyr } from "plyr-react"
import CustomVideoPlyr from '../components/CustomVideoPlyr';
import Swal from 'sweetalert2';
import { async } from '@firebase/util';
import Percentage from '../components/Percentage';
import moment from 'moment';

function Learning() {

    const getUser = async () => {
        const result = await axios.get('/auth/user-profile').then(res => {
            if (res.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                window.location.href = '/';
            }
        });
    }

    useEffect(() => {
        getUser();
    }, [])

    const params = useParams();
    const course_id = params.id;

    const playerRef = useRef(null);

    const [title, setTitle] = useState('');
    const [updateTime, setUpdateTime] = useState(0);
    const [lessons, setLessons] = useState(null);
    const [current, setCurrent] = useState(0);
    const [listenersAdded, setListenersAdded] = useState(false);
    const [progress, setProgress] = useState([
        { lesson_id: '', progress: 0, completed: 0 },
    ]);
    const [percentage, setPercentage] = useState(0);

    const fetchData = async () => {
        window.scrollTo(0, 0);
        const result = await axios(
            `auth/learning/${course_id}`,
        ).then(res => {
            setLessons(res.data.lessons);
            setTitle(res.data.course.title);
            setUpdateTime(res.data.course.updated_at);
            setProgress(res.data.progress);
            setPercentage(res.data.percentage);
            // let lastCompletedIndex = progress.findIndex(item => item.completed === 1);
            // if (lastCompletedIndex === -1) lastCompletedIndex = 0;
            // setCurrent(lastCompletedIndex);
            document.title = res.data.course.title;
        })
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleLesson = (e, index) => {
        if (index === current) return;
        if (playerRef.current) {
            if (index >= lessons.length) {
                // Swal.fire({
                //     title: 'Warning!',
                // })
                handleLesson(null, 0);
                return;
            }
            const element = document.querySelectorAll('.lesson')[index];
            const items = document.querySelectorAll('.lesson');
            items.forEach(item => {
                item.classList.remove('selected');
            })
            element.classList.add('selected');
            // e.preventDefault();
            setProgress(prev => {
                const temp = [...prev];
                if (temp[current]) {
                    temp[current].lesson_id = lessons[current].id;
                    temp[current].progress = playerRef.current.plyr.currentTime;
                }
                else {
                    temp.push({
                        lesson_id: lessons[current].id,
                        progress: playerRef.current.plyr.currentTime
                    })
                }
                return temp;
            })
            postData(lessons[current].id, playerRef.current.plyr.currentTime);
            setCurrent(index);
        }
    }

    useEffect(() => {
        const player = document.querySelector('video')

        function logout(message) {
            console.log(message);
        }

        if (player) {
            player.addEventListener('ended', () => {
                postData(lessons[current].id, player.currentTime, 1);
                if (progress[current].completed === 1) {
                    playerRef.current.plyr.currentTime = 0;
                    // handleLesson(null, current + 1);
                }
            })
            player.addEventListener('seeked', () => {
            })
        }
    })

    useEffect(() => {
        console.log('progress', progress);

    }, [progress])


    const postData = async (lessonId, timeStamp, completed = 0) => {
        const progress = {
            lesson_id: lessonId,
            progress: timeStamp,
            completed: completed
        }
        const result = await axios.post('/auth/update-progress', progress)
            .then(res => {
                console.log(res.data);
                fetchData();
            })
    }

    return (
        <div>
            <div className='nav-learning'>
                <div className='navigation'>
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
                <div className='percentage'>
                    <Percentage percentage={percentage} />
                </div>
            </div>
            {lessons ? <div className='Learning'>
                <div className='left-section'>
                    <div className='video-wrapper'>
                        <div className='video' >
                            {/* <video ref={raptorRef} className="plyr-react plyr" id='plyr' /> */}
                            <CustomVideoPlyr
                                ref={playerRef}
                                lesson_id={lessons[current].id}
                                current_time={progress[current] ? progress[current].progress : 0}
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
                            />
                        </div>
                    </div>
                    <div className='learning-description'>
                        <h2>{title}</h2>
                        <span>Updated on {moment(updateTime).format('MM/DD/YYYY')}</span>
                    </div>
                </div>
                <div className='right-section'>
                    <div className='course-content'>
                        <h3>Course Content</h3>
                    </div>
                    <div className='lessons-list'>
                        {lessons.map((lesson, index) => {
                            let check = index != 0 && (!progress[index - 1] || !progress[index - 1].completed) ? true : false;
                            return (
                                <div
                                    className={index === 0 ? 'lesson selected' : 'lesson'}
                                    key={index}
                                    onClick={(e) => handleLesson(e, index)}
                                    style={{ pointerEvents: check ? 'none' : 'auto', opacity: check ? '0.5' : '1' }}

                                >
                                    <div>
                                        <h4 className='lesson-title'>{`Lesson ${index + 1}: ${lesson.name}`}</h4>
                                        <p ><i className="fa-solid fa-circle-play" ></i> {lesson.duration.slice(3)}</p>
                                    </div>
                                    <div style={{ visibility: !progress[index] || !progress[index].completed ? 'hidden' : 'visible' }}>
                                        <i className="fa-solid fa-circle-check" ></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div> :
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

            {/* <Footer /> */}

        </div>
    )
}

export default Learning