import React from 'react'
import '../css/Footer.css';
import { Button } from './Button';

function Footer() {
    return (
        <div className='footer-wrapper'>
            <footer className="footer">
                <div className="footer__addr">
                    <h1 className="footer__logo">Code Tutor</h1>

                    <h2>Contact</h2>

                    <address>
                        Danang University of Science and Technology<br/>

                            <Button className='footer__btn'>Email Us</Button>
                    </address>
                </div>

                <ul className="footer__nav">
                    <li className="nav__item">
                        <h2 className="nav__title">Media</h2>

                        <ul className="nav__ul">
                            <li>
                                <a href="#">Online</a>
                            </li>

                            <li>
                                <a href="#">Print</a>
                            </li>

                            <li>
                                <a href="#">Alternative Ads</a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav__item nav__item--extra">
                        <h2 className="nav__title">Technology</h2>

                        <ul className="nav__ul nav__ul--extra">
                            <li>
                                <a href="#">Hardware Design</a>
                            </li>

                            <li>
                                <a href="#">Software Design</a>
                            </li>

                            <li>
                                <a href="#">Digital Signage</a>
                            </li>

                            <li>
                                <a href="#">Automation</a>
                            </li>

                            <li>
                                <a href="#">Artificial Intelligence</a>
                            </li>

                            <li>
                                <a href="#">IoT</a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav__item">
                        <h2 className="nav__title">Legal</h2>

                        <ul className="nav__ul">
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>

                            <li>
                                <a href="#">Terms of Use</a>
                            </li>

                            <li>
                                <a href="#">Sitemap</a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className="legal">
                    <p>&copy; 2022. All rights reserved.</p>

                    <div className="legal__links">
                        <span>Made with <span className="heart">♥</span> from Zhukyu</span>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer