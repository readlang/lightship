import { useSelector} from "react-redux"
import styled from "styled-components";

const ActionItem = styled.div`
width: ${props=> props.colWidth}px;
margin: 5px 0;
border: 1px solid #6c757d;
border-radius: 8px;
padding: 3px 5px;
position: relative;
// left: ${props => (props.position === 4 ? "600px" : "0" )}; example of ternary operator...
left: ${props => (props.position * (props.colWidth + props.colGap))}px; 
`

function ActionMatrixRow({action, colGap, colWidth, unit}) {
    const tracks = useSelector((state)=>state.tracks.groupTracks)

    const index = tracks.findIndex(track => track.id === action.track_id)
    // use the tracks.length to figure out how wide each column is?
    //OR... keep the col widths fixed and scroll right.
    
    return(
        <ActionItem position={index} colGap={colGap} colWidth={colWidth}>
            <strong>{action.date_time.split('T')[0].slice(5,10).replace("-", "/")}</strong>
            &emsp; 
            <br/>
            {action.number} {unit}
            
            


        </ActionItem>
    )
}

export default ActionMatrixRow