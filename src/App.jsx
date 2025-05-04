import './App.css'
import { Routes, BrowserRouter, Route } from "react-router-dom"
import DndExample from './DND/DndExample'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DndExample />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
