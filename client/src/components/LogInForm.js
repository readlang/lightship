import {useState} from "react"
import {useDispatch} from "react-redux"
import {userLogIn} from '../slices/userSlice'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LogInForm({setShowLogIn}) {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    dispatch(userLogIn(username, password))
  }

  return(
    <Form onSubmit={handleSubmit} >
      <Form.Label>Please log in</Form.Label>
      <Form.Group className="mb-3" controlId="formBasicInput" >
        <Form.Control type="input" placeholder="Username"
        value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Control type="password" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit"> Log into LightShip </Button>
      <br/> <hr/> <br/>

      <Button variant="outline-secondary"  onClick={() => setShowLogIn(false)}> Sign up for account </Button>
    </Form>        
  )
}

export default LogInForm;