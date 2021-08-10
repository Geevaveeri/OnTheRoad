import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header class='header'>
            <div>
                <nav className='nav'>
                    <Link to="/">
                        <h1>On The Road</h1>
                    </Link>
              {Auth.loggedIn() ? (
                            <>
                                <a href="/" onClick={logout}>
                                    Logout
                  </a>
                            </>
                        ) : (
                                <>
                                    <Link to="/login">Login</Link>
                                </>
                            )}
            </nav>
          </div>
        </header>
      );
};

export default Header;
// add image to header/nav