import React, { useEffect } from 'react'
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
        </div>
    )
}

export default Blogs