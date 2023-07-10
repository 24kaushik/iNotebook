import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const [note, setNote] = useState({ title: '', description: "", tag: '' })
    const context = useContext(noteContext);
    const { addNote } = context

    const handleClick = (e) => {
        e.preventDefault()
        if (note.tag.length === 0) {
            addNote(note.title, note.description, 'general')
        } else {
            addNote(note.title, note.description, note.tag)
        }
        setNote({ title: '', description: "", tag: '' })
        props.showAlert("Note added successfully!", "success")
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <div className="container">
                <h1 className='my-3'>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Title</label>
                        <input minLength={3} value={note.title} required type="text" onChange={onChange} className="form-control" name='title' id="title" aria-describedby="emailHelp" style={{ border: "1px solid #b4b4b4" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description</label>
                        <input minLength={3} value={note.description} required type="text" className="form-control" onChange={onChange} id="description" name='description' style={{ border: "1px solid #b4b4b4" }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label" >Tag</label>
                        <input type="text" value={note.tag} className="form-control" onChange={onChange} id="tag" name='tag' style={{ border: "1px solid #b4b4b4" }} />
                    </div>

                    <button disabled={note.title.length < 3 && note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
