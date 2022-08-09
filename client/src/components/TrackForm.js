import {useState, useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import { createTrack, editTrack, deleteTrack } from '../slices/tracksSlice'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TrackForm({track, setFormType}) {
	const user = useSelector((state)=>state.user.value)
	const dispatch = useDispatch()
	
	const [title, setTitle] = useState("") 
	const [activity, setActivity] = useState("")
	const [minmax, setMinmax] = useState("")
	const [number, setNumber] = useState(0)
	const [unit, setUnit] = useState("")
	const [interval, setInterval] = useState("")
	const [notes, setNotes] = useState("")

	useEffect(()=>{
		setTitle( track.title ? track.title : "" )
		setActivity( track.activity ? track.activity : "" )
		setMinmax( track.minmax ? track.minmax : "" )
		setNumber( track.number ? track.number : "" ) /// is this saving as number or string?
		setUnit( track.unit ? track.unit : "" )
		setInterval( track.interval ? track.interval : "" )
		setNotes ( track.notes ? track.notes : "" )
	},[track])

	function handleSubmit(event) {
		event.preventDefault()
		track.id ? 
		dispatch(editTrack(track.id, title, activity, minmax, number, unit, interval, notes )) //group id?
		: dispatch(createTrack( user.id, title, activity, minmax, number, unit, interval, notes )) 
		setFormType(false)
	}

	function handleDelete() {
		if (track.id) { dispatch(deleteTrack(track.id)) }
		setFormType(false)
	}

	return(
		<>
			<Form onSubmit={handleSubmit} >
				<h4>{track.id ? "Edit Track Details" : "Add New Track" }</h4>
				
				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Track Name ("Exercise")'
					value={title} onChange={e=>setTitle(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Activity ("Run")'
					value={activity} onChange={e=>setActivity(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Select value={minmax} onChange={e=>setMinmax(e.target.value)} >
						<option value="at least">at least</option>
						<option value="at most">at most</option>
						<option value="exactly">exactly</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Number ("3")'
					value={number} onChange={e=>setNumber(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Control type="input" placeholder='Unit ("miles" / "times")'
					value={unit} onChange={e=>setUnit(e.target.value)} />
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Select value={interval} onChange={e=>setInterval(e.target.value)} >
						<option value="per day">per day</option>
						<option value="per week">per week</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className="mb-3" >
					<Form.Control as="textarea" placeholder='Notes...'
					value={notes} onChange={e=>setNotes(e.target.value)} />
				</Form.Group>
				<Button variant="primary" type="submit">{track.id ? "Save Track Edits" : "Save New Track"}</Button> &emsp;
				<Button variant="outline-secondary" type="input" onClick={()=> setFormType(false)}> Cancel </Button> &emsp; &emsp; &emsp; &emsp; &emsp; &ensp;
				{track.id ? <Button variant="outline-danger" type="input" onClick={handleDelete}> Delete </Button> : null}
			</Form>	
		</>
	)
}

export default TrackForm;