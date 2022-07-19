import {useState} from "react";
import styled from "styled-components";
import logo from "../assets/LS_logo_400.png";
import LogInForm from "./LogInForm"
import SignUpForm from "./SignUpForm"

const ViewPort = styled.section`
  display: grid;
  grid-template-rows: 100vh;
  grid-template-columns: 100vw;
  background-color: rgb(240, 240, 240);
`

const Centered = styled.div`
  justify-self: center;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Sized400 = styled.div`
  height: 400px;
  width: 400px;
  background-color: white;
  padding: 20px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`

const Img = styled.img`
  object-fit: fill;
  height: 360px;
`

function UserPage ({user, setUser}) {
  const [showLogIn, setShowLogIn] = useState(true);

  function handleLogIn (username, password) {
    fetch("/login", {
      method: 'post',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username: username, password: password})
    })
    .then(r=>r.json())
    .then(data => {
      setUser(data)
    })
  }
  
  function handleSignUp( username, password, passwordConfirm, email, profileImage, city, state, country) {
    fetch("/signup", {
      method: "post",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({username: username, password: password, 
        password_confirmation: passwordConfirm, email: email, profile_image: profileImage, 
        city: city, state: state, country: country})
    })
    .then(r=> r.json())
    .then(data => console.log(data))

  }

  return(
    <ViewPort>
      <Centered>
          <Sized400><Img src={logo} alt="logo" /> </Sized400>
          <Sized400>{showLogIn ? 
            <LogInForm handleLogIn={handleLogIn} setShowLogIn={setShowLogIn} /> :
            <SignUpForm handleSignUp={handleSignUp} setShowLogIn={setShowLogIn} />}
          </Sized400>
      </Centered>
    </ViewPort>
  )
}

export default UserPage;