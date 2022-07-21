import {Switch, Route} from "react-router-dom" // version 5
import {useState, useEffect} from "react"

import UserPage from "./UserPage"
import NavBar from "./NavBar"
import Home from "./Home"

function App() {
  const [user, setUser] = useState({})
  
  useEffect(() => {
    fetch("/me")
    .then(r=> r.json())
    .then(d=>setUser(d))
  }, [])

  function logOut() {
    fetch("/logout", {
      method: 'delete',
      headers: {'content-type': 'application/json'}
    })
    .then(setUser({}))
  }

  if ( !user.id ) {
    return ( <UserPage user={user} setUser={setUser}/> )
  } else {
    return (
      <>
        <NavBar user={user} logOut={logOut} />
        <Switch>

          <Route exact path="/" >
            <Home />
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
