import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { getMessagesForGroup } from '../slices/messagesSlice'
import { getMemberGroupsForUser } from '../slices/groupsSlice'
import { getMembershipsForGroup } from "../slices/membersSlice";
import { Column, AddButton, CardButton, EditButton, EditCard } from "../style/styled"
import Button from "react-bootstrap/Button";
import FriendCard from "./FriendCard";
import styled from "styled-components";
import ChatWindow from "./ChatWindow";
import TracksWindow from "./TracksWindow";

const Background = styled.div`
	background-color: hsl(0, 0%, 88%);
    min-height: ${window.innerHeight -76}px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Page = styled.div`
    background-color: hsl(0, 0%, 98%);
    width: 1300px;
    min-height: ${window.innerHeight -76-100}px;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

`
const TracksColumn = styled.div`
	width: 800px;
	height: 900px;
	display: inline-block;
	margin: 20px 20px 0 0;
`
const ChatColumn = styled.div`
	width: 400px;
	height: 900px;
	display: inline-block;
	margin: 20px 0px 0px 20px;
`
const BackButton = styled(Button)`
  float: right;
  background-color: rgba(255, 255, 255, 1);
`


const BigButton = styled(AddButton)`
	width: auto;
`

function GroupRoom() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const user = useSelector((state)=>state.user.value)
	let groupId = parseInt(useParams().groupId)
	let group = useSelector((state)=>state.groups.memberGroups).find(x => x.id === groupId)

	
	const members = useSelector((state)=>state.members.groupMembers)
	console.log(members)

	useEffect(()=>{
		dispatch(getMessagesForGroup(groupId))
		dispatch(getMembershipsForGroup(groupId))
	},[dispatch,groupId])
	
	if (! group) {
		dispatch(getMemberGroupsForUser(user.id))
		return(null)
	} else
	return(
		<Background>
			<Page>
				<div>
					<BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/groups`) } > Back to all groups </BackButton>
					<h1 className="display-1" ><strong>{group.group_name}</strong></h1>
				</div>

				<div>
					<BigButton variant="outline-primary" onClick={() => navigate(`/groups`) }><h4>Add Friend</h4></BigButton>
					{members.map(member =>(<FriendCard key={member.id} member={member} /> )) }
				</div>
				<TracksColumn> <TracksWindow/> </TracksColumn>
				<ChatColumn> <ChatWindow/> </ChatColumn>

			</Page>
			
			
				
			
		</Background>
	)
}

export default GroupRoom;