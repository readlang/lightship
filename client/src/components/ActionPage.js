import {useEffect, useState} from "react"
import {useSelector, useDispatch} from "react-redux"
import {useParams, useNavigate } from "react-router-dom";
import { getActionsForTrack } from '../slices/actionsSlice'
import { getTracksForUser } from '../slices/tracksSlice'
import styled from "styled-components";
import Calendar from "./Calendar"
import ActionForm from "./ActionForm"
import {Background, Page, TwoColumn, Card, BackButton} from "../style/styled.js"

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

  if (! track) { 
    dispatch(getTracksForUser(user))
    return(null) 
    }
  else
	return(
    <Background>
      <Page>
        <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/tracks`) } >Back to all tracks</BackButton> 
        <h1 className="display-1" ><strong>Actions</strong></h1>
        <hr/>
        <p>Try to log your actions everyday.</p>
        <TwoColumn>
          <div>
            <Card>
              <h4>{track.title}</h4>
              <h6>{`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`}</h6>
              <p>{track.notes}</p>
            </Card>
            <Calendar track={track}/>
          </div>

          <div>
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
          </div>
        </TwoColumn>
      </Page>
    </Background>
	)
}
export default ActionPage;