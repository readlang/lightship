// import {useSelector, useDispatch} from "react-redux"
// import {  } from '../slices/userSlice'
import styled from "styled-components";


const Grid = styled.div`
	width: 700px;
	height: 500px;
	background-color: hsl(0, 0%, 80%);
	display: grid;
    grid-template-columns: repeat(7, minmax(auto, auto));
	grid-template-rows: repeat(5, minmax(auto, auto));
    grid-gap: 1.2px;
`
const Div = styled.div`
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`

function Calendar() {
	// const user = useSelector((state)=>state.user.value)
	// const dispatch = useDispatch()
	let today = new Date()
	let todayDayOfWeek = today.getDay()

	let calArray = []
	for (let i = 0; i < 35; i++) {
		let floatingCalDay = new Date()
		floatingCalDay.setDate(today.getDate() - (todayDayOfWeek+28-i))
		calArray.push(floatingCalDay)
	}

	console.log(calArray)

	let array = []
	for (let i = 0; i < 35; i++) {
		array[i] = i+1;
	}

	return(
		<>
			<Grid>
				{calArray.map(x => (<Div key={x.toISOString()}> {x.getDate()} </Div>) )}
			</Grid>
		</>
	)
}

export default Calendar;