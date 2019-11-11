import {ADDNOTE} from './actionTypes';

export const addnote = (note) => ({
    type: ADDNOTE,
    payload: note
});