import React from "react";
import notFoundIcon from "../../assets/icon/404.svg"
import s from "../404/NotFound.module.scss"
import {Fade} from "react-awesome-reveal";

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
        <Fade>
            <div className={s.notFoundBlock}>
                <Particles parems={particlesParams} className={s.particles}/>
                <img src={notFoundIcon} alt="not found"/>
                <div>
                    <span>not found</span>
                </div>
            </div>
        </Fade>
    )
}

export default NotFound