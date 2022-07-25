import {Switch, Route} from "react-router-dom" // version 5
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSessionLogIn} from '../slices/userSlice'

import UserPage from "./UserPage"
import NavBar from "./NavBar"
import UserEdit from "./UserEdit"
import Home from "./Home"
import TrackPage from "./TrackPage"
//import ActionPage from "./ActionPage"
import GroupPage from "./GroupPage"

function App() {
  const user = useSelector((state)=>state.user.value)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(userSessionLogIn())
  }, [dispatch])

  if ( !user.id ) {
    return <UserPage/>
  } else {
    return (
      <>
        <NavBar/>
        <Switch>

          <Route exact path="/" >
            <Home/>
          </Route>

          <Route path="/goals">
            <div>goalpage</div>
          </Route>

          <Route path="/friends">
            <div>friendspage</div>
          </Route>

          <Route path="/tracks">
            <TrackPage/>
          </Route>

          <Route path="/groups">
            <GroupPage/>
          </Route>

          <Route path="/user-edit">
            <UserEdit/>
          </Route>

        </Switch>
      </>
    )
  }
}

export default App;