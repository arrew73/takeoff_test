import {ContactsAPI} from "../../API/RestAPI";

const SET_CONTACTS = 'SET_CONTACTS';

let initialState = {
    contacts: []
}


export const contactsReducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        default:
            return state;
    }
}


const setContacts = (contacts) => ({type:SET_CONTACTS, contacts})

export const getContacts = () => async (dispatch) => {
    const promise = await ContactsAPI.getContacts()
    if(promise.status === 200) {
        dispatch(setContacts(promise.data))
    }
}

export const addContact = (name,number) => async (dispatch) => {
    const promise = await ContactsAPI.addContact(name,number)
    if(promise.status === 201) {
        dispatch(getContacts())
    }
}

export const deleteContact = (id) => async (dispatch) => {
    const promise = await ContactsAPI.deleteContact(id)
    if(promise.status === 200) {
        dispatch(getContacts())
    }
}

export const updateContact = (id,contact) => async (dispatch) => {
    const promise = await ContactsAPI.editContact(contact,id)
    if(promise.status === 200) {
        dispatch(getContacts())
    }
}
