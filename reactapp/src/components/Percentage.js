import React from 'react';
import '../css/Percentage.css';

const Percentage = ({ percentage }) => {
    const dasharray = `${Math.round(percentage)}, 100`;
    return (
        <div className="circle-progress">
            <svg viewBox="0 0 36 36">
                <path className="circle-bg"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                    strokeDasharray={dasharray}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage">{Math.round(percentage)}%</text>
            </svg>
        </div>
    );
}

export default Percentage;