import { useContext } from 'react';

import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material';

// components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

import { DataContext } from '../../context/DataProvider';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

const Notes = () => {

    const { notes, setNotes } = useContext(DataContext);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = reorder(notes, result.source.index, result.destination.index);

        setNotes(items);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Form />
                {
                    notes.length > 0 ?
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <Grid container style={{ marginTop: 16 }}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {
                                            notes.map((note, index) => (
                                                <Draggable key={note.id} draggableId={note.id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <Grid
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            item>
                                                            <Note note={note} />
                                                        </Grid>
                                                    )}
                                                </Draggable>
                                            ))
                                        }
                                    </Grid>
                                )}
                            </Droppable>
                        </DragDropContext>
                        : <EmptyNotes />
                }
            </Box>
        </Box>
    );
}

export default Notes;