import type { Note } from "./note";

export interface Modal  {
  id:string
  showModal: boolean;
  isForEdit: boolean;
  isDarkTheme:boolean;
  note: Note
};