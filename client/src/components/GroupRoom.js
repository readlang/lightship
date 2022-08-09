import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";
import { getMessagesForGroup } from '../slices/messagesSlice'
import { getMemberGroupsForUser } from '../slices/groupsSlice'
import { getMembershipsForGroup } from "../slices/membersSlice";
import { CenteredTwoColumns, Column, AddButton, CardButton, EditButton, EditCard } from "../style/styled"
import FriendCard from "./FriendCard";
import styled from "styled-components";

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
		<>
			<h1 className="display-1" ><strong>{group.group_name}</strong></h1>
			<BigButton variant="outline-secondary" onClick={() => navigate(`/groups`) } ><strong> Back </strong></BigButton>
			<BigButton variant="outline-primary" onClick={() => navigate(`/groups`) }><h4>&emsp;Add Friendasd &emsp;</h4></BigButton>
			{members.map(member =>(<FriendCard key={member.id} member={member} /> )) }
			<CenteredTwoColumns>
				<Column>
					
					
				</Column>
				<Column>

				</Column>
			</CenteredTwoColumns>
		</>
	)
}

export default GroupRoom;