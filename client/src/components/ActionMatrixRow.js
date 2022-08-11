import { useSelector} from "react-redux"
import styled from "styled-components";

const ActionItem = styled.div`
width: 140px;
margin: 3px;
border: 1px solid #6c757d;
border-radius: 8px;
padding: 3px;
position: relative;
/* left: ${props => (props.position === 4 ? "600px" : "0" )}; */
left: ${props => (props.position * 148)}px; 
`

function ActionMatrixRow({action}) {
    const tracks = useSelector((state)=>state.tracks.groupTracks)

    const index = tracks.findIndex(track => track.id === action.track_id)
    // use the tracks.length to figure out how wide each column is?
    //OR... keep the col widths fixed and scroll right.
    
    return(
        <ActionItem position={index}>
            {action.date_time.split('T')[0].slice(5,10).replace("-", "/")} &emsp; {action.track_id}
            &emsp; 
            {index}


        </ActionItem>
    )
}

export default ActionMatrixRow