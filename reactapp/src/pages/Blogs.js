import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

function Blogs() {
    useEffect (() => {
        document.querySelector('.NavbarItems').classList.add('scrolled');
    });
    return (
        <div>
            <Navbar current={2}/>
            <div className='Blogs'>

            </div>
            <Footer/>
        </div>
    )
}

export default Blogs