import type { Note } from "./note";

export interface Modal  {
  id:string
  showModal: boolean;
  IsforEdit: boolean;
  note: Note
};