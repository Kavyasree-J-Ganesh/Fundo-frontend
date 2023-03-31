import * as React from 'react';
import Typography from '@mui/material/Typography';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { border } from '@mui/system';
import { updateColor } from '../../services/NoteService';

const colors = ["red", "pink", "green", "violet", "orange", "yellow"]

export default function ColorPopper(props) {

const onSelectColor = async (color) => {
    if(props.type === "create") {
        props.setColor(color)
    }else {
        try {
            const result = await updateColor(props.id, color)
            console.log(result)
            props.refresh()
        }catch(e) {
            console.log(e)
        }
    }
}

  return (
    <PopupState variant="popper" popupId="demo-popup-popper">
      {(popupState) => (
        <div>
          <ColorLensOutlinedIcon color="action" sx={{ fontSize: 18 }}  {...bindToggle(popupState)} />
          <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography {...bindToggle(popupState)} sx={{ p: 2, display:"flex"}}>{colors.map(color => (
                    <div  
                    onClick={() => onSelectColor(color)}
                    style={{ 
                        width:"30px", 
                        height:"30px", 
                        border:"1px", 
                        borderRadius:"100%", 
                        backgroundColor:color, marginLeft:"6px"
                    }}></div>
                  ))}</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>)
}