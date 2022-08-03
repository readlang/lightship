import {Routes, Route} from "react-router-dom" 
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSessionLogIn} from '../slices/userSlice'
// import { getTracksForUser } from '../slices/tracksSlice'

import UserPage from "./UserPage"
import NavBar from "./NavBar"
import UserEdit from "./UserEdit"
import Home from "./Home"
import TrackPage from "./TrackPage"
import ActionPage from "./ActionPage"
import GroupPage from "./GroupPage"

function App() {
  const user = useSelector((state)=>state.user.value)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userSessionLogIn())
    
  }, [dispatch])

  // useEffect(() => {
  //   dispatch(getTracksForUser(user))
  // }, [dispatch, user])

  if ( !user.id ) { return <UserPage/>} 
  else { return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="goals" element={<div>goalpage</div>} />
        <Route path="friends" element={<div>friendspage</div>} />
        <Route path="tracks" element={<TrackPage />} />
        <Route path="tracks/:trackId/actions"  element={<ActionPage />} />
        <Route path="groups" element={<GroupPage/>} />
        <Route path="user-edit" element={<UserEdit/>} />
      </Routes>
    </>
  )}
}

export default App;