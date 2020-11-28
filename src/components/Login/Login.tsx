import React from "react";
import s from "../Login/Login.module.scss"
import SNInput from "../../common/common_component/input/SNInput";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/AuthReducer";
import {StateType} from "../../store/store";
import SNButton from "../../common/common_component/button/SNButton";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Redirect} from "react-router-dom";

type LoginForm = {
    email: string
    pass: string
    rememberMe: boolean
}

const Login = () => {
    // валидация
    const schemaLogin = yup.object().shape({
        email: yup.string().required().email(),
        pass: yup.string().required().min(8)
    })

    const {register, handleSubmit, reset, control, errors} = useForm<LoginForm>({
        resolver: yupResolver(schemaLogin),
        defaultValues: {}
    })
    const dispatch = useDispatch()
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth)

    const onSubmit = (data: LoginForm) => {
        dispatch(login(data.email, data.pass, data.rememberMe))
        reset()
    }

    if (isAuth) return <Redirect to={'/profile'}/>

    return (
        <div className={s.loginFormBlock}>
            <div className={s.logBlock}>
                <h3>l o g i n</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={s.email}>
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
                        as={<SNInput type={'password'} errors={errors.pass?.message}/>}
                        name={'pass'}
                        control={control}
                        rules={{required: true}}
                        defaultValue={''}
                    />
                    {errors.pass && <span>{errors.pass.message}</span>}
                </div>
                <div className={s.rememberMe}>
                    <input name={'rememberMe'} type={'checkbox'} ref={register}/>
                    <span>remember me</span>
                </div>
                <div className={s.btnBlock}>
                    <SNButton buttonText={'login'}/>
                </div>
            </form>
        </div>
    )
}

export default Login