import React from 'react';
import { 
  Paper, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  IconButton,  
  Checkbox,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <>
    <Paper style={{ padding: "0.5em 0em" }}>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo.id)} > 
            <DeleteIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton role={undefined} dense>
          <ListItemIcon>
              <input style={{ width:"20px", height:"20px" }} onChange={() => toggleComplete(todo)} type='checkbox' checked={todo.completed ? 'checked' : ''} />
          </ListItemIcon>
          <ListItemText onClick={() => toggleComplete(todo)} primary={todo.text} />
        </ListItemButton>
      </ListItem>
    </Paper>
  </>
  );
};

export default Todo;
