import React from 'react';

import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Hooks Demo</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link data-testid='nav-home' to="/">Home</Link></li>
                    <li><Link data-testid='nav-about' to="/about">About</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
