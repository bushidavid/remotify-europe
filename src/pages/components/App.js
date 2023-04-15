import Ract from "react";


import './Navbar';
import Navbar from './Navbar';
import Home from './Home';
import InputJob from './InputJob';
import JobList from "./JobList";
import Register from "./Register";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './Login';
import CreateJob from './CreateJob';

function App() {
  
  const title = 'Welcome to the New Joab Board';

  return (
      <Router>
        <div className="App">
              <div className="flex flex-col h-screen w-screen">
              <Navbar />
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/create-job" element={<CreateJob />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
        </div>
      </Router>
  );
}

export default App;


