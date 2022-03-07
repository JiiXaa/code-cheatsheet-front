import Axios from 'axios';
import Router from './Router';
import { UserContextProvider } from './context/UserContext';

import './style/index.scss';

Axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <div className='container'>
        <Router />
      </div>
    </UserContextProvider>
  );
}

export default App;
