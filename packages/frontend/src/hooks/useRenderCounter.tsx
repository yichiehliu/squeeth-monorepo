import { useRef } from 'react'
const useRenderCounter = (label: any) => {
  const counter = useRef(0)
  counter.current++
  console.log(`${label} rendered ${counter.current} times`)
}
export default useRenderCounter
