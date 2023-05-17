import * as React from 'react';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {Button, TextField} from "@mui/material";

import {reducerEditPerson} from "../../redux/reducer/reducerGetPeople";
import {AppDispatch} from "../../app/store";
import {IPeopleOne} from "../../models/people/IPeopleOne";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IEditModal {
  open: boolean;
  handleClose: () => void;
  person: IPeopleOne;
}

const EditModal = ({open, handleClose, person}: IEditModal) => {
  const [personEdit, setPersonEdit] = useState({});
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    setPersonEdit(person)
  },[person])
  const handleEdit = () => {
    dispatch(reducerEditPerson(personEdit as IPeopleOne))
    alert('Updated')
  }
  const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => {
    setPersonEdit({...personEdit, [value]: e.target.value})
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        {personEdit && Object.keys(personEdit).map((value) => {
            const valueNew = personEdit[value as keyof typeof personEdit]
            if (!Array.isArray(valueNew)) {
              return <ListItem
                key={value}
                disableGutters
                className='ListItem'
              >
                <ListItemText primary={value} className='ListItem__label'/>
                <TextField
                  className='ListItem__input'
                  label="Search"
                  variant="standard"
                  value={valueNew}
                  fullWidth
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeEdit(e, value)}
                />
              </ListItem>
            } else {
              return false
            }
          }
        )}
        <div className='edit'>
          <Button
            className='edit__button'
            variant="contained"
            onClick={handleEdit}
          >Edit</Button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditModal