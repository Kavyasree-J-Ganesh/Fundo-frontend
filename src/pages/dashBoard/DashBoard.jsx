import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import TakeNoteTwo from "../../components/TakeNoteTwo/TakeNoteTwo"
import TakeNoteOne from "../../components/TakeNoteOne/TakeNoteOne"
import "./DashBoard.css"
import { getNotes } from "../../services/NoteService"
import TakeNoteThree from "../../components/TakeNoteThree/TakeNoteThree"
import MiniDrawer from "../../components/Drawer/Drawer"
import BasicModal from "../../components/Modal/Modal"



const DashBoard = props => {
    const [isNew, setIsNew] = useState(false)
    const [searchtext, setSearchText] = useState("")
    const [editNote, setEditNote] = useState(null);
    const [selectedLabel, setSelectedLabel] = useState("Notes");
    const [isOpenModal, setOpenModal] = useState(false)
    const [noteList, setNoteList] = useState([]);
    const [filteredNoteList, setFilteredNoteList] = useState([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const displayNewNote = (value) => {
        setIsNew(value);
    }

    const handleMenuClick = () => {
        setIsMenuOpen(prevState => !prevState)
    }

    const selectLabel = (option) =>{
       setSelectedLabel(option)
    }



    console.log(selectedLabel)
    useEffect( () => {
        getLatestNotes()
    }, [selectedLabel])


    useEffect(()=>{
       let filtered = noteList.filter(note=> { return note.title.includes(searchtext) || note.description.includes(searchtext)})
       setFilteredNoteList(filtered)
    },[searchtext])
    

    const getLatestNotes = async ()=>{
        try {
            const result = await getNotes()
            let filteredNote = []
            if(selectedLabel === "Notes") {
                filteredNote = result.data.data.filter(note=> {
                    if(note.archive === false && note.trash === false){
                        return note
                    }
                })
            }else if(selectedLabel === "Archive") {
                filteredNote = result.data.data.filter(note=> {
                    if(note.archive === true ){
                        return note
                    }
                })
            } else if(selectedLabel === "Bin") {
                filteredNote = result.data.data.filter(note=> {
                    if(note.trash === true){
                        return note
                    }
                })
            } 
           setNoteList(filteredNote);
           setFilteredNoteList(filteredNote.filter(note=> note.title.includes(searchtext) || note.description.includes(searchtext)))
        } catch (e) {
            console.log(e)
        }
    }

    const toggleModal = (isOpen) =>{
        setOpenModal(isOpen)
    }

    const enableNoteEdit = (noteToEdit) =>{
        setEditNote(noteToEdit)
        toggleModal(true)
    }

    const onSearch = (text)=>{
        setSearchText(text)
    }


    return (
        <div className="dashboard">
            <BasicModal open={isOpenModal} closeModal={toggleModal}>
                <TakeNoteTwo refresh={getLatestNotes} editNote={editNote} closeModal={toggleModal}/>
            </BasicModal>
            <Header handleMenuClick={handleMenuClick} onSearch={onSearch} />
            <div className="dashboard_main">

                <MiniDrawer open={isMenuOpen} selectLabel={selectLabel} />
                <div className="dashboard_content">
                    {
                        isNew ?
                            <div className="dashboard_addnote">
                                <TakeNoteTwo refresh={getLatestNotes} closeModal={toggleModal}  displayEdit={displayNewNote} />
                            </div>
                            : <TakeNoteOne displayEdit={displayNewNote} />
                    }

                    <div className="dashboard_notes">
                        {
                            filteredNoteList.map(note => (<TakeNoteThree refresh={getLatestNotes} note={note} handleEdit={enableNoteEdit} />))
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}



export default DashBoard