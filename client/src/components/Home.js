import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import {Background, Page} from "../style/styled"

const Title = styled.div`
    text-align: center;
`

function Home(){
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return(
        <Background>
            <Page>
                <Title>
                <h1 className="display-1" ><strong>Welcome to LightShip!</strong></h1>
                </Title>

                <br/><hr/><br/>
                <p>LightShip helps you stay on track with what's important to you.  It's important to have good naviation in stormy seas. <br/> 
                Please start by defining a few goals.</p>
            </Page>
            
        </Background>
    )
}

export default Home