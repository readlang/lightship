import styled from "styled-components";
import {Background, Page} from "../style/styled"
import ship from "../assets/ship_night.jpg"

const Title = styled.div`
    text-align: center;
`

const Img = styled.img`
  object-fit: fill;
  width: 940px;
  border-radius: 6px;
`

function Home(){
    
    return(
        <Background>
            <Page>
                <Title>
                <h1 className="display-1" ><strong>Welcome to LightShip</strong></h1>
                </Title>

                <hr/>
                <Img src={ship} /> <br/> <br/> 

                <p> <b>LightShip</b> helps you stay on track with what's important to you.  You need trusty waypoints to navigate in stormy seas. <br/> </p>
                <ul>
                    <li> Start by defining a few <em>goals</em>.  A goal is target to shoot for in a given amount of time. </li><br/>
                    <li> Next, connect to a few <em>friends</em> on the platform.  They will help you stay accountable.  The aim is not to add a lot of friends, 
                    but rather just a few that might have similar goals.  You will help each other stay on target. </li><br/>
                    <li> <em>A track</em> is a repeating daily or weekly target that will move you towards your goal.  Think of it as the path to your goal. 
                    You will define tracks, and then log <em>actions</em> that either hit or miss these tracks. </li><br/>
                    <li> <em>Groups</em> are a collection of friends all shooting to hit a similar goal. Once you make a group, you can add friends to be members of the group,
                    and each person will add their own track to follow in the group.  As people log their actions along this track, it will show up in the group tracker.  
                    Comment on your friend's progress (keep it positive and encouraging) to keep them on track with their goals and they will return the favor.
                    </li>

                </ul>

                    
                
                
            </Page>        
        </Background>
    )
}

export default Home