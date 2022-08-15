import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack"
import {Background, Page} from "../style/styled"



const BackButton = styled(Button)`
    float: right;
`
const NewFriendArea = styled(Form)`
  margin: 15px 0 0 0;
  display: flex;
  align-items: flex-end;
  border: 1px solid #6c757d;
  border-radius: 8px;
  padding: 5px;
  width: 800px;
  background-color: hsl(0, 0%, 100%);
`
const Input = styled(Form.Control)`
  width: 200px;
  margin: 0 10px 0 0;
`
const SendButton = styled(Button)`
  display: inline-block;
`


function FriendPage() {
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        console.log(username)
    }


    return(
        <Background>
            <Page>
                <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/tracks`) } >Back</BackButton>
                <h1 className="display-1" ><strong>Friends</strong></h1>
                <hr/>
                
                <NewFriendArea onSubmit={handleSubmit}>
                    <Form.Label>&emsp; Enter Friend username (must be exact match) &emsp; </Form.Label>
                    <Input type="input" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
                    <SendButton variant="outline-primary" type="submit"> Add Friend </SendButton> &nbsp;
                        <div className="vr" /> &nbsp;
                    <Button variant="outline-danger">Reset</Button>
                </NewFriendArea>

                <br/>

                <Stack direction="horizontal" gap={3}>
                    <Form.Control className="me-auto" placeholder="Add your friend's username here (must be an exact match)" />
                    <Button variant="secondary">Submit</Button>
                    <div className="vr" />
                    <Button variant="outline-danger">Reset</Button>
                </Stack>
                
            </Page>
            
        </Background>
    )
}

export default FriendPage;

