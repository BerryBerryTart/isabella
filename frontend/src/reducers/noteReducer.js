import {ADDNOTE} from '../actions/actionTypes';

export default function noteReducer(state, action){
    switch (action.type){
        case ADDNOTE: {

        }
        default:
            return null;
    }
}