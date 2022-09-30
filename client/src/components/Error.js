import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import {loadErrors} from "../slices/errorsSlice"

import Toast from "react-bootstrap/Toast";
import ToastContainer from 'react-bootstrap/ToastContainer';

const Container = styled(ToastContainer)`
    margin: 25vh 0 0 0;
`

function Error() {
    const errors = useSelector((state)=>state.errors.value)
    const [show, setShow] = useState(true);
    const dispatch = useDispatch()

    useEffect(()=>{
        setShow(true) 
    }, [errors])

    function handleClose() {
        setShow(false)
        dispatch(loadErrors([]))
    }
    
    if ( errors.length ) {
        return(
            <Container onClick={handleClose} style={{zIndex: "9999"}} position="top-center" containerPosition="absolute" > {/* "absolute or relative" */}
                <Toast bg="light" onClose={handleClose} show={show} delay={10000} autohide >
                    <Toast.Header>
                        <strong className="me-auto">⚠️ LightShip Error Notice </strong>
                    </Toast.Header>
                    <Toast.Body>
                        {errors.map(message => <p key={message}> &bull; {message} </p> )}
                    </Toast.Body>
                </Toast>
            </Container>
        )
    } else { return null }
}

export default Error;