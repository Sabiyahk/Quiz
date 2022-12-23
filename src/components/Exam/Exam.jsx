import { calculateNewValue } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { json, useParams } from 'react-router-dom'
import Header from '../Header/Header'

function Exam(props) {
  const [queIndex, setQueIndex] = useState(0)
  const param = useParams()
  const [queData, setQueData] = useState([])
  const [ans, setAns] = useState(false)
  const [score, setScore] = useState()
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3004/api/contents/?exam_id=" + param.exam_id
    }).then(res => {
      setQueData(res.data)
    })
  }, [param.exam_id])

  function onNextClick() {
    if (queData.length > queIndex + 1) {
      setQueIndex(queIndex + 1)
    }
  }
  function onPreviousClick() {
    if (queIndex - 1 >= 0) {
      setQueIndex(queIndex - 1)
    }
  }
  const onOptionSelect = (e, queIndex, optionIndex) => {
    var temp = queData
    temp[queIndex].options.map((option, ind) => {
      if (ind === optionIndex)
        option['user_ans'] = !Boolean(e.target.value) === false
      else
        option['user_ans'] = false
      return option
    })
    setQueData([...temp])
  }
  const calculate = () => {
    var res= {right:0, wrong:0}
    for (let i = 0; i < queData.length; i++) {
      const que = queData[i];
      var ans = false;
      for (let j = 0; j < que.options.length; j++) {
        var option = que.options[j];
        if(option.is_correct && option.user_ans){
          ans = true;
          break; 
        }
      }
      if(ans){
        res.right+=1
      }else{
        res.wrong+=1
      }
    }
    setScore(res);
  }
  function onSubmitBtn() {
    alert('are you sure to submit')
    setAns(true)
    calculate()
  }
  return (
    <div>
      <Header />
      <div className="container mt-5">
        <div className="d-flex justify-content-center row">
          <div className="col-md-10 col-lg-10">
            {
              (queData.length > 0) &&
              <div className="border">
                <div className="question bg-white p-3 border-bottom">
                  <div className="d-flex flex-row justify-content-between align-items-center mcq">
                    <h4>MCQ Quiz</h4><span>({queIndex + 1} of {queData.length})</span></div>
                </div>
                <div className="question bg-white p-3 border-bottom">
                  <div className="d-flex flex-row align-items-center question-title">
                    <h5 className="mt-1 ml-2">{queData[queIndex].question}</h5>
                  </div>
                  {queData[queIndex].options.map((option, optionIndex) => (
                    <div key={optionIndex + "option"} className="ans ml-2">
                      <label style={{ "color": ans && option.is_correct ? "green" : ans && option.user_ans ? "red" : "" }} className="radio">
                        <input
                          type="radio"
                          name={"name" + queData[queIndex].id}
                          id={"name" + optionIndex}
                          disabled={ans}
                          value={Boolean(option["user_ans"])}
                          onChange={(e) => onOptionSelect(e, queIndex, optionIndex)}
                          checked={Boolean(option["user_ans"])}
                        />{' '}
                        <span>{option.option}</span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
                  <button onClick={onPreviousClick} className="btn btn-primary d-flex align-items-center btn-danger" type="button">
                    <i className="fa fa-angle-left mt-1 mr-1"></i>&nbsp;previous
                  </button>
                  <div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                      <button onClick={onNextClick} className="btn btn-primary" type="button">Next</button>
                      <button onClick={onSubmitBtn} className="btn btn-success me-md-2" type="button">Submit</button>
                    </div>
                  </div>

                </div>
              </div>
            }
          </div>
        </div>
      </div>
      {
        ans && score ? <>
          <div className="card container  mt-5" style={{ "width": "1000px" }}>
            <div className="card-body">
              <h3 style={{'text-align':'center'}}>You have scored {score.right } out of { queData.length}</h3>
            </div>
          </div>
        </> : <></>

      }


      {/* <Footer /> */}
    </div>
  )
}

export default Exam