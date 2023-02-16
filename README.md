# advanced hook

## useDebugValue : useMedia

```js
function useCount({initialCount = 0, step = 1} = {}) {
  React.useDebugValue({initialCount, step})
  const [count, setCount] = React.useState(initialCount)
  const increment = () => setCount(c => c + step)
  return [count, increment]
}
```

참고: useDebugValue의 프로덕션 빌드는 아무 작업도 수행하지 않기 때문에 useDebugValue 값은 프로덕션에 표시되지 않습니다.
