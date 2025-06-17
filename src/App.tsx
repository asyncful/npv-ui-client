import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import NetPresentValueCalculator from './features/netPresentValueCalculation/pages/NetPresentValueCalculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NetPresentValueCalculator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
