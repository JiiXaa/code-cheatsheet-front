import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
// specify path for a requests depending on production or development NODE_ENV
import domain from '../utils/domain';

const UserContext = createContext();

function UserContextProvider({ children }) {
  // use undefined because we dont know if user is logged in yet. We haven't made a request
  // if null it means user is not logged in (after check)
  // string means it is logged in
  const [user, setUser] = useState(undefined);

  async function getUser() {
    // this endpoint reads the cookie
    const userRes = await axios.get(`${domain}/auth/loggedIn`);
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, getUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };
