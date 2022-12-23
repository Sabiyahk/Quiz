import React from 'react'
import { useNavigate } from 'react-router-dom';
const Card = (props) => {
    const navigate = useNavigate();

 function   btnHandler(){
        navigate("/exams/"+props.exam.id+"/")
    }
    return (
        <div className="col-4">
            <div className="card  shadow-lg p-3 mb-5 bg-white rounded">
                <img src={props.exam.icon} className="card-img-top" alt="..." style={{"width":"50px", "hight":"50px"}} />
                <div className="card-body">
                    <h5 className="card-title">{props.exam.exam_name}</h5>
                    <button onClick={btnHandler} className="btn btn-primary">Take Exam</button>
                </div>
            </div>

        </div>

    )
}

export default Card





