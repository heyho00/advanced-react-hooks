# advanced hook

## useContext

```js
import * as React from 'react'

const FooContext = React.createContext()

function FooDisplay() {
  const foo = React.useContext(FooContext)
  return <div>Foo is: {foo}</div>
}

ReactDOM.render(
  <FooContext.Provider value="I am foo">
    <FooDisplay />
  </FooContext.Provider>,
  document.getElementById('root'),
)
// renders <div>Foo is: I am foo</div>
```

provider w외부에서 context를 사용하려는 것은 실수이므로 기본값을 사용하지 않는게 좋다. ?

일반적으로 컨텍스트 provider가 다른 파일에 배치되고

구성요소 자체와 액세스할 수 있는 사용자 지정 후크를 노출한다.
