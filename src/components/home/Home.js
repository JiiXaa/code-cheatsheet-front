import Axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import domain from '../../utils/domain';

import Snippet from './Snippet';
import SnippetEditor from './SnippetEditor';
import UserContext from '../../context/UserContext';
import landingImg from '../../img/snipper-landing01.png';

import './Home.scss';

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [SnippetEditorOpen, setSnippetEditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  // need to destructure user because UserContext is an object with multiple values
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      // when log off gets rid off all user's snippet
      setSnippets([]);
      // fix for 401 (Unauthorized) after logging off
      return;
    }
    // when logged in
    getSnippets();
  }, [user]);

  async function getSnippets() {
    const snippetsRes = await Axios.get(`${domain}/snippet/`);
    setSnippets(snippetsRes.data);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className='home'>
      {!SnippetEditorOpen && user && (
        <button
          className='btn-editor-toggle'
          // onClick={() => setSnippetEditorOpen(true)}
          onClick={() => editSnippet(false)}
        >
          Add snippet
        </button>
      )}
      {SnippetEditorOpen && (
        <SnippetEditor
          setSnippetEditorOpen={setSnippetEditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className='no-snippets-msg'>No snippets have been added yet</p>
          )}
      {/* user === null && better than !user &&. Prevents showing component while refreshing */}
      {user === null && (
        <div className='no-user-msg'>
          <h2>Welcome to Code Cheatsheet Manager</h2>
          <img src={landingImg} alt='example code snippet' />
          <Link to='/register'>Register here</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
