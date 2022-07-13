import styled from "styled-components";
import Button from "react-bootstrap/Button";

function Component() {

    const Wrapper = styled.section` // this is the standard syntax: styled.section
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

    const SButton = styled(Button)` // to inherit styling, use this syntax: styled(Button)
        background-color: pink;
        border-color: pink;
        color: hotpink;
        
    `;

    return(
        <div>
            <Wrapper>
                This is a component!
                <button> This is a html button. </button>
                <Button> This is a Bootstrap button. </Button>
                <SButton> This is a Styled Components Button. </SButton>
            </Wrapper>
        </div>
    )
}

export default Component;