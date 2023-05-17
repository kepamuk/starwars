import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {Button} from "@mui/material";

import {AppDispatch, RootState} from "../../app/store";
import {reducerSetFilter, reducerSetFilterState} from "../../redux/reducer/reducerGetPeople";

import './filter.scss';

const Filter = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {filter, load, filterState} = useSelector((state: RootState) => state.people)

  const handleChange = (event: SelectChangeEvent, tag: string) => {
    dispatch(reducerSetFilterState({value: event.target.value, tag}))
  };

  const handleClick = () => {
    dispatch(reducerSetFilter())
  }

  return (
    <div className='filter'>
      <h4>Filter</h4>
      <div className='filter__block'>
        {
          filterState && filter && Object.keys(filter).map((tag) => {
            return <FormControl
              className='FormControl'
              fullWidth
              key={tag}
              classes={{
                root: 'root'
              }}
              disabled={load}
            >
              <InputLabel id={tag}>{tag}</InputLabel>
              <Select
                value={filterState[tag] || 'empty'}
                defaultValue='empty'
                labelId={tag}
                id={tag + '_id'}
                label={tag}
                onChange={(e: SelectChangeEvent) => handleChange(e, tag)}
              >
                <MenuItem value='empty' key='empty'>Not selected</MenuItem>
                {filter[tag].map((option) => {
                  const opt = option
                  return <MenuItem value={opt} key={opt}>{opt}</MenuItem>
                })}
              </Select>
            </FormControl>
          })
        }
      </div>

      <Button className='filter__button' fullWidth variant="contained" disabled={load} onClick={handleClick}>Filter</Button>
    </div>
  );
}

export default Filter;
