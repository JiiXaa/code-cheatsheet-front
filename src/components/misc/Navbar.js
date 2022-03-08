import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import domain from '../../utils/domain';

import './Navbar.scss';

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get(`${domain}/auth/logOut/`);
    // we need to update context after logging out
    await getUser();
  }

  return (
    <div className='navbar'>
      <Link to='/'>
        <h1>Code Cheatsheet</h1>
      </Link>
      {/* user === null ? better than !user ?. Prevents showing component while refreshing */}
      {user === null ? (
        <>
          <Link to='/login'>Log In</Link>
          <Link to='/register'>Register</Link>
        </>
      ) : (
        user && (
          <button className='btn-logout' onClick={logOut}>
            Log out
          </button>
        )
      )}
    </div>
  );
}

export default Navbar;
