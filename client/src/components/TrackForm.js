import {useSelector, useDispatch} from "react-redux"
import { createTrack } from '../slices/tracksSlice'
import styled from "styled-components";

const CardButton = styled.div`
  width: 500px;
  margin: 5px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

function TrackForm({track}) {
	// const user = useSelector((state)=>state.user.value)
	const dispatch = useDispatch()

	console.log(track)

	return(
		<>
			TrackForm Component
		</>
	)
}

export default TrackForm;