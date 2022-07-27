import {useState} from "react"
import {useDispatch} from "react-redux"
import { createTrack, editTrack } from '../slices/tracksSlice'
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";
//import styled from "styled-components";

function TrackForm({track}) {
	const dispatch = useDispatch()
	const [title, setTitle] = useState(track.title ? track.title : "") //////////////////////// conditional "" or track.title 

	console.log(track)

	function handleSubmit(event) {
		event.preventDefault()
		console.log(track)
		if (track.id) {
			dispatch(editTrack()) //////////////////////
		} else {
			dispatch(createTrack()) //////////////////////
		}
	}

	return(
		
		<Form onSubmit={handleSubmit} >
			<Form.Label>Edit Details</Form.Label>
		
			<Form.Group className="mb-3" >
				<Form.Control type="input" placeholder="Title"
				value={title} onChange={e=>setTitle(e.target.value)} />
			</Form.Group>

			<Form.Group className="mb-3" >
				<Form.Control type="input" placeholder="Title"
				value={title} onChange={e=>setTitle(e.target.value)} />
			</Form.Group>

			<Form.Group className="mb-3" >
				<Form.Control type="input" placeholder="Title"
				value={title} onChange={e=>setTitle(e.target.value)} />
			</Form.Group>

			<Button variant="outline-primary" type="submit">Save</Button>
		</Form>

			
	)
}

export default TrackForm;