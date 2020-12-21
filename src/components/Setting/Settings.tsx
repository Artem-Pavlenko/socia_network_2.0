import React, {useState} from "react"
import 'antd/dist/antd.css'
import {Modal} from "../../common/common_component/ModalWimdow/Modal";
import SNButton from "../../common/common_component/button/SNButton";
import {PopUp} from "../../common/common_component/PopUp/PopUp";


const Settings = () => {

    const [visible, setVisible] = useState(false);
    const [popUp, setPopUp] = useState(false)
    const errors = ['bla bla', 'Lorem car firs', 'error']

    return (
        <>
            <SNButton buttonText={'show modal'} onClick={() => setVisible(true)}/>
            {visible && <Modal
                title={'error'}
                onCancel={() => setVisible(false)}
                onSubmit={() => setVisible(false)}
            >
                {errors.map(e => <p>{e}</p>)}
            </Modal>}
            <SNButton buttonText={'show PopUp'} onClick={() => setPopUp(true)}/>
            {popUp && <PopUp text={'text'}/>}
        </>
    )
}

export default Settings