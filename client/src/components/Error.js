import {useState} from "react"
import {useSelector, useDispatch} from "react-redux"

import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';


function Error() {
    const errors = useSelector((state)=>state.errors)
    const [show, setShow] = useState(true);

    console.log(errors)
    return(

        <ToastContainer style={{zIndex: "9999"}} position="middle-center" containerPosition="relative" > {/* "absolute or relative" */}
            <Toast bg="warning" onClose={() => setShow(false)} show={show} delay={3000} autohide >
                <Toast.Header>
                    <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>
                    This is an error message.
                </Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Error;