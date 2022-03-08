import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './SnippetEditor.scss';
import ErrorMessage from '../misc/ErrorMessage';

function SnippetEditor({ setSnippetEditorOpen, getSnippets, editSnippetData }) {
  const [editorTitle, setEditorTitle] = useState('');
  const [editorDesc, setEditorDesc] = useState('');
  const [editorCode, setEditorCode] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (editSnippetData) {
      setEditorTitle(editSnippetData.title ? editSnippetData.title : '');
      setEditorDesc(editSnippetData.desc ? editSnippetData.desc : '');
      setEditorCode(editSnippetData.code ? editSnippetData.code : '');
    }
  }, [editSnippetData]);

  async function saveSnippet(e) {
    e.preventDefault();

    const snippetData = {
      title: editorTitle ? editorTitle : undefined,
      desc: editorDesc ? editorDesc : undefined,
      code: editorCode ? editorCode : undefined,
    };

    try {
      if (!editSnippetData)
        await Axios.post('http://localhost:5000/snippet/', snippetData);
      else
        await Axios.put(
          `http://localhost:5000/snippet/${editSnippetData._id}`,
          snippetData
        );
    } catch (err) {
      if (err.response) {
        // errorMessage comes from backend validation in userRouter.js
        if (err.response.data.errorMessage) {
          setErrorMsg(err.response.data.errorMessage);
        }
      }
      return;
    }

    getSnippets();
    closeEditor();
  }

  function closeEditor() {
    setSnippetEditorOpen(false);
  }

  return (
    <div className='snippet-editor'>
      {errorMsg && (
        <ErrorMessage msg={errorMsg} clear={() => setErrorMsg(null)} />
      )}
      <form className='form' onSubmit={saveSnippet}>
        <label htmlFor='editor-title'>Title</label>
        <input
          id='editor-title'
          type='text'
          value={editorTitle}
          onChange={(e) => setEditorTitle(e.target.value)}
        />

        <label htmlFor='editor-desc'>Description</label>
        <input
          id='editor-desc'
          type='text'
          value={editorDesc}
          onChange={(e) => setEditorDesc(e.target.value)}
        />

        <label htmlFor='editor-code'>Code</label>
        <textarea
          id='editor-code'
          value={editorCode}
          onChange={(e) => setEditorCode(e.target.value)}
        ></textarea>

        <button className='btn-save' type='submit'>
          Save
        </button>
        <button className='btn-cancel' type='button' onClick={closeEditor}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SnippetEditor;
