import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import {Background, Page} from "../style/styled"

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