import React from "react";
import notFoundIcon from "../../assets/images/404.svg"
import s from "../404/NotFound.module.scss"
const Particles = require('react-particles-js')

const NotFound = () => {

    const particlesParams = {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            }
        }
    }

    return (
        <div className={s.notFoundBlock}>
            <Particles parems={particlesParams} className={s.particles}/>
            <img src={notFoundIcon} alt="not found"/>
            <div>
                <span>not found</span>
            </div>
        </div>
    )
}

export default NotFound