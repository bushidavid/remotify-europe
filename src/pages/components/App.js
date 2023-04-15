import React from "react";

import Navbar from './navbar';
import Home from './home';
import InputJob from './input-job';
import JobList from "./job-list";
import Register from "./register;
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './login';
import CreateJob from './create-job';

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


