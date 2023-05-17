import {IPeopleOne} from "./IPeopleOne";

export interface IPeople {
  count?: number
  next?: string | null
  previous?: string | null
  results?: IPeopleOne[]
}