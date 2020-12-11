import React, {ChangeEvent, useState} from "react";
import s from "../Login/Login.module.scss"
import SNInput from "../../common/common_component/input/SNInput";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AuthRootType, login, updCaptchaUrl} from "../../store/AuthReducer";
import {StateType} from "../../store/store";
import SNButton from "../../common/common_component/button/SNButton";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Redirect} from "react-router-dom";
import {Fade} from "react-awesome-reveal";

type LoginForm = {
    email: string
    pass: string
    rememberMe: boolean
    captcha?: string
}

const Login = () => {
    // валидация
    const schemaLogin = yup.object().shape({
        email: yup.string().required().email(),
        pass: yup.string().required().min(8)
    })

    const {register, handleSubmit, control, errors} = useForm<LoginForm>({
        resolver: yupResolver(schemaLogin),
        defaultValues: {}
    })
    const dispatch = useDispatch()
    const {isAuth, authError, captcha} = useSelector<StateType, AuthRootType>(state => state.auth)
    const [type, setType] = useState<'password' | 'text'>('password')

    const onSubmit = (data: LoginForm) => {
        dispatch(login(data.email, data.pass, data.rememberMe, data.captcha))
    }

    const newCaptcha = () => {
        dispatch(updCaptchaUrl())
    }

    const showPass = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) {
            setType("text")
        } else {
            setType("password")
        }
    }

    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <Fade>
            <div className={s.loginFormBlock}>
                <div className={s.logBlock}>
                    <h3>l o g i n</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${s.email} ${errors.email?.message && s.errorField}`}>
                        <Controller
                            as={<SNInput type={'email'} errors={errors.email?.message}/>}
                            name={'email'}
                            control={control}
                            rules={{required: true}}
                            defaultValue={''}
                        />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className={s.pass}>
                        <Controller
                            as={<SNInput type={type} errors={errors.pass?.message}/>}
                            name={'pass'}
                            control={control}
                            rules={{required: true}}
                            defaultValue={''}
                        />
                        <input type="checkbox" onChange={showPass}/>show password
                        {errors.pass && <span>{errors.pass.message}</span>}
                    </div>
                    <div className={s.rememberMe}>
                        <input name={'rememberMe'} type={'checkbox'} ref={register}/>
                        <span>remember me</span>
                    </div>
                    {captcha && <div className={s.captcha}>
                        <img src={captcha} alt='' onClick={newCaptcha} style={{cursor: "pointer"}}/>
                        <Controller
                            as={<SNInput/>}
                            name={'captcha'}
                            control={control}
                            defaultValue={''}
                        />
                    </div>}
                    {authError && <span>{authError}</span>}
                    <div className={s.btnBlock}>
                        <SNButton buttonText={'login'}/>
                    </div>
                </form>
            </div>
        </Fade>
    )
}

export default Login