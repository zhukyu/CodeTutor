import React from "react";
import '../css/Button.css';

const STYLES = [
    'btn--primary',
    'btn--outline'
]

const SIZES = [
    'btn--medium',
    'btn--large'
]

export const Button = ({ 
    className,
    id,
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize 
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    const checkId = id ? id : ''

    const checkClassName = className ? className : ''

    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkClassName}`} id={checkId} onClick={onClick} type={type}>
            {children}
        </button>
    )
}
