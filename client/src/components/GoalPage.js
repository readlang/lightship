import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Background, Page, Card, EditButton, BackButton} from "../style/styled"
import { useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import { createGoal, getGoalsForUser, editGoal, deleteGoal } from "../slices/goalsSlice";

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
    const [editGoalFocus, setEditGoalFocus] = useState(false)
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
        setEditGoalFocus(false)
        setHideForm(true)
    }

    function handleSubmit() {
        editGoalFocus ? dispatch(editGoal(editGoalFocus.id, goalTitle, goalDescription, goalWhy )) :
        dispatch(createGoal(user.id, goalTitle, goalDescription, goalWhy))
        clearForm()
    }

    function handleEdit(goal) {
        setGoalTitle(goal.title)
        setGoalDescription(goal.description)
        setGoalWhy(goal.why)
        setEditGoalFocus(goal)
        setHideForm(false)
    }

    return(
        <Background>
            <Page>
                <BackButton variant="outline-secondary" size="sm" onClick={() => navigate(`/`) } >Back</BackButton>
                <h1 className="display-1" ><strong>Goals</strong></h1>
                <hr/>
                <p>
                    Goals should be related to your values.  Think about where you might want to be in six months or two years, 
                    with the goal being the target.  The track will be the path to get to the goal.  Some people like the SMART framework 
                    for thinking about goals.  SMART stands for Specific, Measureable, Attainable, Relevant, and Time-Based.</p>
                {hideForm ? <Button variant="outline-primary" onClick={()=>setHideForm(false)} >Add a new goal</Button> :
                <FormArea>
                    <h4>{editGoalFocus ? `Edit goal:  ${editGoalFocus.title}` : "Add a new goal" }</h4>
                    <Form.Text >State your goal simply and directly</Form.Text>
                    <Form.Control type="input" placeholder="the goal" value={goalTitle} onChange={e=>setGoalTitle(e.target.value)}/>
                    <br/>
                    <Form.Text >Go into a little more detail on the goal</Form.Text>
                    <Form.Control type="input" placeholder="more about this goal" value={goalDescription} onChange={e=>setGoalDescription(e.target.value)} />
                    <br/>
                    <Form.Text >Explain why this goal is important</Form.Text>
                    <Form.Control type="input" placeholder="the why" value={goalWhy} onChange={e=>setGoalWhy(e.target.value)} />
                    <br/>
                    <Button variant="outline-primary" onClick={handleSubmit} >Save</Button> &ensp;
                    <Button variant="outline-secondary" onClick={()=>clearForm()}>Clear</Button>
                    { editGoalFocus ? <div style={{display: "inline-block", float: "right"}}>
                        <Button className="text-end" variant="outline-danger" onClick={()=>{dispatch(deleteGoal(editGoalFocus.id)); clearForm()}}>Delete Goal</Button>
                    </div> : null }
                </FormArea> } <br/><br/>
                {goals.map(goal=>(
                    
                    <Card style={{position: 'relative'}} key={goal.id} > 
                        <h5>{goal.title}</h5>
                        <em>details: &ensp;</em>
                        <span>{goal.description}</span><br/>
                        <em>why:&emsp; &ensp;</em>
                        <span>{goal.why}</span>
                        <EditButton variant="outline-danger" onClick={()=>handleEdit(goal)} >Edit</EditButton>
                    </Card>

                        
                    
                ))}
            </Page>
            
        </Background>
    )
}

export default GoalPage;