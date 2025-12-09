import style from "./style.module.css"
import { useState } from "react"

const Greeting = () => {
  //let counter = 0
  const [counter, setCounter] = useState(0)
  const [userInput, setUserInput] = useState("")
  
  
  const increment = () =>{
    setCounter(counter + +userInput)
  }

  const handleChange = (e) =>{
    setUserInput(e.target.value)

  }
    return(
    <div className ={style.greeting_wrp}>
      <input type="number" value={userInput} onChange={handleChange}/>
      <button onClick ={increment}>Click count: {counter}</button>
    </div>
    )
}
export default Greeting