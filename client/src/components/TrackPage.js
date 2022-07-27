import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { getTracksForUser, getTracksForGroup } from '../slices/tracksSlice'
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import TrackForm from "./TrackForm"

const CenteredTwoColumns = styled.div`
  background-color: hsl(0, 0%, 97%);
  min-height: ${window.innerHeight - 76}px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const Column = styled.div`
  width: 520px;
`
const AddTrackButton = styled(Button)`
  width: 500px;
  margin: 30px 10px 10px;
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 30px;
`
const CardButton = styled(Button)`
  width: 500px;
  margin: 5px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  text-align: left;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`
const EditCard = styled.div`
  width: 500px;
  height: auto;
  margin: 95px 10px;
  padding: 20px 40px;
  color: hsl(0, 0%, 25%);
  // text-align: left;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: .25rem;
  border: 1px solid #6c757d;
`

function TrackPage() {
  const [formType, setFormType] = useState(false) 
  const user = useSelector((state)=>state.user.value)
	const userTracks = useSelector((state)=>state.tracks.userTracks)
	const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTracksForUser(user)) // not sure you have to load this every time (once per session might be enough)
    dispatch(getTracksForGroup(4)) // this hard-codes the groupID 4 in for testing
  }, [dispatch, user])

	return(
    <CenteredTwoColumns>
      <Column>
        <AddTrackButton variant="outline-primary" onClick={() =>setFormType(true)} ><h4>&emsp;Add New Track&emsp;</h4></AddTrackButton>

        {userTracks.map(track=>( 
          <CardButton variant="outline-secondary" key={track.id} onClick={()=>setFormType(track)}> {/*this needs to be changed.. */}
          <h4 style={{display: "inline"}}>{track.title}</h4>
          <h6>{`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`}</h6>
          <div style={{float: "right"}} className="btn btn-outline-danger" onClick={()=>setFormType(track)}>Edit</div>
          <p>{track.notes}</p>
          </CardButton> 
        ))}
      </Column>
          
      <Column>
        {formType ? <EditCard> <TrackForm track={formType} setFormType={setFormType}/> </EditCard> : null }   
      </Column>
    </CenteredTwoColumns>
	)
}

export default TrackPage;