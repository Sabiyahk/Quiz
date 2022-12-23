
import React, { useState, useEffect } from "react"
import './css/auth.css';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Card from "./Card/Card";
import axios from "axios";


function Home() {
  const [examData, setExamData] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://localhost:3004/api/exams/'
    }).then(res => {
      setExamData(res.data)
    })
  }, [])
  



  return (
    <div>
      <Header />
      <div className="container my-5">
        <div className="row">
          {examData.map((exam,index) => (
            <Card key={index} exam={exam} />
          ))}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default Home