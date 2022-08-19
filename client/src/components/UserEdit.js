import {useSelector, useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";
import { userEdit } from '../slices/userSlice'
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Background, Page} from "../style/styled"
import { useState, useEffect} from "react";
import accountLogo from "../assets/profile_icon.png"

const BackButton = styled(Button)`
    float: right;
`
const Profile = styled.div`
	margin: 10px auto;
	width: 300px;
	display: flex;
	align-items: center;
	flex-direction: row;
`
const EditArea = styled.div`
	border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 15px;
    background-color: hsl(0, 0%, 98%);
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`
const FormArea = styled(Form)`
	width: 600px;
`
const Img = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 15px;
`
const Preview = styled(Img)`
  width: 200px;
  height: 200px;
`

function UserEdit() {
	const user = useSelector((state)=>state.user.value)
	const dispatch = useDispatch()
	const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [profileImage, setProfileImage] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")

	useEffect(()=>{
		setEmail( user.email ? user.email : "" )
		setProfileImage(user.profile_image ? user.profile_image : "" )
		setCity(user.city ? user.city : "" )
		setState(user.state ? user.state : null )
		setCountry(user.country ? user.country : "")

	},[user])

	function handleSubmit(event) {
        event.preventDefault()
        dispatch( userEdit(user.id, email, profileImage, city, state, country))
    }

	return(
		<Background>
			<Page>
			<BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/`) } >Back</BackButton>
				<h1 className="display-1" ><strong>My profile info</strong></h1>
				<hr/>
				<Profile>
					{user.profile_image ? <Img src={user.profile_image} /> : <Img src={accountLogo} /> }
					&emsp;
					<div>
					<br/>
					<h5>{user.username}</h5>
					<p>{user.email}</p>
					<p>{user.city}, {user.state}, {user.country}</p>
					</div>
				</Profile>

				<EditArea>
					<FormArea className="row gx-2 gy-6 align-items-center" onSubmit={handleSubmit} >
					
						<Form.Label><h5>Edit my profile</h5></Form.Label>

						
						<Form.Group className="mb-3" >
							<Form.Label>Email</Form.Label>
							<Form.Control type="input" placeholder="email"
							value={email} onChange={e=> setEmail(e.target.value)} />
						</Form.Group>

						<Form.Group className="mb-3 col-5" >
							<Form.Label>City</Form.Label>
							<Form.Control type="input" placeholder="city"
							value={city} onChange={e=> setCity(e.target.value)} />
						</Form.Group>

						<Form.Group className="mb-3 col-2" >
							<Form.Label>State</Form.Label>
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

						<Form.Group className="mb-3 col-5">
						<Form.Label>Country</Form.Label>
							<Form.Control type="input" placeholder="country"
							value={country} onChange={e=> setCountry(e.target.value)} />
						</Form.Group>

						<Form.Group className="mb-3" >
						<Form.Label>Profile Image Link</Form.Label>
							<Form.Control type="input" placeholder="profile image link"
							value={profileImage} onChange={e=> setProfileImage(e.target.value)} />
						</Form.Group>

						<Button className="col-2" variant="primary" type="submit">Save info</Button>
						&emsp;

						<Button className="col-2" variant="outline-secondary" onClick={()=> navigate(`/`)} type="input" >
							Cancel
						</Button>
					</FormArea>
					<div>
						<p>&emsp; &emsp; Image Preview</p> 
						{profileImage ? <Preview src={profileImage} /> : <Preview src={accountLogo} /> }
					</div>
				</EditArea>
			</Page>
		</Background>
	)
}
  
export default UserEdit;