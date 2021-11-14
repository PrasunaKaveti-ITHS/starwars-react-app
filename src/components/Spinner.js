import React from 'react';
import spinner from '../images/spinner.gif';

function Spinner() {
    return (
        <div id="loading-spinner-div">
            <img id="loading-spinner" src={spinner} alt="Loading..." />
        </div>
    );
}

export default Spinner;