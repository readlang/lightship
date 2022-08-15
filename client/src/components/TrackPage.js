import {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom";
import { getTracksForUser } from '../slices/tracksSlice'
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import TrackForm from "./TrackForm"

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
const AddButton = styled(Button)`
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
const EditButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`
const EditCard = styled.div`
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

function TrackPage() {
  const [formType, setFormType] = useState(false) 
  const user = useSelector((state)=>state.user.value)
	const userTracks = useSelector((state)=>state.tracks.userTracks)
	const dispatch = useDispatch()
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getTracksForUser(user)) // not sure you have to load this every time (once per session might be enough)
  }, [dispatch, user])

	return(
    <CenteredTwoColumns>
      <Column>
        <h1 className="display-1" ><strong>Tracks+Actions</strong></h1>
        <AddButton variant="outline-primary" onClick={() =>setFormType(true)} ><h4>&emsp; Add New Track &emsp;</h4></AddButton>

        {userTracks.map(track=>( 
          <div style={{position: 'relative'}} key={track.id} >
            <CardButton variant="outline-secondary"  onClick={() => navigate(`/tracks/${track.id}/actions`) }  > 
              <h4 style={{display: "inline"}}>{track.title}</h4>
              <h6>{`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`}</h6>
              <p>{track.notes}</p>
            </CardButton> 

            <EditButton variant="outline-danger" onClick={()=>setFormType(track) }>Edit</EditButton>
          </div>
        ))}
      </Column>
          
      <Column>
        {formType ? <EditCard> <TrackForm track={formType} setFormType={setFormType}/> </EditCard> : null }   
      </Column>
    </CenteredTwoColumns>
	)
}

export default TrackPage;