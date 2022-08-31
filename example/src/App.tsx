import React, { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import useShadow from '../../src/index'
import './App.css'
import innerCSS from './inner.css'

function App() {
  const [count, setCount] = useState(0)
  const element = useShadow(<MyComponent count={count} />, [count], {
    styleContent: innerCSS,
    styleSheets: ['./src/inner.css']
  })

  return (
    <div className="App">
      <button className="my-self" onClick={() => setCount(count => count + 1)}>Add</button>
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
