import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/"
})

export const authorizationAPI = {
    login(email, password) {
        return instance.post("/login", {email, password})
    },
    logout() {
        return instance.delete("/login")
    }
};

export const ContactsAPI = {
    getContacts() {
        return instance.get("/contacts")
    },
    addContact(name, number) {
        return instance.post("/contacts", {name, number})
    },
    deleteContact(id) {
        return instance.delete(`/contacts/${id}`)
    },
    editContact(contact,id) {
        return instance.put(`/contacts/${id}`, contact)
    }
}
