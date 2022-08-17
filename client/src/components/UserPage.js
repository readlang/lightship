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
  border-radius: 0px;
`

function UserPage () {
  const [showLogIn, setShowLogIn] = useState(true);

  return(
    <ViewPort>
      <Centered>
          <Sized400><Img src={logo} alt="logo" /> </Sized400>
          <Sized400>{showLogIn ? 
            <LogInForm setShowLogIn={setShowLogIn} /> :
            <SignUpForm setShowLogIn={setShowLogIn} />}
          </Sized400>
      </Centered>
    </ViewPort>
  )
}

export default UserPage;