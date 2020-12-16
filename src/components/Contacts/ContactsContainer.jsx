import React from "react";
import {Contacts} from "./Contacts";
import {withAuthRedirect} from "../HOC/HOC";
import {connect} from "react-redux";
import {compose} from "redux";
import {addContact, deleteContact, getContacts, updateContact} from "../../Redux/Reducers/ContactsReducer";
import Loader from "react-loader-spinner";


class ContactsContainer extends React.Component {
    renderContacts(){
        this.props.getContacts();
    }
    componentDidMount() {
        this.renderContacts()
    }
    //
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if(this.props.contacts !== prevProps.contacts) {
    //         this.renderContacts()
    //     }
    // }

    render() {
        if (!this.props.contacts) {
            return <div>
                <Loader
                    type="TailSpin"
                    color="#5c98dc"
                    height={250}
                    width={250}/>
            </div>
        }
        return <Contacts updateContact={this.props.updateContact} deleteContact={this.props.deleteContact} addContact={this.props.addContact} contacts={this.props.contacts}/>
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.Contacts.contacts
    }

}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {getContacts,addContact,
        deleteContact,updateContact})
)(ContactsContainer)