import {useState} from "react"
import {useDispatch} from "react-redux"
import {userSignUp} from '../slices/userSlice'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function SignUpForm({setShowLogIn}) {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")

    function handleSubmit(event) {
        event.preventDefault()
        dispatch(userSignUp(username, password, passwordConfirm, email, profileImage, city, state, country))
    }

    return(
        <Form className="row gx-2 gy-6 align-items-center" onSubmit={handleSubmit} >
            <Form.Label>Sign up for account</Form.Label>

            <Form.Group className="col-5 mb-3" >
                <Form.Control type="input" placeholder="Username"
                value={username} onChange={e=> setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 col-7" >
                <Form.Control type="input" placeholder="email"
                value={email} onChange={e=> setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="col-6 mb-3" >
                <Form.Control type="password" placeholder="password"
                value={password} onChange={e=> setPassword(e.target.value)} />
            </Form.Group>    

            <Form.Group className="col-6 mb-3" >
                <Form.Control type="password" placeholder="confirm password"
                value={passwordConfirm} onChange={e=> setPasswordConfirm(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 col-9" >
                <Form.Control type="input" placeholder="city"
                value={city} onChange={e=> setCity(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3 col-3" >
                <Form.Select type="input" placeholder="state" value={state} onChange={e=>setState(e.target.value)}>
                    <option value=""> </option>
                    <option value="AK">AK</option>                      
                    <option value="AL">AL</option>
                    <option value="AR">AR</option>
                    <option value="AZ">AZ</option>
                    <option value="CA">CA</option>
                    <option value="CO">CO</option>
                    <option value="CT">CT</option>
                    <option value="DC">DC</option>
                    <option value="DE">DE</option>
                    <option value="FL">FL</option>
                    <option value="GA">GA</option>
                    <option value="HI">HI</option>
                    <option value="IA">IA</option>
                    <option value="ID">ID</option>
                    <option value="IL">IL</option>
                    <option value="IN">IN</option>
                    <option value="KS">KS</option>
                    <option value="KY">KY</option>
                    <option value="LA">LA</option>
                    <option value="MA">MA</option>
                    <option value="MD">MD</option>
                    <option value="ME">ME</option>
                    <option value="MI">MI</option>
                    <option value="MN">MN</option>
                    <option value="MO">MO</option>
                    <option value="MS">MS</option>
                    <option value="MT">MT</option>
                    <option value="NC">NC</option>
                    <option value="ND">ND</option>
                    <option value="NE">NE</option>
                    <option value="NH">NH</option>
                    <option value="NJ">NJ</option>
                    <option value="NM">NM</option>
                    <option value="NV">NV</option>
                    <option value="NY">NY</option>
                    <option value="OH">OH</option>
                    <option value="OK">OK</option>
                    <option value="OR">OR</option>
                    <option value="PA">PA</option>
                    <option value="RI">RI</option>
                    <option value="SC">SC</option>
                    <option value="SD">SD</option>
                    <option value="TN">TN</option>
                    <option value="TX">TX</option>
                    <option value="UT">UT</option>
                    <option value="VA">VA</option>
                    <option value="VT">VT</option>
                    <option value="WA">WA</option>
                    <option value="WI">WI</option>
                    <option value="WV">WV</option>
                    <option value="WY">WY</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Control type="input" placeholder="country"
                value={country} onChange={e=> setCountry(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Control type="input" placeholder="profile image link"
                value={profileImage} onChange={e=> setProfileImage(e.target.value)} />
            </Form.Group>

            <Button className="col-6" variant="primary" type="submit">Sign Up</Button>
            &emsp;

            <Button className="col-5" variant="outline-secondary" onClick={()=> setShowLogIn(true)} type="input" >
                Back to Log in
            </Button>
        </Form>
    )
}

export default SignUpForm;