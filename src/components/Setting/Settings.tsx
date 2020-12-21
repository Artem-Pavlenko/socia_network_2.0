import React, {useState} from "react"
import 'antd/dist/antd.css'
import {Modal} from "../../common/common_component/Modal/Modal";
import SNButton from "../../common/common_component/button/SNButton";


const Settings = () => {

    const [visible, setVisible] = useState(false);

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
        </>
    )
}

export default Settings