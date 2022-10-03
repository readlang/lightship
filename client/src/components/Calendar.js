import {useSelector} from "react-redux"
import {CalCard} from "../style/styled"
import styled from "styled-components";
import CalDay from "./CalDay"

const Grid = styled.div`
	height: 300px;
	background-color: hsl(0, 0%, 80%);
	display: grid;
    grid-template-columns: repeat(7, minmax(auto, auto));
	grid-template-rows: repeat(5, minmax(auto, auto));
    grid-gap: 1px;
`
function Calendar({track}) {
	const actions = useSelector((state)=>state.actions.trackActions)
	
	let today = new Date()
	let todayDayOfWeek = today.getDay()

	let calArray = []
	for (let i = 0; i < 35; i++) {
		let floatingCalDay = new Date()
		floatingCalDay.setDate(today.getDate() - (todayDayOfWeek+28-i))
		let isToday = (floatingCalDay.getDate() === today.getDate() && floatingCalDay.getMonth() === today.getMonth()) // true false if day is today
		

		let actionTotal = 0 // total of the action number for the day
		let achieved = false 

		// there is a bug in here with time...
		// late in the day, the graphic calendar is showing things one day earlier than they are 
		// (an event on the 6th shows up as the 5th)
		actions.forEach(action=>{
			if (action.date_time.substring(0,10) === floatingCalDay.toISOString().substring(0,10) ) {
				actionTotal += action.number
			}
		})
		
		if (actionTotal !== 0) {if (track.minmax === "at least") {
			achieved = (actionTotal >= track.number ? "achieved" : "unachieved")
		} else if (track.minmax === "at most") {
			achieved = (actionTotal <= track.number ? "achieved" : "unachieved")
		} else {
			achieved = (actionTotal === track.number ? "achieved" : "unachieved")
		}}
		 
		calArray.push({date: floatingCalDay, data: achieved, isToday: isToday, actionTotal: actionTotal})
	}


	//console.log(calArray.map(x=> x))

	return(
		<CalCard>
			<Grid>
				{calArray.map(day => ( <CalDay key={day.date.toISOString()} day={day} /> ))}
			</Grid>
		</CalCard>
	)
}
export default Calendar;