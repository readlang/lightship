import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { getMemberGroupsForUser } from '../slices/groupsSlice'
import { CenteredTwoColumns, Column, AddButton, CardButton, EditButton, EditCard } from "../style/styled"
import GroupForm from "./GroupForm"

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
		<CenteredTwoColumns>
			<Column>
				<h1 className="display-1" ><strong>Groups</strong></h1>
				<AddButton variant="outline-primary" onClick={()=>setFormType(true)} ><h4> Add New Group</h4></AddButton>
        {groups.map(group=>(
          <div style={{position: 'relative'}} key={group.id}>
            <CardButton variant="outline-secondary" onClick={() => navigate(`/groups/${group.id}`)}>
              <h4 style={{display: "inline"}}> {group.group_name} </h4>
              <h6>{`${group.description}`}</h6>
            </CardButton>
            
            <EditButton variant="outline-danger" onClick={()=>setFormType(group)}>Edit</EditButton>
          </div>
        )) }
      </Column>
			
			<Column>
          {formType ? <EditCard> <GroupForm group={formType} setFormType={setFormType} /> </EditCard> : null}
			</Column>
		</CenteredTwoColumns>
	)
}

export default GroupPage;