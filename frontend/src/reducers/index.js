import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import noteReducer from './noteReducer'

const reducer = combineReducers({noteReducer, form: formReducer});

export default reducer;
