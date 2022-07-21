import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import Button from "react-bootstrap/Button"
import {loadUser} from '../slices/userSlice'

const Bar = styled.div`
    height: 60px;
    background-color: lightgray;
`

const Img = styled.img`
    height: 100%;
`

function NavBar({user, logOut}) {
    
    const count = useSelector((state)=>state.counter.value)
    const reduxUser = useSelector((state)=>state.user.value)
    const dispatch = useDispatch()

    console.log(reduxUser)

    dispatch(loadUser(user))


    return(
        <Bar>
            This is the NavBar.  Hello user = {user.username}. &emsp; Count = {count} &emsp;
            reduxUser: {reduxUser.username}
            <Img src={user.profile_image} alt="profileimage"></Img>
            <Button onClick={() =>dispatch(loadUser(user)) } >LoadUser</Button>
            <Button onClick={logOut} >Logout</Button>
        </Bar>
    )
}

export default NavBar;