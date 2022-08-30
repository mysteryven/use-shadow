# useShadow 

## Install

```

```

## How to use

```ts
function App() {
  // this element will be rendered in shadow dom.
  const element = useShadow(<MyComponent />)

  return (
    <div className="App">
      {element}
    </div>
  )
}

function MyComponent() {
  return <div>Hello world</div>
}
```
