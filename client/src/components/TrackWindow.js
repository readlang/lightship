import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import { useEffect } from "react";
import { getTracksForGroup } from "../slices/tracksSlice";
import { getActionsForGroup } from "../slices/actionsSlice"
import ActionMatrixRow from "./ActionMatrixRow"
import GroupAddTrackModal from "./GroupAddTrackModal"

const Window = styled.div`
	background-color: hsl(0, 0%, 100%);
    height: 100%;
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 30px;
`
const TrackList = styled.div`
    display: flex;
    justify-content: space-between;
`
const TrackItem = styled.div`
    background-color: hsl(0, 0%, 100%);
    width: ${props => props.colWidth}px;
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 3px;
`
const SmallText =styled.small`
    font-size: .6em;
`
const ActionList = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 650px;  
    width: 750px;
`



function TrackWindow({groupId}) {
    const dispatch = useDispatch()
    const members = useSelector((state)=>state.members.groupMembers)
    const tracks = useSelector((state)=>state.tracks.groupTracks)
    const actions = useSelector((state)=>state.actions.groupActions)
    const colGap = 8
    const colWidth = (738 + colGap) / tracks.length - colGap

    useEffect(()=>{
        dispatch(getTracksForGroup(groupId))
        dispatch(getActionsForGroup(groupId))
    }, [dispatch, groupId])

    function userNameLookup(user_id) {
        const index = members.findIndex(member => member.user_id === user_id)
        if (index === -1) { return "unknown user" }
        else return members[index].user.username
    }

    function unitLookup(track_id) {
        if (tracks.find(track => track.id === track_id)) {
            if (tracks.find(track => track.id === track_id).unit) { 
            return tracks.find(track => track.id === track_id).unit
            } 
        } 
        return "unit"
    }

    console.log(tracks)
    console.log(colWidth)

    return(
        <Window>
          
            <h4 style={{display: "inline"}} ><strong>Group Tracks & Actions</strong></h4>
            <GroupAddTrackModal groupId={groupId} />
            
            
            <br/><br/>
            <TrackList>
                {tracks.map(track =>(<TrackItem key={track.id} colWidth={colWidth}><h6> {userNameLookup(track.user_id)}</h6> 
                <span>{track.title} </span><br/>
                <SmallText>    {`${track.activity} ${track.minmax} ${track.number} ${track.unit} ${track.interval}`} </SmallText>
                </TrackItem>))}
            </TrackList>
            <hr/>
            <ActionList>
                { actions.map(action =>( <ActionMatrixRow key={action.id} action={action} 
                    colGap={colGap} colWidth={colWidth} unit={unitLookup(action.track_id)} />)) }
            </ActionList>
            
        </Window>
    )
}

export default TrackWindow;