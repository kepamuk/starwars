import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {LinearProgress} from "@mui/material";

import {actionGetPeople} from "../../redux/action/actionGetPeople";
import CustomPaginationActionsTable from "../../components/table/table";
import Search from "../../components/search/search";
import Filter from "../../components/filter/filter";
import {AppDispatch, RootState} from "../../app/store";

import './Main.scss';

function Main() {
  const dispatch = useDispatch<AppDispatch>()
  const {load} = useSelector((state: RootState) => state.people)

  useEffect(() => {
    dispatch(actionGetPeople('https://swapi.py4e.com/api/people/'))
  }, [dispatch])

  return (
    <div className="App">
      <Search />
      <div className='table'>
        {load ? <LinearProgress/> : <div className='empty-loader'/>}
        <div className='table__wrap'>
          <div className='table__wrap-filter'>
            <Filter/>
          </div>
          <div className='table__wrap-table'>
            <CustomPaginationActionsTable/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
