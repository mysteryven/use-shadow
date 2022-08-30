import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import useShadow from '../../src/index'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const element = useShadow(<MyComponent count={count} />, [count])

  return (
    <div className="App">
      <button onClick={() => setCount(count => count + 1)}>Add</button>
      {element}
    </div>
  )
}

function MyComponent(props: { count: number }) {
  function handleClick() {
    console.log(props.count)
  }

  return <div onClick={handleClick}>{props.count}</div>
}

export default App
