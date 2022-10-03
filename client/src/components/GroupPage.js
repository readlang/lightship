import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { getMemberGroupsForUser } from '../slices/groupsSlice'
import { Background, Page, TwoColumn, CardButton, EditButton, Card } from "../style/styled"
import GroupForm from "./GroupForm"
import Button from "react-bootstrap/Button"

function GroupPage() {
	const [formType, setFormType] = useState(false)
	const user = useSelector((state)=>state.user.value)
	const groups = useSelector((state)=>state.groups.memberGroups)
  	const dispatch = useDispatch()
  	const navigate = useNavigate()
	
	useEffect(()=>{
		dispatch(getMemberGroupsForUser(user.id))
	}, [dispatch, user.id])

	return(
		<Background>
			<Page>
				<h1 className="display-1" ><strong>Groups</strong></h1>
				<hr/>
				<p>Create groups and add friends for accountability!</p>
				<TwoColumn>
					<div>
						
						<Button variant="outline-primary" onClick={()=>setFormType(true)} > Add New Group</Button>
						{groups.map(group=>(
							<div style={{position: 'relative'}} key={group.id}>
							<CardButton variant="outline-secondary" onClick={() => navigate(`/groups/${group.id}`)}>
							<h4 style={{display: "inline"}}> {group.group_name} </h4>
							<h6>{`${group.description}`}</h6>
							</CardButton>
							
							<EditButton variant="outline-danger" onClick={()=>setFormType(group)}>Edit</EditButton>
							</div>
						)) }
					</div>
					
					<div>
						{formType ? <Card> <GroupForm group={formType} setFormType={setFormType} /> </Card> : null}
					</div>
				</TwoColumn>
			</Page>
		</Background>
	)
}

export default GroupPage;