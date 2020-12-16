import React from "react";
import style from "./Header.module.css"
import {NavLink} from "react-router-dom";

export const Header = (props) => {
    return <header className={style.header}>
        <div> <NavLink to="/contacts">CONTACTS</NavLink></div>
        <div>
        {props.isAuthorized &&
        <button onClick={props.logout}>LOGOUT</button>}
        {props.login && <span style={{color:"#4a6474",marginLeft:"10px"}}>{props.login}</span>}</div>
        {!props.isAuthorized && <div> <NavLink to="/login">LOGIN</NavLink></div>}
    </header>
}