# advanced hook

## useEffect

React의 render phase에 따르면, 변형(mutations), 구독(subscriptions), 타이머, 로깅 등의 사이드 이펙트들이 컴포넌트 함수 내부에 있어서는 안된다.

이를 해결하기 위해 useEffect를 사용하는데, useEffect는 **화면 렌더링이 완료된 후 혹은 어떤 값이 변경되었을 때 사이드 이펙트를 수행**한다.

## 실행 시점

`useEffect`로 전달된 함수는 layout과 paint가 완료된 후에 비동기적으로 실행된다.

이때 만약 DOM에 영향을 주는 코드가 있을 경우, 사용자는 화면의 깜빡임과 동시에 화면 내용이 달라지는 것을 볼 수 있다.

중요한 정보일 경우, 화면이 다 렌더되기 전에 동기화해주는 것이 좋은데, 이를 위해 `useLayoutEffect`라는 훅이 나왔으며, 기능은 동일하되 실행 시점만 다르다.

React 18부터는 useEffect에서도 layout과 paint 전에 동기적으로 함수를 실행할 수 있는 `flushSync`라는 함수가 추가되었다. 

하지만 강제로 실행하는 것이다보니, 성능상 이슈가 있을 수 있다.

## useLayoutEffect

`useLayoutEffect`는 useEffect와 동일하지만, 렌더링 후 layout과 paint 전에 동기적으로 실행된다.

때문에 설령 DOM을 조작하는 코드가 존재하더라도, 사용자는 깜빡임을 보지 않는다.

그러나 큰 차이는 아니고 찰나의 순간 깜빡임이 있느냐, 없느냐 차이.

스크롤 위치를 찾거나 어떤 element의 스타일 요소를 변경하는 등 직접적인 DOM 조작을 하는곳이 아니면 useEffect를 추천.

공식 문서에서도 useEffect 먼저 사용후에 문제가 생기면 그때 useLayoutEffect 쓰라함.
