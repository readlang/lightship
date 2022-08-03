import styled from "styled-components";

const DayDiv = styled.div`
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
    position: relative;
`
const Today = styled(DayDiv)`
	background-color: hsl(0, 0%, 90%);
`
const RedCircle = styled.div`
	border: 1px solid red;
	border-radius: 100px;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
    position: absolute;
    
`
const BlueCircle = styled(RedCircle)`
	border: 2px solid blue;
`



function CalDay({day}) {

    return(
        <>
            {day.isToday ? 
                <Today>
                    {/* {day.data === "achieved" ? <BlueCircle> {day.date.getDate()} </BlueCircle> : <RedCircle> {day.date.getDate()} </RedCircle> } */}
                    {day.date.getDate()}
                    {day.data === "achieved" ? <BlueCircle/>  : null}
                    {day.data === "unachieved" ? <RedCircle/>  : null}


                </Today>
                :
                <DayDiv>
                    {day.date.getDate()}
                    {day.data === "achieved" ? <BlueCircle/>  : null}
                    {day.data === "unachieved" ? <RedCircle/>  : null}
                </DayDiv>
            }

        </>
    )
}

export default CalDay;