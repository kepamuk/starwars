import {createSlice, Draft, PayloadAction, current} from '@reduxjs/toolkit';

import {IGetPeople} from "../../models/people/IGetPeople";
import {IPeople} from "../../models/people/IPeople";
import {IPeopleOne} from "../../models/people/IPeopleOne";

const initialState: IGetPeople = {
  people: null,
  peopleNotChange: null,
  load: false,
  page: 0,
  filter: null,
  filterState: null,
  person: null
};

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {
    reducerGetPeople: (state: Draft<IGetPeople>, action: PayloadAction<IPeople>) => {
      state.filter = createFilter(action, [3, 4])
      state.people = action.payload
      state.peopleNotChange = action.payload
      state.filterState = {}
      state.load = false
    },
    reducerSetPage: (state: Draft<IGetPeople>, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    reducerSetLoad: (state: Draft<IGetPeople>) => {
      state.load = true
    },
    reducerSetFilter: (state: Draft<IGetPeople>) => {
      state.people = createFilterPeople(current(state))
    },
    reducerSetFilterState: (state: Draft<IGetPeople>, action: PayloadAction<{ tag: string, value: string }>) => {
      state.filterState = setFilter(state, action)
    },
    reducerGetPerson: (state: Draft<IGetPeople>, action: PayloadAction<IPeopleOne>) => {
      state.person = action.payload
      state.load = false
    },
    reducerEditPerson: (state: Draft<IGetPeople>, action: PayloadAction<IPeopleOne>) => {
      state.person = action.payload
    },
  },
});

function createFilter(action: PayloadAction<IPeople>, elements: number[]) {
  const filter: { [key: string]: string[] } = {}
  for (let i = 0; i < elements.length; i++) {
    action.payload.results?.forEach((people: IPeopleOne) => {
      const element = Object.keys(people)[elements[i]] as keyof typeof people
      const p = people[element] as keyof typeof people
      if (filter[element]) {
        if (!filter[element].includes(p)) {
          filter[element].push(p)
        }
      } else {
        filter[element] = [p]
      }
    })
  }

  return filter
}

function createFilterPeople(state: IGetPeople) {
  const arr: IPeopleOne[] = []
  if (state.filterState && !Object.keys(state.filterState).length) {
    return state.peopleNotChange
  }
  state.peopleNotChange?.results?.forEach((e: IPeopleOne) => {
    for (let tag in state.filterState) {
      if (e[tag as keyof typeof e] === state.filterState[tag] as string) {
        arr.push(e)
      }
    }
  })

  return {...state.people, results: Array.from(new Set(arr))}
}

function setFilter(state: IGetPeople, action: PayloadAction<{ tag: string, value: string }>) {
  let newFilterState: {}
  if (action.payload.value === 'empty') {
    const delFilterState = JSON.parse(JSON.stringify(current(state).filterState))
    delete delFilterState[action.payload.tag]

    newFilterState = delFilterState
  } else {
    newFilterState = {...current(state).filterState, [action.payload.tag]: action.payload.value as string}
  }

  return newFilterState
}

export const {
  reducerGetPeople,
  reducerSetLoad,
  reducerSetPage,
  reducerSetFilter,
  reducerSetFilterState,
  reducerGetPerson,
  reducerEditPerson
} = peopleSlice.actions;

export default peopleSlice.reducer;