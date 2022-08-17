import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom";

import { getMemberGroupsForUser } from '../slices/groupsSlice'
import { getMembershipsForGroup } from "../slices/membersSlice";
import Button from "react-bootstrap/Button";
import FriendCard from "./FriendCard";
import styled from "styled-components";
import GroupChatWindow from "./GroupChatWindow";
import TrackWindow from "./TrackWindow";
import GroupMemberModal from "./GroupMemberModal";

const Background = styled.div`
	background-color: hsl(0, 0%, 88%);
    min-height: ${window.innerHeight -76}px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Page = styled.div`
    background-color: hsl(0, 0%, 98%);
    width: 1400px;
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
	width: 500px;
	height: 900px;
	display: inline-block;
	margin: 20px 0px 0px 20px;
`
const BackButton = styled(Button)`
  	float: right;
	background-color: rgba(255, 255, 255, 1);
`
const FriendArea = styled.div`
	display: flex;
	align-items: center;
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
					<h1 className="display-1" style={{display: "inline"}}><strong>{group.group_name}</strong></h1>
					<BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/groups`) } > Back to all groups </BackButton>
					<h6>{group.description}</h6>
					<hr/>
				</div>
				<span>Group Members</span>
				<FriendArea>
					<GroupMemberModal groupId={groupId} />
					{members.map(member =>(<FriendCard key={member.id} member={member} /> )) }
				</FriendArea>
				<div style={{display: 'flex'}}>
				<TracksColumn> <TrackWindow groupId={groupId} /> </TracksColumn>
				<ChatColumn> <GroupChatWindow groupId={groupId} /> </ChatColumn>
				</div>
			</Page>
			
			
				
			
		</Background>
	)
}

export default GroupRoom;