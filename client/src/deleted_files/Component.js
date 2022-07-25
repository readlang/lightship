import styled from "styled-components";
import Button from "react-bootstrap/Button";

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

function Component() {



    return(
        <div>
            <Wrapper>
                <SButton>asdf</SButton>
            </Wrapper>
        </div>
    )
}

export default Component;