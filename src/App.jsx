import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Main from './components/Main'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-white'>
        <Toaster />
        <Main />
      </div>
    </>
  )
}

export default App
