import React, { useRef, useState } from 'react'
import useShadow from '../../src/index'
import './App.css'
import innerCSS from './inner.css?raw'

function App() {
  const [count, setCount] = useState(0)
  const element = useShadow(<MyComponent count={count} />, [count], {
    styleContent: innerCSS,
    styleSheets: ['./src/inner.css']
  })

  return (
    <div className="App">
      <pre>
        <code>
          {`.blue { color: blue; margin-top: 20px }`}
        </code>
      </pre>
      <button className="blue" onClick={() => setCount(count => count + 1)}>button.blue(outer)</button>
      {element}
    </div>
  )
}

function MyComponent(props: { count: number }) {


  return <div className='blue'>div.blue-{props.count}(in shadow dom)</div>
}

export default App
