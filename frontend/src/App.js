import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages & components

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Navbar from './components/Navbar'
import FitBot from './Pages/FitBot'; 
import Home from './Pages/Home'
import DietFeed from './components/DietFeed'
import UpperBody from './Pages/UpperBody'
import LowerBody from './Pages/LowerBody'
import Cardio from './Pages/Cardio'
import Custom from './Pages/Custom'
function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
             <Route path="/chat" element={user ? <FitBot /> : <Navigate to="/login" />} />
             <Route path="/diet" element={user ? <DietFeed /> : <Navigate to="/login" />} />
             <Route path="/UpperBody" element={user ? <UpperBody /> : <Navigate to="/login" />} />
             <Route path="/LowerBody" element={user ? <LowerBody /> : <Navigate to="/login" />} />
             <Route path="/Cardio" element={user ? <Cardio /> : <Navigate to="/login" />} />
             <Route path="/Custom" element={user ? <Custom /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;