import {useSelector, useDispatch} from "react-redux"
import styled from "styled-components";
import Button from "react-bootstrap/Button";


const Window = styled.div`
	background-color: hsl(0, 0%, 100%);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 30px;
`



function TracksWindow() {



    return(
        <Window>
          
                <h1 className="display-1" ><strong>Tracks</strong></h1>
            
          
            
        </Window>
    )
}

export default TracksWindow;