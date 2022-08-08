import {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import { createGroup, editGroup, deleteGroup } from '../slices/groupsSlice'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function GroupForm({group, setFormType}) {
	const user = useSelector((state)=>state.user.value)
	const dispatch = useDispatch()
	
	const [name, setName] = useState( "" )
	const [description, setDescription] = useState("")

	useEffect(()=>{
		setName( group.group_name ? group.group_name : "" )
		setDescription( group.description ? group.description : "" )
	}, [group])

	function handleSubmit(event) {
		event.preventDefault()
		group.id ? 
		dispatch(editGroup( group.id, name, description )) 
		: dispatch(createGroup( name, description, user.id )) 
		setFormType(false)
	}

	function handleDelete() {
		dispatch(deleteGroup(group.id)) 
		setFormType(false)
	}

	return(
		<>
			<Form onSubmit={handleSubmit} >
				<h4>{group.id ? "Edit Group Details" : "Add New Group" }</h4>
				
				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Group Name'
					value={name} onChange={e=>setName(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Group Description'
					value={description} onChange={e=>setDescription(e.target.value)} />
				</Form.Group>

				<Button variant="primary" type="submit">{group.id ? "Save Group Edits" : "Save New Group"}</Button> &emsp;
				<Button variant="outline-secondary" type="input" onClick={()=> setFormType(false)}> Cancel </Button> 
				&emsp; &emsp; &emsp; &emsp; &emsp;
				{group.id ? <Button variant="outline-danger" type="input" onClick={handleDelete}> Delete </Button> : null}
			</Form>	
		</>
	)
}

export default GroupForm;