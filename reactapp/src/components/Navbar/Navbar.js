import React, { useEffect, useState } from 'react'
import { MenuItems } from './MenuItems'
import '../../css/Navbar.css'
import logo from '../../logo.svg';
import { Button } from '../Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login';
import Searchbar from './Searchbar';
import ProfileMenu from './ProfileMenu'
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../utility/actions';

async function fetchData(setData) {
    try {
        const result = await axios.get("/auth/user-profile")
        if (result.status === 401) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('role');
        }
        setData(result);
    } catch (error) {
        console.error(error);
    }
}

function Navbar(props) {

    const [clicked, setClicked] = useState(false);
    const popup = useSelector(state => state.isTrue)
    const dispatch = useDispatch();
    const [data, setData] = useState(null);

    const handleToggleState = () => {
        dispatch(toggleState());
    }

    useEffect(() => {
        fetchData(setData);
    }, []);

    useEffect(() => {
        const element = document.querySelectorAll('.nav-links')[props.current];
        var items = document.querySelectorAll('.nav-links');
        items.forEach(function (item) {
            item.classList.remove('is-active');
            item.removeAttribute('style');
        });
        element.classList.add('is-active');
    })


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
            handleToggleState();
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
            <nav className={"NavbarItems scrolled"}>
                <Link to='/' className="logo">
                    <img className="logo-icon" src={logo} alt="logo" />
                    {props.back ?
                        <Link to={props.back} className='back-btn' title='Back'>
                            <i className="fa-solid fa-angle-left"></i>
                            <span>Back</span>
                        </Link>
                        : <h1 className="logo-title">Code Tutor</h1>}
                </Link>
                <Searchbar />
                <div className={clicked ? "nav-menu-mask is-active" : "nav-menu-mask"} onClick={handleNavMenuPopup}>
                </div>
                <div className={clicked ? "nav-menu is-active" : "nav-menu"}>
                    {MenuItems.map((item, index) => {
                        return (
                            <Link key={index} to={item.url} className={item.cName} onClick={handleIndicator}>
                                {item.title}
                            </Link>
                        )
                    })}
                </div>
                {data ? <div className="wrap-signIn-avatar">
                    <div className={data.status === 401 ? "container-signIn" : "container-signIn hide"}>
                        <Button buttonSize={'btn--medium'} className="btn-signIn-popup" onClick={handleLoginPopup}>Sign In</Button>
                    </div>
                    <div className={data.status === 200 ? "container-avatar" : "container-avatar hide"}>
                        <ProfileMenu />
                    </div>
                </div> : <div className="blank"></div>}
                <div className="menu-icon" onClick={handleClick}>
                    <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </nav>
            <div className="popup-login" onClick={handleLoginPopup}>
                <Login trigger={popup} />
            </div>
        </div>
    )
}

export default Navbar;
