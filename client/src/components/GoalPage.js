import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Background, Page, Card} from "../style/styled"
import { useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import { createGoal, getGoalsForUser } from "../slices/goalsSlice";

const BackButton = styled(Button)`
    float: right;
    /* border-radius: 30px; */
`
const FormArea = styled(Form)`
    border: 1px solid #6c757d;
    border-radius: 8px;
    padding: 15px;
    background-color: hsl(0, 0%, 98%);
`



function GoalPage() {
    const user = useSelector((state)=>state.user.value)
    const goals = useSelector((state)=>state.goals.userGoals)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [hideForm, setHideForm] = useState(true)
    const [goalTitle, setGoalTitle] = useState("")
    const [goalDescription, setGoalDescription] = useState("")
    const [goalWhy, setGoalWhy] = useState("")

    useEffect(()=>{
        dispatch(getGoalsForUser(user.id))
    },[dispatch, user.id])

    console.log(goals)

    function clearForm() {
        setGoalTitle("")
        setGoalDescription("")
        setGoalWhy("")
        setHideForm(true)
    }

    function handleSubmit() {
        console.log(goalTitle, goalDescription, goalWhy)
        dispatch(createGoal(user.id, goalTitle, goalDescription, goalWhy))
        clearForm()
    }

    return(
        <Background>
            <Page>
                <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/tracks`) } >Back</BackButton>
                <h1 className="display-1" ><strong>Goals</strong></h1>
                <hr/>
                {hideForm ? <Button variant="outline-primary" onClick={()=>setHideForm(false)} >Add a new goal</Button> :
                <FormArea>
                    <h4>Add a new goal</h4>
                    <Form.Text >State your goal simply and directly</Form.Text>
                    <Form.Control type="input" placeholder="the goal" value={goalTitle} onChange={e=>setGoalTitle(e.target.value)}/>
                    <br/>
                    <Form.Text >Go into a little more detail on the goal</Form.Text>
                    <Form.Control type="input" placeholder="more about this goal" value={goalDescription} onChange={e=>setGoalDescription(e.target.value)} />
                    <br/>
                    <Form.Text >Explain why this goal is important</Form.Text>
                    <Form.Control type="input" placeholder="the why" value={goalWhy} onChange={e=>setGoalWhy(e.target.value)} />
                    <br/>
                    <div className="text-end" >
                    <Button variant="outline-primary" onClick={handleSubmit} >Save</Button> &ensp;
                    <Button variant="outline-secondary" onClick={()=>clearForm()}>Clear</Button>
                    </div>
                </FormArea> } <br/><br/>
                {goals.map(goal=>(
                    <Card key={goal.id} > 
                        <h5>{goal.title}</h5>
                        <em>details: &ensp;</em>
                        <span>{goal.description}</span><br/>
                        <em>why:&emsp; &ensp;</em>
                        <span>{goal.why}</span>
                        
                    </Card>
                ))}
            </Page>
            
        </Background>
    )
}

export default GoalPage;