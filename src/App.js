import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import Login from './components/login'
import SignUp from './components/signup'
import Home from './components/home'
import Exam from './components/Exam/Exam';
import ContactForm from './components/Contact_Us/ContactForm';

function App() {
  return (
    <Router>
      <div>
        <div>
          <div>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/exams/:exam_id/" element={<Exam />} />
              <Route path="/ContactForm" element={<ContactForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
