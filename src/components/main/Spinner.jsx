import React from 'react';

const Spinner = () => {
    return (
        <div className="clearfix">
            <div className="spinner-border float-center" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;
