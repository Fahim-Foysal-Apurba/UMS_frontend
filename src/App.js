import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './login.js'
import UMS from './ums.js'


function App() {
  return (
     <Router>
          <Routes>
              
              <Route path="/" element={<Login />}/>
              <Route path="/ums" element={<UMS />} />

          </Routes>     
      </Router>

  );
}

export default App;
