import React, {useState} from "react";
import style from "./Contacts.module.css";
import {createField, Input} from "../Forms/CreateField";
import {maxLength15, minLength3, number, required} from "../Forms/Validators";
import {reduxForm} from "redux-form";

const NewContactForm = (props) => {
    return <>
        <form onSubmit={props.handleSubmit}>
            <div><b>Enter name:</b>{createField("Name", "name", [required, maxLength15], Input)}</div>
            <div><b>Enter
                number:</b>{createField("Number", "number", [required, minLength3, number, maxLength15], Input)}</div>
            <div className={style.contacts__button}>
                <button className={style.btn} type={"submit"}>Add</button>
            </div>
        </form>
    </>
}

const EditContactForm = ({contact,handleSubmit}) => {
    return <form className={style.contacts__formEdit} onSubmit={handleSubmit}>
            <div>{createField("Name", "name", [required, maxLength15], Input)}</div>
            <div style={{display:"flex"}}>{createField("Number", "number", [required, minLength3, number, maxLength15], Input)}
                <div><button className={style.btn} type={"submit"}>Save <i className={"fa fa-folder"}/></button></div>
            </div>
    </form>
}

const EditContactReduxForm = reduxForm({form: 'edit'})(EditContactForm)
const NewContactReduxForm = reduxForm({form: 'contacts'})(NewContactForm)

const ContactList = (props) => {
    const [editMode, setEditMode] = useState({id: null, active: false});
    const [inputText, setInputText] = useState("");
    let filteredContacts = props.contacts.filter(contact=> {
        return contact.name.toLowerCase().indexOf(inputText.toLowerCase()) !== -1;
    });

    let changeText = (e) => {
        setInputText(e.target.value)
    }

    const deleteContact = (id) => {
        return props.deleteContact(id)
    }

    const editContact = (contact) => {
        return props.updateContact(editMode.id,contact).then(
            ()=>setEditMode({id:null,active: false}))
    }
    return <>
        <div className={style.contacts__table}>
            <div><b>Name:</b></div>
            <div><b>Phone Number:</b></div>
        </div>
        <div style={{width:"60%"}}><input type="text" value={inputText}
                                        onChange={changeText}  placeholder="Find Contact"/></div>

        {filteredContacts.map(contact => <div key={contact.id} className={style.contacts__table_list}>
                {editMode.active && editMode.id === contact.id ?
                    <EditContactReduxForm initialValues={contact} onSubmit={editContact}/>
                    : <><span>{contact.name}</span>
                        <div><span>{contact.number}</span>
                            {!editMode.active &&
                            <button className={style.btn} onClick={() => setEditMode({id: contact.id, active: true})}>Edit <i className={"fa fa-bars"}/></button>}
                            {!editMode.active && <button className={style.btn_delete} onClick={() => deleteContact(contact.id)}><i className={"fa fa-trash"}/></button>}
                        </div>
                    </>
                }
            </div>
        )}
    </>
}

export const Contacts = (props) => {
    const [editMode, setEditMode] = useState(false);

    const addContact = (form) => {
        const name = form.name;
        const number = form.number
        return props.addContact(name, number).then(
            () => setEditMode(false))
    }

    return <div className={style.contacts__container}>
        <ContactList updateContact={props.updateContact} deleteContact={props.deleteContact} contacts={props.contacts}/>
        {!editMode &&
        <div>
            <button className={style.btn} onClick={() => setEditMode(true)}>Add new contact <i className={"fa fa-folder"}/></button>
        </div>}
        {editMode && <NewContactReduxForm onSubmit={addContact}/>}
    </div>

}