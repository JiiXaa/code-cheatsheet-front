import Axios from 'axios';
import './Snippet.scss';
import Prism from 'prismjs';
import './prism.css';
import { useEffect } from 'react';

function Snippet({ snippet, getSnippets, editSnippet }) {
  // console.log(snippet);

  useEffect(() => {
    Prism.highlightAll();
  }, [snippet]);

  async function deleteSnippet() {
    await Axios.delete(`http://localhost:5000/snippet/${snippet._id}`);

    getSnippets();
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
