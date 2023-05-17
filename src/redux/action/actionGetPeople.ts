import axios from "axios";

import {reducerGetPeople, reducerGetPerson, reducerSetLoad} from "../reducer/reducerGetPeople";
import {AppDispatch} from "../../app/store";


export const actionGetPeople = (url: string) => (dispatch: AppDispatch) => {
  dispatch(reducerSetLoad())
  axios.get(url)
    .then(res => {
      dispatch(reducerGetPeople(res.data))
    })
}

export const actionGetPeopleOne = (id: string) => (dispatch: AppDispatch) => {
  dispatch(reducerSetLoad())
  axios.get(`https://swapi.py4e.com/api/people/${id}`)
    .then(res => {
      dispatch(reducerGetPerson(res.data))
    })
}