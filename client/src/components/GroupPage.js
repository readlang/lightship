import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { getMemberGroupsForUser, createGroup, editGroup, deleteGroup } from '../slices/groupsSlice'
import { getMessagesForGroup, createMessage, editMessage, deleteMessage } from"../slices/messagesSlice";
import styled from "styled-components";
//import Calendar from "./Calendar"

const Div = styled.div`
	height: 1000px;
	display: flex;
	justify-content: center;
	align-items: center;
`

function GroupPage() {
	const dispatch = useDispatch()
	
	

	const groups = useSelector((state)=>state.groups)
	console.log(groups.memberGroups)
	
	useEffect(()=>{
		dispatch(getMessagesForGroup(3))
		dispatch(createMessage(3, 1, "This is a sample message"))
		dispatch(editMessage(51, "this is an EDITED sample message!!!"))
		dispatch(deleteMessage(52))
	},[dispatch])

	

	console.log( useSelector((state)=>state.messages.groupMessages) )

	return(
		<Div>
			<button onClick={() => dispatch(getMemberGroupsForUser( 2 )) }>get Groups For User</button>
			<button onClick={() => dispatch(createGroup( "Bug squasher", "another group", 2 )) }>add group</button>
			<button onClick={() => dispatch(editGroup( 18, "Edit name", "This has been edited")) }>edit group</button>
			<button onClick={() => dispatch(deleteGroup( 19 )) }>delete group</button>
			<button onClick={() => console.log(groups.memberGroups) }>Log state</button>
			{/* {groups.map(x=>(<div>{x.group_name}</div> ))} */}
		</Div>
	)
}

export default GroupPage;