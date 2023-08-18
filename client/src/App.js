
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DashboardPage from './views/DashboardPage'
import CreatePage from './views/CreatePage'
import EditPage from './views/EditPage'
import DetailsPage from './views/DetailsPage'

function App() {
  return (
    <div className="container mt-5">
      <h1>Job Board</h1>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='/jobs/new' element={<CreatePage />} />
        <Route path='/jobs/edit/:id' element={<EditPage />} />
        <Route path='/jobs/:id' element={<DetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
