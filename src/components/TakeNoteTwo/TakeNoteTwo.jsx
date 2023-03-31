import React, { useEffect, useState } from "react"
import "./TakeNoteTwo.css"
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { Input } from "@mui/material";
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { RedoOutlined } from "@mui/icons-material";
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { createNote, updateNote } from "../../services/NoteService";
import ColorPopper from "../Colorpopper/ColorPopper";


const ariaLabel = { 'aria-label': 'description' };

const TakeNoteTwo = props => {

    const [newNote, setNewNote] = useState({ title: "", description: "", color:"white", archive:false, trash: false})

    useEffect(()=>{
       if(props.editNote){
        setNewNote({ title: props.editNote.title, description: props.editNote.description, color:props.editNote.color, archive:props.editNote.archive, trash: props.editNote.trash})
       }
    },[props.editNote])

    const setEditOption = () => {
        saveNote()
        if(!props.editNote) props.displayEdit(false)
    }

    const setColor = (color) => {
        setNewNote(prev=> ({...prev, color:color}))
    
    }

    const setTitle = (event) => {
        setNewNote(prev => { return { ...prev, title: event.target.value } })
    }

    const setDescription = (event) => {
        setNewNote(prev => { return { ...prev, description: event.target.value } })
    }

    const saveNote = async () => {
        try {
            const result = !props.editNote ? await createNote(newNote) : await updateNote(newNote, props.editNote._id)
            props.closeModal(false)
            props.refresh();
            console.log(result)
        } catch (e) {
            console.log(e)
            props.closeModal(false)
            // alert(e.response.data.message)
        }
    }

    const addTtoArchive = () => {
        setNewNote(prev => { return { ...prev, archive: true } })
    }

    const addTtoTrash = () => {
        setNewNote(prev => { return { ...prev, trash: true } })
    }


    return (
        <ClickAwayListener onClickAway={() => setEditOption()}>
            <div className="takenotetwo_container" style={{backgroundColor:newNote.color}}>
                <div className="takenotetwo_container_head">

                    <Input placeholder="Title" value={newNote?.title} InputProps={{ ariaLabel }} disableUnderline={true} variant="standard" autoFocus onChange={setTitle} />

                    <PushPinOutlinedIcon color="action" sx={{ fontSize: 24 }} />
                </div>
                <div className="takenotetwo_container_main">
                    <Input placeholder="Take a note" value={newNote?.description} InputProps={{ ariaLabel }} disableUnderline={true} variant="standard" autoFocus onChange={setDescription} />
                </div>
                <div className="takenotetwo_container_footer">
                    <div className="takenotetwo_container_footer_left">
                        <AddAlertOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                        <PersonAddAltOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                        <ColorPopper setColor = {setColor} type="create"/>
                        <InsertPhotoOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                        <ArchiveOutlinedIcon onClick={addTtoArchive} color="action" sx={{ fontSize: 18 }} />
                        <DeleteOutlinedIcon onClick={addTtoTrash} color="action" sx={{ fontSize: 18 }} />
                        <MoreVertOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                        <UndoOutlinedIcon color="disabled" sx={{ fontSize: 18 }} />
                        <RedoOutlined color="disabled" sx={{ fontSize: 18 }} />
                    </div>

                    <div className="takenotetwo_container_footer_right">
                        <a  className="note_edit_close" onClick={setEditOption}>close</a>
                    </div>
                </div>
            </div>
        </ClickAwayListener>
    )
}



export default TakeNoteTwo