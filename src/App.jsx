import { useState } from 'react'
import deepLogo from './assets/deep.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <img src={deepLogo} className="logo react" alt="DEEP AUDIO" />
      </div>
  
    </>
  )
}

export default App
