import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../css/ProfileMenu.css'

function useOutsideAlerter(ref, setDropdown) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                var item = document.querySelector('.dropdown');
                setDropdown(false);
                item.classList.remove('is-active');
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setDropdown]);
}

function ProfileMenu() {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, setDropdown);
    const dropDownHandle = () => {
        var item = document.querySelector('.dropdown');
        setDropdown(!dropdown);
        if (!dropdown) {
            item.classList.add('is-active');
        }
        else {
            item.classList.remove('is-active');
        }
    }

    const onLogOut = (e) => {
        e.preventDefault();

        axios.post('/auth/logout').then(res =>{
            if(res.status === 200)
            {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user_name');
                localStorage.removeItem('user_id');
                localStorage.removeItem('role');
                navigate(0);
            }
        });
    }

    return (
        <div className="wrap-profile-menu" ref={wrapperRef}>
            <div className="avatar" onClick={dropDownHandle}>
                <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="avatar" />
            </div>
            <ul className="dropdown">
                <li className="dropdown-item">Profile</li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-item">My Courses</li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-item" onClick={onLogOut}>Log Out</li>
            </ul>
        </div>
    )
}

export default ProfileMenu
