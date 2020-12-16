import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import {authenticationReducer} from "../Reducers/LogInReducer";
import {contactsReducer} from "../Reducers/ContactsReducer";


let reducers = combineReducers({
    Authentication: authenticationReducer,
    form: formReducer,
    Contacts: contactsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;