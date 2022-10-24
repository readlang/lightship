
import {useSelector, useDispatch} from "react-redux"
import { getMessagesForGroup, createMessage } from '../slices/messagesSlice' //deleteMessage
import styled from "styled-components";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

const Window = styled.div`
	background-color: hsl(0, 0%, 100%);
  height: 100%;
  border: 1px solid #6c757d;
  border-radius: 8px;
  padding: 15px;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  overflow-y: scroll;
  height: 815px;
`
const ShowMessages = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-start;
`

const LeftTextBubble = styled.div`
  background: linear-gradient(0deg, hsl(175, 5%, 80%) 0%, hsl(175, 5%, 90%) 100%);
  border-radius: 10px 10px 10px 3px;
  margin: 3px 50px 0 0;
  padding: 3px 8px;
`
const RightTextBubble = styled(LeftTextBubble)`
  background: linear-gradient(0deg, hsl(175, 80%, 50%) 0%, hsl(175, 100%, 70%) 100%);
  border-radius: 10px 10px 4px 10px;
  text-align: right;
  margin-left: auto;
  position: relative;
  left: 50px;
`
const NewMessageArea = styled(Form)`
  margin: 15px 0 0 0;
  display: flex;
`
const Input = styled(Form.Control)`
  width: 400px;
  margin: 0 10px 0 0;
`
const SendButton = styled(Button)`
  display: inline-block;
`


function GroupChatWindow({groupId}) {
  const user = useSelector((state)=>state.user.value)
  const members = useSelector((state)=>state.members.groupMembers)
  const messages = useSelector((state)=>state.messages.groupMessages)
  const dispatch = useDispatch()

  useEffect(()=>{ 
    dispatch(getMessagesForGroup(groupId));
    let interval = setInterval(()=>{ dispatch(getMessagesForGroup(groupId)); console.log("fetch messages") }, 3000) // refresh speed of chat controlled here
    return()=> { clearInterval(interval) }
  }, [dispatch, groupId])

  const [newMessage, setNewMessage] = useState("")

  function userNameLookup(user_id) {
    const index = members.findIndex(member => member.user_id === user_id)
    if (index === -1) {
      return "unknown user"
    }
    return members[index].user.username
  }

  function handleSubmit(event) {
    event.preventDefault()
    if ( newMessage.trim().length > 0 ) dispatch(createMessage(groupId, user.id, newMessage))
    setNewMessage("")
  }

  return(
    <Window>
      <Wrapper>
        <ShowMessages>
          {messages.map(message=>( message.user_id === user.id ?  
            <RightTextBubble key={message.id}>{message.text}</RightTextBubble> : 
            <LeftTextBubble key={message.id}><small style={{color: "gray"}} > {userNameLookup(message.user_id)} </small><br/> {message.text}</LeftTextBubble>
          ))}
        </ShowMessages>
      </Wrapper>

      <NewMessageArea onSubmit={handleSubmit}>
        <Input type="input" value={newMessage} onChange={e => setNewMessage(e.target.value)}/>
        <SendButton  type="submit"> Send </SendButton>
      </NewMessageArea>
          
    </Window>
  )
}

export default GroupChatWindow;