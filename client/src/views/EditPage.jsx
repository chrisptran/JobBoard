import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'

//get details to pre-populate
//1. get id from params: useParams
//2. use id to get info from api: axios
//3. display info on load: useEffect
// creating the form
//4. form input: onChange, useState
//5. form submit: onSubmit
//6. send formdata into api: axios
//7. logic after update: useNavigate

const EditPage = () => {

  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [salary, setSalary] = useState("")
  const [isRemote, setIsRemote] = useState(false)
  const navigate = useNavigate()

  const [errorList, setErrorList] = useState([])

  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${id}`)
    .then(res => {
      const job = res.data
      setTitle(job.title)
      setCompany(job.company)
      setSalary(job.salary)
      setIsRemote(job.isRemote)
    })
    .catch(err => console.log(err))
  }, [id])

  

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put(`http://localhost:8000/api/jobs/${id}`, {title, company, salary, isRemote})
    .then(res => navigate(`/jobs/${id}`))
    .catch(err => {
      const errResponseData = err.response.data.errors
      const tempErrArr = []
      for(const eachKey in errResponseData) {
        tempErrArr.push(errResponseData[eachKey].message)
      }
      setErrorList(tempErrArr)
    })
  }

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/jobs/${id}`)
    .then(res => navigate(`/`))
    .catch(err => console.log(err))
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
    <button type='submit'className='btn btn-success'>Update Job</button>
    <Link to='/' className='btn btn-secondary'>Cancel</Link>
    <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
    {
      errorList.map((eachErr, idx) => (

        <p style={{color: "red"}} key={idx}>{eachErr}</p>
        ) )
    }
      </form>
    </div>
  )
}

export default EditPage