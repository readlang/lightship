// import {useSelector, useDispatch} from "react-redux"
// import {  } from '../slices/userSlice'
import styled from "styled-components";

const Container = styled.div`
	border: 1px solid #6c757d;
	border-radius: 5px;
	margin: 10px;
	padding: 10px;
	box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
	background-color: white;
`

const Grid = styled.div`
	
	height: 300px;
	background-color: hsl(0, 0%, 80%);
	display: grid;
    grid-template-columns: repeat(7, minmax(auto, auto));
	grid-template-rows: repeat(5, minmax(auto, auto));
    grid-gap: 1px;
`
const DayDiv = styled.div`
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
`
const RedCircle = styled.div`
	border: 1px solid red;
	border-radius: 100px;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
`
const BlueCircle = styled(RedCircle)`
	border: 1px solid blue;
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
		let isEven = floatingCalDay.getDate() % 2 === 0 ? true : false // check if floatingCalDay is same as day in activities...
		calArray.push({date: floatingCalDay, data: isEven})
	}

	// console.log(calArray)

	return(
		<Container>
			<Grid>
				{calArray.map(x => (<DayDiv key={x.date.toISOString()}> 
					{x.data ? <BlueCircle> {x.date.getDate()} </BlueCircle> : <RedCircle> {x.date.getDate()} </RedCircle> }
				</DayDiv>) )}
			</Grid>
		</Container>
	)
}

export default Calendar;