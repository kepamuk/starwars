import {IPeople} from "./IPeople";
import {IPeopleOne} from "./IPeopleOne";

export interface IGetPeople {
  people: IPeople | null;
  peopleNotChange: IPeople | null;
  filterState: {[key: string]: string} | null;
  load: boolean;
  page: number;
  filter: { [key: string]: string[] } | null;
  person: IPeopleOne | null;
}
