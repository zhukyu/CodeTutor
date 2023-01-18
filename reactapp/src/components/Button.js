import React from "react";
import '../css/Button.css';

const STYLES = [
    'btn--primary',
    'btn--outline',
    'btn--rounded'
]

const SIZES = [
    'btn--medium',
    'btn--large',
    'btn--small',
]

export const Button = ({
    className,
    id,
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
    disabled
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

    const checkId = id ? id : ''

    const checkClassName = className ? className : ''

    return (
        <button
            className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkClassName}`}
            id={checkId}
            onClick={onClick}
            type={type}
            disabled={disabled}
            style={{ pointerEvents: disabled ? "none" : "auto", opacity: disabled ? 0.6 : 1 }}
            >
            {children}
        </button>
    )
}
