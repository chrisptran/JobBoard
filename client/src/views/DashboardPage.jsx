import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//1. call api on load: axios, useEffect
//2. variable change: useState
//3. links: Link

const DashboardPage = () => {

  const [jobList, setJobList] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/api/jobs`)
    .then(res => {
      setJobList(res.data)
    })
    .catch(err => console.log(err))
  }, [])

  const handleDelete = (deleteId) => {
    axios.delete(`http://localhost:8000/api/jobs/${deleteId}`)
    .then(res => {
      const updatedList = jobList.filter((eachJob) => eachJob._id !== deleteId)
      setJobList(updatedList)
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <p><Link to="/jobs/new">Create new jobs</Link></p>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Salary</th>
            <th>Remote</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            jobList.map((eachJob, idx) => (
              <tr key={idx}>
                <td><Link to={`/jobs/${eachJob._id}`}> {eachJob.title}</Link></td>
                <td>{eachJob.company}</td>
                <td>{eachJob.salary}</td>
                <td>{eachJob.isRemote ? "Yes" : "No"}</td>
                <td>
                  <Link to={`/jobs/edit/${eachJob._id}`} className='btn btn-success'> Edit</Link>
                  <button className='btn btn-danger' onClick={() => handleDelete(eachJob._id)}>Delete</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default DashboardPage