import {useState, useEffect } from "react"
import {useDispatch} from "react-redux"
import { createAction, editAction, deleteAction } from '../slices/actionsSlice'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ActionForm({trackId, action, setSelectedAction}) {
	const dispatch = useDispatch()
	const [date, setDate] = useState("") 
	const [number, setNumber] = useState(0)
	const [difficulty, setDifficulty] = useState("")
	const [comment, setComment] = useState("")

	console.log(trackId, action)
	

		useEffect(()=>{
			setDate( action.date_time ? action.date_time : "" )
			setNumber( action.number ? action.number : "" ) /// is this saving as number or string?
			setDifficulty( action.difficulty ? action.difficulty : "" )
			setComment( action.comment ? action.comment : "" )
		},[action])


	function handleSubmit(event) {
		event.preventDefault()
		action.id ? 
		dispatch(editAction(trackId, date, number, difficulty, comment ))
		: dispatch(createAction( trackId, date, number, difficulty, comment )) 
	}

	function handleDelete() {
		if (action.id) { dispatch(deleteAction(action.id)) }
		setSelectedAction(false)
	}

	return(
		<>
			<Form onSubmit={handleSubmit} >
				<h4>{action ? "Edit Action Details" : "Add New Action" }</h4>
				
				<Form.Group className="mb-3" >
					<Form.Control type="date" placeholder='Action Name ("Exercise")'
					value={date} onChange={e=>setDate(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Activity ("Run")'
					value={number} onChange={e=>setNumber(e.target.value)} />
				</Form.Group>
				
				<Form.Group className="mb-3" >
					<Form.Label>Difficulty</Form.Label>
					<Form.Range />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Control as="textarea" placeholder='Comments...'
					value={comment} onChange={e=>setComment(e.target.value)} />
				</Form.Group>

				<Button variant="primary" type="submit">Save Track</Button> &emsp;
				<Button variant="outline-danger" type="input" onClick={handleDelete}>{action ? "Delete" : "Cancel"}</Button>
			</Form>	
		</>
	)
}

export default ActionForm;