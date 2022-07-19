// import {Switch, Route} from "react-router-dom" // version 5
import {useState, useEffect} from "react"
import Button from "react-bootstrap/esm/Button"
import UserPage from "./UserPage"

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetch("/me")
    .then(r=> r.json())
    .then(d=>setUser(d))
  }, [])

  console.log(user)

  function logOut() {
    fetch("/logout", {
      method: 'delete',
      headers: {'content-type': 'application/json'}
    })
    .then(setUser({}))
  }

  if ( !user.id ) {
    return (
      <>
        <UserPage user={user} setUser={setUser}/>
      </>
    );
  } else {
    return(
      <>
        <h1>Hello World you have logged in </h1>
        <Button onClick={logOut} >Logout</Button>
      </>
    )
  }
}

export default App;
