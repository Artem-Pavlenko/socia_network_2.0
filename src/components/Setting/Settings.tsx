import React, {useState} from "react"
import 'antd/dist/antd.css'
import {Button, Modal} from "antd";


const Settings = () => {

    const [visible, setVisible] = useState(false);

    return (
        <div>

            <>
                <Button type="primary" onClick={() => setVisible(true)}>
                    Open Modal of 1000px width
                </Button>
                <Modal
                    title="Modal 1000px width"
                    centered
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                    width={1000}
                >
                    <p>E R R O R</p>
                </Modal>
            </>
            Settings
        </div>
    )
}

export default Settings