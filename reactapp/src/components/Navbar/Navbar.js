import React, { Component, useEffect, useRef, useState } from 'react'
import { MenuItems } from './MenuItems'
import '../../css/Navbar.css'
import logo from '../../logo.svg';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import Login from '../../pages/Login';
import Searchbar from '../Searchbar';

function Navbar() {
    const [clicked, setClicked] = useState(false);
    const [popup, setPopup] = useState(false);

    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            var element = document.getElementsByClassName('App')[0];
            if (popup) {
                element.classList.add('disabled');
            }
            else {
                element.classList.remove('disabled');
            }
        }
    });

    const handleClick = () => {
        setClicked(!clicked);
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
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <div className={clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index) => {
                        return (
                            <Link key={index} to={item.url} className={item.cName} onClick={handleIndicator.bind(this)}>
                                {item.title}
                            </Link>
                        )
                    })}
                    <div className="container-signIn">
                        <Button buttonSize={'btn--medium'} className="btn-signIn-popup" onClick={() => setPopup(!popup)}>Sign In</Button>
                    </div>
                </div>

            </nav>
            <div className="popup">
                <Login trigger={popup} clickOutside={setPopup} />
            </div>
        </div>
    )
}

export default Navbar;
