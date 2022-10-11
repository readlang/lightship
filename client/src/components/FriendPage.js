import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack"
import {Background, Page, Card, EditButton, BackButton} from "../style/styled"
import {getRelationshipsForUser, createRelationship, deleteRelationship } from "../slices/relationshipsSlice"
import {loadErrors} from "../slices/errorsSlice"

import accountLogo from "../assets/profile_icon.png"

const NewFriendArea = styled(Stack)`
    border: 1px solid #6c757d;
    border-radius: 8px;
    background-color: hsl(0, 0%, 98%);
    padding: 8px;
`
const Img = styled.img`
  object-fit: cover;
  width: 70px;
  height: 70px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 15px;
`

function FriendPage() {
    const user = useSelector((state)=>state.user.value)
    const relationships = useSelector((state)=>state.relationships.userRelationships)
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getRelationshipsForUser(user.id))
    },[dispatch, user.id])

    function handleSubmit() {
        if (username.trim() !== "") {
            fetch(`/users/search/${username.trim()}`)
            .then(resp => resp.json())
            .then(data=>{
                data ? dispatch(createRelationship(user.id, data.id)) : dispatch(loadErrors(["The friend search didn't find anyone. Try again."]))
            })
        }
        console.log(username)
        setUsername("")
    }

    console.log(relationships)

    return(
        <Background>
            <Page>
                <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/`) } >Back</BackButton>
                <h1 className="display-1" ><strong>Friends</strong></h1>
                <hr/>
                <p>Friends can help you stay on track with your goals.  In this context, friends act as "accountability buddies."</p>
                <NewFriendArea direction="horizontal" gap={3}>
                    <Form.Control className="me-auto" placeholder="Add a friend by username" 
                        value={username} onChange={e => setUsername(e.target.value)} />
                    <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
                    <div className="vr" />
                    <Button variant="outline-danger" onClick={()=>setUsername("")} >Reset</Button>
                </NewFriendArea>

                {relationships.map(rela =>(
                    <Card style={{position: 'relative'}} key={rela.id}>
                        {rela.friend_profile_image ? <Img src={rela.friend_profile_image} /> : <Img src={accountLogo} /> }
                        &emsp;
                        <div style={{display: "inline-block"}}>
                            <em><small> username:</small></em>
                            <h5 >{rela.friend_username}</h5>  
                        </div>
                        <EditButton variant="outline-danger" size="sm" onClick={()=>dispatch(deleteRelationship(rela.id))} >Remove</EditButton>
                    </Card>
                ))}
                
            </Page>
        </Background>
    )
}

export default FriendPage;

