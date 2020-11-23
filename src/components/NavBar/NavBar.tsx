import React from "react";
import s from "../NavBar/NavBar.module.scss"
import {NavLink} from "react-router-dom";

const navItems = ["profile", "friends", "users", "messages", "settings", "News"]


const NavBar = () => {
    return (
        <div className={s.navBarBlock}>
            {navItems.map(i => <NavBarLink to={"/" + i.toLowerCase()} key={i} text={i[0].toUpperCase() + i.slice(1)}/>)}
        </div>
    )
}

export default NavBar


type LinkType = {
    to: string
    text: string
}

const NavBarLink = ({to, text = ""}: LinkType) => {
    return (
        <div className={s.link}>
            <NavLink activeClassName={s.active} to={to}>{text}</NavLink>
        </div>
    )
}