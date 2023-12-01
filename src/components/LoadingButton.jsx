import React from "react";
import Loader from "../assets/loader.svg?react";

const LoadingButton = ({ text, onClick, loading, disabled, style, type }) => {

    const styling = 'submit-btn ' + style;
    return (
        <button className={styling} onClick={onClick} disabled={disabled} type={type} >
            {loading ? <Loader className="spinner" /> : text}
        </button>
    );
}

export default LoadingButton;