import Axios from 'axios';
import { useEffect } from 'react';
import domain from '../../utils/domain';

import Prism from 'prismjs';
import './prism.css';
import './Snippet.scss';

function Snippet({ snippet, getSnippets, editSnippet }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [snippet]);

  async function deleteSnippet() {
    if (window.confirm('Are you sure you want to delete this snippet?')) {
      await Axios.delete(`${domain}/snippet/${snippet._id}`);
      // get new snippets after deleting one
      getSnippets();
    }
  }

  return (
    <div className='snippet'>
      {snippet.title && <h2 className='title'>{snippet.title}</h2>}
      {snippet.desc && <p className='desc'>{snippet.desc}</p>}
      {snippet.code && (
        <pre className='code'>
          <code className='language-css'>{snippet.code}</code>
        </pre>
      )}
      <button className='btn-edit' onClick={() => editSnippet(snippet)}>
        Edit
      </button>
      <button className='btn-delete' onClick={deleteSnippet}>
        Delete
      </button>
    </div>
  );
}

export default Snippet;
