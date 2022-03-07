import Axios from 'axios';
import Router from './Router';
import './style/index.scss';

Axios.defaults.withCredentials = true;

function App() {
  return (
    <div className='container'>
      <Router />
    </div>
  );
}

export default App;
