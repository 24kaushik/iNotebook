import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:6969'
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes);

  //Get all notes
  const getNotes = async () => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })
    const json = await response.json()
    setNotes(json)
  }

  //Add a Note
  const addNote = async (title, description, tag) => {
    //TODO API Call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();
    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = async (id) => {
    //API Call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API call
    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    })
    // const json = response.json
    //logic to edit in client
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title
        newNotes[index].description = description
        newNotes[index].tag = tag
        break
      }
    }
    setNotes(newNotes)
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}



export default NoteState;