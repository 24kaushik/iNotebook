import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context;
    const { note, updateNote } = props
    return (
        <div className='col-md-3'>
            <div className="card my-2 ">
                <div className="card-body">
                    <div className="d-flex" style={{ alignItems: "center" }}><h5 className="card-title" style={{ margin: "auto 0" }}>{note.title}</h5>
                        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                        <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Note deleted successfully!", "success") }} ></i></div>
                    <p className="card-text">{note.description}</p>
                    <div className="card-footer text-body-secondary">{note.tag}</div>

                </div>
            </div>
        </div>
    )
}

export default NoteItem
