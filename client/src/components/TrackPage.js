import {useEffect} from "react"
import {useSelector, useDispatch} from "react-redux"
import { getTracksForUser, getTracksForGroup } from '../slices/tracksSlice'
// import styled from "styled-components";

function TrackPage() {
  const user = useSelector((state)=>state.user.value)
	const tracks = useSelector((state)=>state.tracks)
	const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTracksForUser(user)) // not sure you have to load this every time (once per session might be enough)
    dispatch(getTracksForGroup(4)) // this hard-codes the groupID 4 in for testing
  }, [dispatch, user])

  console.log(tracks)

	return(
		<>
			TrackPage Component
		</>
	)
}

export default TrackPage;