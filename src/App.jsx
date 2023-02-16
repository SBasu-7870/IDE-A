import React from 'react'
import Landing from './pages/Landing';
import IDE from './components/IDE'
import { BrowserRouter, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/room/:roomId" element={<IDE/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
