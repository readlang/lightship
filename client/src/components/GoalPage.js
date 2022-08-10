import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";


const Background = styled.div`
	background-color: hsl(0, 0%, 90%);
    min-height: ${window.innerHeight -76}px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Page = styled.div`
    background-color: hsl(0, 0%, 95%);
    width: 1000px;
    min-height: ${window.innerHeight -76-100}px;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
`
const BackButton = styled(Button)`
    float: right;
    /* border-radius: 30px; */
`

function GoalPage() {
    const navigate = useNavigate()

    return(
        <Background>
            <Page>
                <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/tracks`) } >Back</BackButton>
                <h1 className="display-1" ><strong>Goals</strong></h1>
            
            </Page>
            
        </Background>
    )
}

export default GoalPage;