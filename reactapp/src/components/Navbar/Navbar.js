import React, { useState } from 'react'
import { MenuItems } from './MenuItems'
import '../../css/Navbar.css'
import logo from '../../logo.svg';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import Login from '../Login';
import Searchbar from '../Searchbar';
import ProfileMenu from '../ProfileMenu'

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [popup, setPopup] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    }

    const handleNavMenuPopup = (e) => {
        if (e.target === e.currentTarget) {
            setClicked(!clicked);
        }
    }

    const handleLoginPopup = (e) => {
        if (e.target === e.currentTarget) {
            setPopup(!popup)
            var item = document.querySelector('.popup-login');
            if (!popup) {
                item.classList.add('is-active');
            }
            else {
                item.classList.remove('is-active');
            }
        }
    }

    const handleIndicator = (e) => {
        var element = e.target;
        var items = document.querySelectorAll('.nav-links');
        items.forEach(function (item) {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });
        element.classList.add('is-active');
    }

    return (
        <div className="Navbar">
            <nav className="NavbarItems">
                <div className="logo">
                    <img className="logo-icon" src={logo} alt="logo" />
                    <h1 className="logo-title">Code Tutor</h1>
                </div>
                <Searchbar />
                <div className="container-avatar-mobile">
                    <ProfileMenu />
                </div>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <div className={clicked ? "popup-nav-menu is-active" : "popup-nav-memu"} onClick={handleNavMenuPopup}>
                    <div className={clicked ? "nav-menu is-active" : "nav-menu"}>
                        {MenuItems.map((item, index) => {
                            return (
                                <Link key={index} to={item.url} className={item.cName} onClick={handleIndicator}>
                                    {item.title}
                                </Link>
                            )
                        })}
                        <div className="container-signIn hide">
                            <Button buttonSize={'btn--medium'} className="btn-signIn-popup" onClick={handleLoginPopup}>Sign In</Button>
                        </div>
                        <div className="container-avatar hide">
                            <ProfileMenu />
                        </div>
                    </div>
                </div>

            </nav>
            <div className="popup-login" onClick={handleLoginPopup}>
                <Login trigger={popup} />
            </div>
        </div>
    )
}

export default Navbar;
