import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategoryCreatePage from './components/create'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CategoryCreatePage />
    </>
  )
}

export default App

