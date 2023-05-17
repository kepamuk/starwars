import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Button, LinearProgress} from "@mui/material";

import {actionGetPeopleOne} from "../../redux/action/actionGetPeople";
import {AppDispatch, RootState} from "../../app/store";
import EditModal from "../../components/modal/modal";

import './Person.scss';
import {IPeopleOne} from "../../models/people/IPeopleOne";

const Person = () => {
  const [open, setOpen] = useState(false);
  const {id} = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const {person, load} = useSelector((state: RootState) => state.people)

  useEffect(() => {
    dispatch(actionGetPeopleOne(id as string))
  }, [dispatch, id])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='Person'>
      {open && <EditModal open={open} handleClose={handleClose} person={person as IPeopleOne} />}
      {load ? <LinearProgress/> : <div className='empty-loader'/>}
      <div className='Person__controls'>
        <Link to='/'>
          <Button
            className='search__button'
            variant="contained"
            disabled={load}
          >
            Return
          </Button>
        </Link>
        <Button
          className='search__button'
          variant="contained"
          disabled={load}
          onClick={handleOpen}
        >
          Edit
        </Button>
      </div>
      {!load && <List>
        {person && Object.keys(person).map((value) => {
            const valueNew = person[value as keyof typeof person]
            return <ListItem
              key={value}
              disableGutters
              className='ListItem'
            >
              <ListItemText primary={value} className='ListItem__label'/>
              {!Array.isArray(valueNew) &&
                <ListItemText className='ListItem__value' primary={valueNew}/>
              }
              {Array.isArray(valueNew) && <ListItemText className='ListItem__value'>
                {valueNew.map((e) => {
                  return <div key={e}>{e}</div>
                })}
              </ListItemText>}
            </ListItem>
          }
        )}
      </List>
      }
    </div>
  )
}

export default Person;
