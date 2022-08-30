# useShadow 

[![npm version](https://badgen.net/npm/v/use-shadow-dom)](https://npm.im/use-shadowm-dom) [![npm downloads](https://badgen.net/npm/dm/use-shadow-dom)](https://npm.im/use-shadow-dom)

## Install

```bash
pnpm i use-shadow-dom
```

## Import

```ts
import useShadow from 'use-shadow-dom'
```

## Usage

```ts
function App() {
  // this element will be rendered in shadow dom.
  // and element will never rerender
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

Maybe you want to pass some props(eg. your custom css) to your component from `App`, you can tell `useShadow` your dependencies by pass `dependencyList` as second params:

```ts
 const element = useShadow(<MyComponent count={count} />, [count])
```

When `count` changed, `useShadow` will return a new element. 

## Hook API


| Value     |    Type | Default  | Description |
| -------- | --------| ----- | ----- |
| Component      |    ReactNode | -  | The component you want to attach to shadow dom. 
| deps | DependencyList | `[]` | The dependencies that control component updates
| opts | Options | - | please see Options API


## Options API

| Value     |    Type | Default  | Description |
| -------- | --------| ----- | ----- |
| shadowRootInit      |    ShadowRootInit | `{ mode: 'open' }`  | the params for `attachShadow`
