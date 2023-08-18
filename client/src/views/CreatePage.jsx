import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

//1. form input : onChange, useState
//2. send api: axios
//3. logic after create: navigate

const CreatePage = () => {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [salary, setSalary] = useState("")
  const [isRemote, setIsRemote] = useState(false)
  const navigate = useNavigate()

  const [errorList, setErrorList] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`http://localhost:8000/api/jobs`, {title, company, salary, isRemote})
    .then(res =>{
      const createdJob = res.data
      navigate(`/jobs/${createdJob._id}`)
    })
    .catch(err => {
      const errResponseData = err.response.data.errors
      const tempErrArr = []
      for(const eachKey in errResponseData) {
        tempErrArr.push(errResponseData[eachKey].message)
      }
      setErrorList(tempErrArr)
    })
  }

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input className='form-control' type='text' name='title' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Company:</label>
          <input className='form-control' type='text' name='company' value={company} onChange={e => setCompany(e.target.value)} />
        </div>
        <div>
          <label>Salary:</label>
          <input className='form-control' type='number' name='salary' value={salary} onChange={e => setSalary(e.target.value)} />
        </div>
        <div>
          <label>Remote</label>
          <input type='checkbox' name='isRemote' value={isRemote} onChange={e => setIsRemote(e.target.checked)} />
        </div>
    <button type='submit'className='btn btn-success'>Create Job</button>
    <Link to='/' className='btn btn-secondary'>Cancel</Link>
    {
      errorList.map((eachErr, idx) => (

        <p style={{color: "red"}} key={idx}>{eachErr}</p>
        ) )
    }
      </form>
    </div>
  )
}

export default CreatePage