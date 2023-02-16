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

<br>

## create a consumer hook

extra 2번 포켓몬 에제로 

context 이용해 캐시를 저장, 액세스 까지.

### other Note.

컨텍스트에는 React 구성 요소 트리의 특정 섹션으로 범위를 지정할 수 있는 고유한 기능도 있습니다. 컨텍스트(및 일반적으로 

**"애플리케이션" 상태)의 일반적인 실수는 실제로 앱의 일부(예: 단일 페이지)에서만 사용 가능해야 할 때 애플리케이션의 모든 위치에서 전역적으로 사용 가능하도록 만드는 것입니다.**

컨텍스트 값을 가장 필요한 영역으로 범위 지정하면 성능 및 유지 관리 특성이 향상됩니다.
