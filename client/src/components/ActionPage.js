import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useParams, useNavigate } from "react-router-dom";
import { getActionsForTrack } from '../slices/actionsSlice'
import { getTracksForUser } from '../slices/tracksSlice'
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
  margin: 10px 10px 0 0; 
  float: right;
  
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`
const Card = styled.div`
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
const ListItem = styled.div`
  padding: 17px 0 5px;
  min-height: 90px;
  border-top: 1px solid #8d98a3;
  cursor: pointer;
`
function ActionPage() {
  const dispatch = useDispatch() // to dispatch redux action
  const navigate = useNavigate() // to navigate with router
  const user = useSelector((state)=>state.user.value)
	let trackId = parseInt(useParams().trackId) // to grab a url param
  let track = useSelector((state)=>state.tracks.userTracks).find(x => x.id === trackId)
  console.log(track)
  const actions = useSelector((state)=>state.actions.trackActions)
  const [selectedAction, setSelectedAction] = useState(false)

  useEffect(()=>{
    dispatch(getActionsForTrack(trackId))
  },[dispatch, trackId])
	// this is fragile bc if it is reloaded the redux state is lost, which will make this crash - UPDATE: added conditional below...

  if (! track) { 
    dispatch(getTracksForUser(user))
    return(null) 
    }
  else
	return(
		<CenteredTwoColumns>
			<Column>
      <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/tracks`) } >Back to all tracks</BackButton> &emsp;
        <h1 className="display-1" ><strong>Actions</strong></h1>
        <br/>
        
        
        <Card>
          <h4>{track.title}</h4>
          <h6>{`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`}</h6>
          <p>{track.notes}</p>
        </Card>
				<Calendar track={track}/>
			</Column>

			<Column>
        <Card>
          <ActionForm track={track} action={selectedAction} setSelectedAction={setSelectedAction} /> 
        </Card>
				<Card>
          <h4>Logged Events</h4>
          {actions.length === 0 ? <p><i>Log a few actions and they will show up here...</i></p> : null }
          {actions.map(action => <ListItem onClick={() => setSelectedAction(action) } key={action.id}> 
            <h6>{ action.date_time.split('T')[0].slice(5,10).replace("-", "/") } &emsp; &emsp; {action.number} {track.unit} &emsp; &emsp; difficulty: {action.difficulty ? action.difficulty : null}  </h6>
            <p>comments: {action.comment} &emsp; &emsp; action id: {action.id}</p>
          </ListItem> )}
        </Card>
			</Column>
		</CenteredTwoColumns>
	)
}
export default ActionPage;