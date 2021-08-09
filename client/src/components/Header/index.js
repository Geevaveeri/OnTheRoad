import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };

    return (
        <header>
          <div>
            <Link to="/">
              <h1>Deep Thoughts</h1>
            </Link>
    
            <nav>
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