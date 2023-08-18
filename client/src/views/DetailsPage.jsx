import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'

//1. get id from params : useParams
//2. use the id to send api and display onload: axios, useEffect
//3. variable change: useState

const DetailsPage = () => {

  const [job, setJob] = useState("")
const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs/${id}`)
    .then(res => setJob(res.data))
    .catch(err =>console.log(err))
  }, [id])

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/jobs/${id}`)
    .then(res => navigate(`/`))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <h3>Company: {job.company}</h3>
      <h3>Salary: {job.salary}</h3>
      <h3>Remote: {job.isRemote && "This is a remote position" }</h3>
      <Link to={`/jobs/edit/${id}`}>Edit</Link> |
      <Link to={`/`}>Back</Link> |
      <button type='button' className='btn btn-danger' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default DetailsPage