import "./index.css"
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, toggleImportance } from '../src/redux/features/notes/notesSlice';

function App() {
  const [newNote, setNewNote] = useState('');
  const dispatch = useDispatch();
  const notes = useSelector(state => state.notes.notes);

  const handleAddNote = () => {
    if (newNote.trim() !== '') {
      dispatch(addNote({
        id: Date.now().toString(),
        content: newNote,
        important: false
      }));
      setNewNote('');
    }
  };

  const handleDeleteNote = (id) => {
    dispatch(deleteNote(id));
  };

  const handleToggleImportance = (id) => {
    dispatch(toggleImportance({ id }));
  };

  return (
    <div className="app-container">
    <div className="App">
      <h1>Notes App</h1>
      <div className="input-div">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter a new note..."
        />
        <button className="button" onClick={handleAddNote}>Add Note</button>
      </div>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div className="li-container">
            <span style={{ fontWeight: note.important ? 'bold' : 'normal' }}>
              {note.content}
            </span>
            <button className="btn btn1" onClick={() => handleToggleImportance(note.id)}>Toggle</button>
            <button className="btn btn2" onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default App;
