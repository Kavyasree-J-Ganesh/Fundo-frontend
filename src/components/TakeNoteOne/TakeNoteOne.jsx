import React from "react"
import "./TakeNoteOne.css"
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushOutlinedIcon from '@mui/icons-material/BrushOutlined';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';


const   TakeNoteOne = props => {

    return (
        <div className="takenote_header" onClick={()=> props.displayEdit(true)}>
            <span className="takenote_des">Take a note...</span>
            <CheckBoxOutlinedIcon color="action" sx={{ fontSize: 24 }}/>
            <BrushOutlinedIcon color="action" sx={{ fontSize: 24 }}/>
            <InsertPhotoOutlinedIcon color="action" sx={{ fontSize: 24}}/>
        </div>
    )
}



export default TakeNoteOne;