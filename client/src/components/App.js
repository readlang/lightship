import {Routes, Route} from "react-router-dom" 
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSessionLogIn} from '../slices/userSlice'

import Error from "./Error"
import UserPage from "./UserPage"
import NavBar from "./NavBar"
import UserEdit from "./UserEdit"
import Home from "./Home"
import TrackPage from "./TrackPage"
import ActionPage from "./ActionPage"
import GroupPage from "./GroupPage"
import GroupRoom from "./GroupRoom"
import GoalPage from "./GoalPage"
import FriendPage from "./FriendPage"

function App() {
  const user = useSelector((state)=>state.user.value)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userSessionLogIn())
  }, [dispatch])

  if ( !user.id ) { return <> <UserPage/> <Error /> </>} 
  else { return (
    <>
      <NavBar/>
      <Error />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="goals" element={<GoalPage />} />
        <Route path="friends" element={<FriendPage />} />
        <Route path="tracks" element={<TrackPage />} />
        <Route path="tracks/:trackId/actions"  element={<ActionPage />} />
        <Route path="groups" element={<GroupPage/>} />
        <Route path="groups/:groupId"  element={<GroupRoom />} />
        <Route path="user-edit" element={<UserEdit/>} />
      </Routes>
    </>
  )}
}

export default App;