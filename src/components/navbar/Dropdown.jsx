import React from 'react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="index.html" role="button" aria-haspopup="true" aria-expanded="false">Refrigeración</a>
            <div className="dropdown-menu text-center">
                <Link className="dropdown-item" to={"/category/air_coolers"}>Air Cooling</Link>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" to={"/category/water_coolers"}>Water Cooling</Link>
            </div>
        </li>
    );
}

export default Dropdown;
