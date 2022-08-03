import {useState, useEffect } from "react"
import {useDispatch} from "react-redux"
import { createAction, editAction, deleteAction } from '../slices/actionsSlice'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function ActionForm({track, action, setSelectedAction}) {
	const dispatch = useDispatch()
	const [date, setDate] = useState(new Date().toLocaleString('en-CA').split(',')[0]) 
	const [number, setNumber] = useState(track.number)
	const [difficulty, setDifficulty] = useState(3)
	const [comment, setComment] = useState("")

	// console.log(track, action)
	// console.log(date, number, difficulty, comment)
	
	useEffect(()=>{
		if (action.date_time) { setDate(action.date_time.substring(0,10)) }
		if (action.number) {setNumber( action.number ) }
		setDifficulty( action.difficulty ? action.difficulty : "3" )
		setComment( action.comment ? action.comment : "" )
	},[action])

	function handleSubmit(event) {
		event.preventDefault()
		action.id ? 
		dispatch(editAction(action.id, date, number, difficulty, comment ))
		: dispatch(createAction( track.id, date, number, difficulty, comment ))  /// date is not saving currently...
	}

	function handleDelete(event) {
		event.preventDefault()
		if (action.id) { dispatch(deleteAction(action.id)) }
		console.log("delete clicked")
		setSelectedAction(false)
	}

	return(
		<>
			<Form onSubmit={handleSubmit} >
				<h4>{action ? "Edit Action Details" : "Add New Action" }</h4>
				
				<Form.Group className="mb-3" >
					<Form.Label>Action Date</Form.Label>
					<Form.Control type="date" value={date} onChange={e=>setDate(e.target.value)} />
				</Form.Group>

				<InputGroup className="mb-3" >
					<Form.Control type="number" placeholder='Quantity'
					value={number} onChange={e=>setNumber(e.target.value)} />
					<InputGroup.Text>{track.unit}</InputGroup.Text>
				</InputGroup>
				
				<Form.Group className="mb-3" >
					<Form.Label>Difficulty</Form.Label>
					<Form.Range min="1" max="5" value={difficulty} onChange={e=>setDifficulty(e.target.value)} />
				</Form.Group>

				<Form.Group className="mb-3" >
					<Form.Control as="textarea" placeholder='Comments...'
					value={comment} onChange={e=>setComment(e.target.value)} />
				</Form.Group>

				<p>action id: {action.id}</p>

				<Button variant="primary" type="submit"> {action.id ? "Save Edits" : "Save Action"} </Button> &emsp;
				<Button variant="outline-danger" type="input" onClick={handleDelete}>{action ? "Delete" : "Cancel"}</Button>
			</Form>	
		</>
	)
}

export default ActionForm;