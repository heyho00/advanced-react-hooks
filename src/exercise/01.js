// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function counterReducer(prev, newCount) {
    return newCount
  }

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useReducer(counterReducer, initialCount)
  const increment = () => setCount(count + step)

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App


// 이름을 관리하는 예시

// function nameReducer(previousName, newName) {
//   return newName
// }

// const initialNameValue = 'Joe'

// function NameInput() {
//   const [name, setName] = React.useReducer(nameReducer, initialNameValue)
//   const handleChange = event => setName(event.target.value)
//   return (
//     <>
//       <label>
//         Name: <input defaultValue={name} onChange={handleChange} />
//       </label>
//       <div>You typed: {name}</div>
//     </>
//   )
// }

// 리듀서는 2개의 인수로 호출된다.

// 1. 현재 상태
// 2. 디스패치 함수(액션 이라고도 한다.)