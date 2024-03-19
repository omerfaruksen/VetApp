import { Route, Routes } from 'react-router-dom'
import "./App.css"
import Customer from './Pages/Customer/Customer'
import Animal from './Pages/Animal/Animal'
import './App.css'
import Navbar from './Components/Navbar'
import Doctor from './Pages/Doctor/Doctor'
import Appointment from './Pages/Appointment/Appointment'
import AvailableDate from './Pages/AvailableDate/AvailableDate'


function App() {
  
  
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/animal" element={<Animal/>} />
      <Route path="/customer" element={<Customer/>} />
      <Route path="/doctor" element={<Doctor/>} />
      <Route path="/appointment" element={<Appointment/>} />
      <Route path="/availableDate" element={<AvailableDate/>} />
    </Routes>
    
      
      
    </>
  )
}

export default App
