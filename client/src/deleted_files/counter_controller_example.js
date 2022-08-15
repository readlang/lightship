import { useSelector, useDispatch } from "react-redux";
import {decrement, increment, incrementByAmount} from '../slices/counterSlice'

function Home(){
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()

    return(
        <>
            <br/>
            This is the home component, count: {count}
            <button onClick={() => dispatch(increment())} >Increment</button>
            <span>{count}</span>
            <button onClick={() => dispatch(decrement())} >Decrement</button>
            <button onClick={() => dispatch(incrementByAmount(7))} >Increment by...</button>
        </>
    )
}

export default Home