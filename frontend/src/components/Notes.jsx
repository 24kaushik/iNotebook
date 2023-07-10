import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import noteContext from '../context/notes/noteContext';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext)
    const { notes, getNotes, editNote } = context;
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes()
        } else {
            navigate('/login')
        }

    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({ id: '', etitle: '', edescription: "", etag: '' })

    const updateNote = (currentNote) => {
        ref.current.click()
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
    }

    const handleClick = (e) => {
        e.preventDefault()
        refClose.current.click()
        if (note.etag.length === 0) {
            editNote(note.id, note.etitle, note.edescription, 'general')
        } else {
            editNote(note.id, note.etitle, note.edescription, note.etag)
        }
        props.showAlert("Note Updated successfully!", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <AddNote showAlert={props.showAlert} />
            <button style={{ display: 'none' }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="text" className="form-label">Title</label>
                                    <input minLength={3} required type="text" value={note.etitle} onChange={onChange} className="form-control" name='etitle' id="etitle" aria-describedby="emailHelp" style={{ border: "1px solid #b4b4b4" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label" >Description</label>
                                    <input minLength={3} required type="text" value={note.edescription} className="form-control" onChange={onChange} id="edescription" name='edescription' style={{ border: "1px solid #b4b4b4" }} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label" >Tag</label>
                                    <input type="text" value={note.etag} className="form-control" onChange={onChange} id="etag" name='etag' style={{ border: "1px solid #b4b4b4" }} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='my-3'>Your Notes</h1>
            <div className="container d-flex row">
                {notes.length === 0 && "No notes to display"}
                {notes.map((note) => {
                    return <NoteItem showAlert={props.showAlert} note={note} updateNote={updateNote} key={note._id} />
                })}
            </div>
        </>
    )
}

export default Notes
