import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack"
import {Background, Page} from "../style/styled"
import {getRelationshipsForUser, createRelationship, deleteRelationship } from "../slices/relationshipsSlice"



const BackButton = styled(Button)`
    float: right;
`

const NewFriendArea = styled(Stack)`
    border: 1px solid #6c757d;
    border-radius: 8px;
    background-color: hsl(0, 0%, 98%);
    padding: 8px;
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
        if (username !== "") {
            fetch(`/users/search/${username}`)
            .then(resp => resp.json())
            .then(data=>{
                dispatch(createRelationship(user.id, data.id)) // this is expecting a userID, not a username
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
                
                <NewFriendArea direction="horizontal" gap={3}>
                    <Form.Control className="me-auto" placeholder="Add a friend by username (must be an exact match)" 
                        value={username} onChange={e => setUsername(e.target.value)} />
                    <Button variant="secondary" onClick={handleSubmit}>Submit</Button>
                    <div className="vr" />
                    <Button variant="outline-danger" onClick={()=>setUsername("")} >Reset</Button>
                </NewFriendArea>

                {relationships.map(rela =>(
                    <h4 key={rela.id}>{rela.friend_username}</h4>
                ))}
                
            </Page>
        </Background>
    )
}

export default FriendPage;

