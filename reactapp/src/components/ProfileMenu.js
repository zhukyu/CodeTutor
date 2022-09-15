import React, { useState } from 'react'
import '../css/ProfileMenu.css'

function ProfileMenu() {
    const [dropdown, setDropdown] = useState(false);
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
    return (
        <div className="wrap-profile-menu">
            <div className="avatar" onClick={dropDownHandle}>
                <img src="https://www.w3schools.com/css/lights600x400.jpg" alt="avatar" />
            </div>
            <ul className="dropdown">
                <li className="dropdown-item">Profile</li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-item">My Courses</li>
                <li role="separator" className="divider"></li>
                <li className="dropdown-item">Log Out</li>
            </ul>
        </div>
    )
}

export default ProfileMenu
