# Advanced React hook

## useReducer

useState 를 사용하는것 말고도 다른 방법이 있다.

바로, useReducer Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있다.

상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고,
 
심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있다.

```js
import React, { useState } from 'react';

function Counter() {
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber(prevNumber => prevNumber + 1);
  };

  const onDecrease = () => {
    setNumber(prevNumber => prevNumber - 1);
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

reducer란 `현재 상태`와 `액션 객체`를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다.

reducer가 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 된다.

action 은 업데이트를 위한 정보를 가지고 있다.

주로 type 값을 지닌 객체 형태로 사용하지만, 꼭 따라야 할 규칙은 따로 없다.

```js

// 액션 예시

// 카운터에 1을 더하는 액션
{
  type: 'INCREMENT'
}
// 카운터에 1을 빼는 액션
{
  type: 'DECREMENT'
}
// input 값을 바꾸는 액션
{
  type: 'CHANGE_INPUT',
  key: 'email',
  value: 'tester@react.com'
}
// 새 할 일을 등록하는 액션
{
  type: 'ADD_TODO',
  todo: {
    id: 1,
    text: 'useReducer 배우기',
    done: false,
  }
}
```

이렇게 action 객체의 형태는 자유.

type 값을 대문자와 _로 구성하는 관습이 존재하기도 하지만 의무는 아님.

사용은 이렇게 한다.

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

여기서 state는 앞으로 컴포넌트에서 사용할 수 있는 상태,

dispatch는 액션을 발생시키는 함수. dispatch({type:'INCREMENT'}) 이렇게 씀.

useReducer 에 넣는 첫번째 파라미터는 `reducer 함수`이고 두번째는 `초기값`.

위의 counter를 구현해보자.

```js
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

function Counter() {
  const [number, dispatch] = useReducer(reducer, 0);

  const onIncrease = () => {
    dispatch({ type: 'INCREMENT' }); // dispatch에 액션을 넘겨주는 개념
  };

  const onDecrease = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;
```

여기까지 useReducer의 보편적인 문법을 알고 보면 더 이해가 쉽다..

epic react의 실습 예제를 다시 살펴보자.

```js
// 1
import * as React from 'react'

const countReducer = (state, newState) => newState

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useReducer(countReducer, initialCount)
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
```


```js
// 1-1 extra

import * as React from 'react'

const countReducer = (count, change) => count + change

function Counter({initialCount = 0, step = 1}) {
  const [count, changeCount] = React.useReducer(countReducer, initialCount)
  const increment = () => changeCount(step) // 기존에 count+step 계산을 먼저 해버리고 newState 로 넘겨서 반환했었는데
                                            // 이전 state와 step을 더하는 상태변경 로직을 reducer로 뺀 것이다.
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}

export default Usage
```

```js
// 1-2 extra

import * as React from 'react'

const countReducer = (state, action) => ({...state, ...action})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount, //state를 객체로 관리하기 시작
  })
  const {count} = state
  const increment = () => setState({count: count + step})
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
```

```js
// 1-3 extra

import * as React from 'react'

const countReducer = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
}) //reducer의 인자로 action 객체, 함수 등 을 넣어 많은 것들을 할 수 있다.

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
```

```js
// 1-4 extra

import * as React from 'react'

function countReducer(state, action) {
  const {type, step} = action
  switch (type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + step,
      }
    }
    case 'decrease': {
      return {
        ...state,
        count: state.count - step,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => dispatch({type: 'increment', step})
  // type과 함께 step같이 부가적인걸 넘겨 어떤 액션을 취할지 만들 수 있다.
  // decrease도 가능. 위에 만들어봄.
  // 그리고 결론적으로 step을 넘겨버려서 
  // (계산에 사용할 값을 넘겨놓은거)

  // 그래서 실제 상태의 변경이 reducer에서 일어나게함.
  // 이게 상태 변경 로직을 컴포넌트와 분리한 것이구나.
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

```
