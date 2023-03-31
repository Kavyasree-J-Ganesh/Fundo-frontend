import React, { useState } from "react"
import "./TakeNoteThree.css"
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddAlertOutlinedIcon from '@mui/icons-material/AddAlertOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import DeleteOutlinedIcon
    from "@mui/icons-material/DeleteOutlined";
import { addToArchive, addToTrash } from "../../services/NoteService";
import ColorPopper from "../Colorpopper/ColorPopper";

const ariaLabel = { 'aria-label': 'description' };

const TakeNoteThree = props => {



    const addToArchiveList = async () => {
        try {
            const result = await addToArchive(props.note._id)
            console.log(result)
            props.refresh()
        } catch (e) {
            console.log(e)
        }
    }


    const addToTrashBin = async () => {
        try {
            const result = await addToTrash(props.note._id)
            console.log(result)
            props.refresh()
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div className="takenotethree_container" style={{ backgroundColor: props.note.color }}>
            <div onClick={() => props.handleEdit(props.note)}>
                <div className="takenotethree_container_head">
                    <span style={{ wordWrap: 'break-word', maxWidth: "90%" }}>{props.note.title}</span>
                    <PushPinOutlinedIcon color="action" sx={{ fontSize: 24 }} />
                </div>
                <div className="takenotethree_container_main">
                    <span style={{ wordWrap: 'break-word' }}>{props.note.description}</span>
                </div>
            </div>
            <div className="takenotethree_container_footer">
                <div className="takenotethree_container_footer_left">
                    <AddAlertOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                    <PersonAddAltOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                    <ColorPopper refresh={props.refresh}  type="update" id={props.note._id} />
                    <InsertPhotoOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                    <ArchiveOutlinedIcon onClick={addToArchiveList} color="action" sx={{ fontSize: 18 }} />
                    <DeleteOutlinedIcon onClick={addToTrashBin} color="action" sx={{ fontSize: 18 }} />
                    <MoreVertOutlinedIcon color="action" sx={{ fontSize: 18 }} />
                </div>
            </div>
        </div>

    )
}



export default TakeNoteThree