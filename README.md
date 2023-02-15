# advanced hook

## useCallback

메모이제이션: 원래 계산을 저장하고 동일한 입력이 제공될 때 저장된 값을 반환함으로써

주어진 입력에 대한 값을 다시 계산할 필요가 없는 `성능 최적화 기술`.

메모이제이션은 `캐싱`의 한 형태.

```js
//간단한 예시

const values = {}

function addOne(num: number) {
  if (values[num] === undefined) {
    values[num] = num + 1 // <-- here's the computation
  }
  return values[num]
}
```

메모이제이션의 또 다른 측면은 평등한 값 참조이다.

```js
const dog1 = new Dog('sam')
const dog2 = new Dog('sam')
console.log(dog1 === dog2) // false
```

두 개는 같은 이름을 가지고 있지만, 동일하지 않다.

그러나 메모이제이션을 사용하여 동일한 개를 얻을 수 있다.

```js
const dogs = {}

function getDog(name: string) {
  if (dogs[name] === undefined) {
    dogs[name] = new Dog(name)
  }
  return dogs[name]
}

const dog1 = getDog('sam')
const dog2 = getDog('sam')
console.log(dog1 === dog2) // true
```

메모이제이션 예제가 매우 유사하다.

= 메모이제이션은 일반 추상화로 구현할 수 있는 것이다.

```js
function memoize<ArgType, ReturnValue>(cb: (arg: ArgType) => ReturnValue) {
  const cache: Record<ArgType, ReturnValue> = {}
  return function memoized(arg: ArgType) {
    if (cache[arg] === undefined) {
      cache[arg] = cb(arg)
    }
    return cache[arg]
  }
}

const addOne = memoize((num: number) => num + 1)
const getDog = memoize((name: string) => new Dog(name))
```

React 에서는 직접 이 메모이제이션을 구현할 필요가 없다.

useMemo, useCallback을 만들어놨기 때문이다.

```js
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count], // <-- yup! That's a dependency list!
) // count가 바뀔때만 updateLocalStorage 함수를 재생성해준다.
//그래서 useEffect의 dependency array에 넣으면
// 마찬가지로 함수가 재생성 될 때에만 updateLocalStorage를 실행한다.

React.useEffect(() => {
  updateLocalStorage()
}, [updateLocalStorage])

```

특별히 하는일 없이 그냥 함수를 전달하고 반환하는 걸로만 보인다고 할 수 있다.

```js
function useCallback(callback) {
  return callback
}
```

하지만 dependency array를 이용해 메모이제이션 하는 것.
```js
let lastCallback

function useCallback(callback, deps) {
  if (depsChanged(deps)) {
    lastCallback = callback
    return callback
  } else {
    return lastCallback
  }
}
```

useMemo, useCallback 내부적으로 이런 차이 뿐이라고..
useMemo를 쓰기위한 shortcut이라고 함.

```js
// the useMemo version:
const updateLocalStorage = React.useMemo(
  // useCallback saves us from this annoying double-arrow function thing:
  () => () => window.localStorage.setItem('count', count),
  [count],
)

// the useCallback version
const updateLocalStorage = React.useCallback(
  () => window.localStorage.setItem('count', count),
  [count],
)
```
