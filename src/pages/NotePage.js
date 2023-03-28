import React, {useState, useEffect} from 'react'
// import reactRouterDom from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { Link } from 'react-router-dom'
// import { method } from 'lodash'

const NotePage = ({match, history}) => {

    let noteId = match.params.id
    let [note, setNote] = useState([])

    useEffect( () => {
        getNote()

    },[noteId])

    let getNote = async () => {
        if (noteId === "new"){return}
        let response = await fetch(`/api/notes/${noteId}`)
        // NOTE: The fetch() MUST start with a forward slash '/'
        let data = await response.json()
        setNote(data)
    }

    let createNote = async () => {
        fetch(`/api/notes/create/`, { 
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(note)

        })
    }

    let updateNote = async () => {
        fetch(`/api/notes/${noteId}/update/`, { 
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(note)

        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${noteId}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type":'application/json'
            }
        })
        history.push('/') 
        
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === ''){
            deleteNote()
        } else if (noteId !== 'new'){
            updateNote()
        } else if (noteId === "new" && note.body !== null){
            createNote()
        }
        
        history.push("/") // sends user back to homepage using built in brower parameter 'history'
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body':value}))

    }


    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    <Link to="/">
                    <ArrowLeft onClick={handleSubmit}/>
                    
                    </Link>
                </h3>
                {noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                
                ): <button onClick={handleSubmit}>Done</button>}
                
            </div>
            <textarea onChange={(e)=> handleChange(e.target.value)} value={note?.body}></textarea> 
            
        </div>
    )
}

export default NotePage
