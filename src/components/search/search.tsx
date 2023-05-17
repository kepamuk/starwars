import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, TextField} from "@mui/material";

import {actionGetPeople} from "../../redux/action/actionGetPeople";
import {reducerSetPage} from "../../redux/reducer/reducerGetPeople";
import {AppDispatch, RootState} from "../../app/store";

import './search.scss';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {load} = useSelector((state: RootState) => state.people)
  const [search, setSearch] = useState('')

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.target.value)
  }

  const handleSearch = () => {
    dispatch(actionGetPeople(`https://swapi.py4e.com/api/people?search=${search}`))
    dispatch(reducerSetPage(0))
  }

  return (
    <div className='search'>
      <TextField
        className='search__input'
        label="Search"
        variant="standard"
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChangeSearch(e)}
      />
      <Button
        className='search__button'
        variant="contained"
        onClick={handleSearch}
        disabled={load}
      >{search ? 'Search' : 'Refresh'}</Button>
    </div>
  );
}

export default Search;
