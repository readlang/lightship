import {useSelector, useDispatch} from "react-redux"
import {loadUser} from '../slices/userSlice'
import styled from "styled-components";
import Button from "react-bootstrap/Button"

const Bar = styled.div`
    height: 60px;
    background-color: lightgray;
`

const Img = styled.img`
    height: 100%;
`

function NavBar() {
    const dispatch = useDispatch()
    const count = useSelector((state)=>state.counter.value) // accesses state value and assigns count variable
    const user = useSelector((state)=>state.user.value) // accesses state

    function logOut() {
        fetch("/logout", {
          method: 'delete',
          headers: {'content-type': 'application/json'}
        })
        .then( dispatch(loadUser({})) )
    }

    console.log("redux user:", user)

    return(
        <Bar>
            This is the NavBar.  Hello user = {user.username}. &emsp; Count = {count} &emsp;
            <Img src={user.profile_image} alt="profileimage"></Img>
            <Button onClick={logOut} >Logout</Button>
        </Bar>
    )
}

export default NavBar;