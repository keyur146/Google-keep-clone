import { useContext } from "react";

import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ArchiveOutlined, DeleteOutlineOutlined } from "@mui/icons-material";

import { DataContext } from "../../context/DataProvider";

const StyledCard = styled(Card)`
    width: 240px;
    margin: 8px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 8px
`


const Archive = ({ note }) => {

    const { notes, setNotes, archiveNotes, setArchiveNotes, setDeletedNotes} = useContext(DataContext);

    const UnarchiveNote = (note) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== note.id);
        setArchiveNotes(updatedNotes);
        setNotes(prevArr => [note, ...prevArr]);
    }

    const deleteNote = (note) => {
        const updatedNotes = archiveNotes.filter(data => data.id !== note.id);
        setArchiveNotes(updatedNotes);
        setDeletedNotes(prevArr => [note, ...prevArr]);
    }

    return(
        <StyledCard>
            <CardContent>
                <Typography>{note.heading}</Typography>
                <Typography>{note.text}</Typography>
            </CardContent>
            <CardActions>
                <ArchiveOutlined
                fontSize="small"
                style={{marginLeft: "auto"}}
                onClick={() => UnarchiveNote(note)}
                />
                <DeleteOutlineOutlined
                fontSize="small"
                onClick={() => deleteNote(note)}
                />
            </CardActions>
        </StyledCard>
    );
}

export default Archive;