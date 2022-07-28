// import {useSelector, useDispatch} from "react-redux"
// import {  } from '../slices/userSlice'
import styled from "styled-components";
import Calendar from "./Calendar"

const Div = styled.div`
	height: 1000px;
	display: flex;
	justify-content: center;
	align-items: center;
`

function GroupPage() {
	// const user = useSelector((state)=>state.user.value)
	// const dispatch = useDispatch()

	

	return(
		<Div>
			<Calendar/>
		</Div>
	)
}

export default GroupPage;