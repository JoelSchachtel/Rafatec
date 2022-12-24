import React from 'react';
import {Link} from "react-router-dom"

const Logo = () => {
    return (
        <Link to="/">
            <div className="logo"> 
                <div><span className="logo__e">Rafa</span><span className="logo__hard">TEC</span></div>
                <div className="logo__computacion">Informática</div>
            </div>
        </Link>    
    );
}

export default Logo;
