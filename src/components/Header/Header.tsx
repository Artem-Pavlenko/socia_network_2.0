import React from "react";
import s from "../Header/Header.module.scss"
import SocialNetworkIcon from "../../assets/images/social.svg"


const Header = () => {



    return (
        <div className={s.headerBlock}>

            <header>

                <img src={SocialNetworkIcon} alt=""/>
                <div>
                    <button>bla bla</button>
                </div>
            </header>
        </div>
    )
}

export default Header