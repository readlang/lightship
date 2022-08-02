import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useParams, useNavigate } from "react-router-dom";
import { getActionsForTrack } from '../slices/actionsSlice'
import styled from "styled-components";
import Calendar from "./Calendar"
import Button from "react-bootstrap/Button";
import ActionForm from "./ActionForm"

const CenteredTwoColumns = styled.div`
  background-color: hsl(0, 0%, 97%);
  min-height: ${window.innerHeight - 76}px;
  padding: 40px 0 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Column = styled.div`
  width: 520px;
`
const BackButton = styled(Button)`
  /* width: 200px; */
  margin: 30px 10px 10px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`
// const CardButton = styled(Button)`
//   width: 500px;
//   margin: 5px 10px;
//   padding: 20px 40px;
//   color: hsl(0, 0%, 25%);
//   text-align: left;
//   background-color: rgba(255, 255, 255, 1);
//   box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
// `
// const EditButton = styled(Button)`
//   position: absolute;
//   top: 20px;
//   right: 20px;
// `
const TrackCard = styled.div`
  width: 500px;
  height: auto;
  margin: 10px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: .25rem;
  border: 1px solid #6c757d;
`



function ActionPage() {
  const dispatch = useDispatch() // to dispatch redux action
  const navigate = useNavigate() // to navigate with router
	let trackId = parseInt(useParams().trackId) // to grab a url param
  const track = useSelector((state)=>state.tracks.userTracks).find(x => x.id === trackId)
  console.log(track)
  const actions = useSelector((state)=>state.actions.trackActions)
  const [selectedAction, setSelectedAction] = useState(false)

  useEffect(()=>{
    dispatch(getActionsForTrack(trackId))
  },[dispatch, trackId])
	
// this is fragile bc if it is reloaded the redux state is lost


	return(
		<CenteredTwoColumns>
			<Column>
				<h1 className="display-1" ><strong>Actions</strong></h1>
        <BackButton variant="outline-secondary" onClick={() => navigate(`/tracks`) } ><h4> Back to Tracks </h4></BackButton> &emsp;
        <BackButton variant="outline-primary" onClick={() => navigate(`/tracks`) } ><h4>  &emsp; &emsp; Add Action &emsp; &emsp; </h4></BackButton>
        <TrackCard>
          <h4>{track.title}</h4>
          <h6>{`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`}</h6>
          <p>{track.notes}</p>
        </TrackCard>
				<Calendar/>
			</Column>
			<Column>
        <TrackCard>
          <ActionForm track={track} action={selectedAction} setSelectedAction={setSelectedAction} /> 
        </TrackCard>
				<TrackCard>
          
          {actions.map(action => <div onClick={() => setSelectedAction(action) }> {action.date_time}</div> )}
          
        </TrackCard>
				
			</Column>
		</CenteredTwoColumns>
	)
}

export default ActionPage;