import {Switch, Route} from "react-router-dom" // version 5
import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {userSessionLogIn} from '../slices/userSlice'

import UserPage from "./UserPage"
import NavBar from "./NavBar"
import Home from "./Home"

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

          <Route exact path="/counter">
            <>Hello</>
          </Route>

        </Switch>
      </>
    )
  }
}

export default App;