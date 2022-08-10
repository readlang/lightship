
import {useSelector, useDispatch} from "react-redux"
import { getMessagesForGroup, createMessage, editMessage, deleteMessage } from '../slices/messagesSlice'
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
`
const NewMessageArea = styled(Form)`
  margin: 15px 0 0 0;
  display: flex;
`
const LeftTextBubble = styled.div`
  /* background: hsl(175, 5%, 80%); */
  background: linear-gradient(0deg, hsl(175, 5%, 80%) 0%, hsl(175, 5%, 90%) 100%);
  border-radius: 10px;
  margin: 3px 50px 0 0;
  padding: 3px 8px;
`
const RightTextBubble = styled(LeftTextBubble)`
  //background-color: hsl(175, 65%, 52%);
  background: linear-gradient(0deg, hsl(175, 80%, 50%) 0%, hsl(175, 100%, 70%) 100%);
  margin: 3px 0 0 50px;
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
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMessagesForGroup(groupId))
  }, [dispatch, groupId ])

  const messages = useSelector((state)=>state.messages.groupMessages)

  const [newMessage, setNewMessage] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(createMessage(groupId, user.id, newMessage))
    setNewMessage("")
  }

  return(
    <Window>
      <Wrapper>
        <ShowMessages>
          {messages.map(message=>( message.user_id === user.id ?  
            <RightTextBubble key={message.id}><small> {message.user_id} </small><br/> {message.text}</RightTextBubble> : 
            <LeftTextBubble key={message.id}><small> {message.user_id} </small><br/> {message.text}</LeftTextBubble>
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