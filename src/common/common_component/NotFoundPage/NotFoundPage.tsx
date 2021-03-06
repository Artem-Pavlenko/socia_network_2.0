import React from "react";
import notFoundIcon from "../../../assets/icon/404.svg"
import s from "./NotFound.module.scss"

const Particles = require('react-particles-js')


const NotFoundPage = () => {

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

export default NotFoundPage