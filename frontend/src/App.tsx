import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import DataTable from './pages/DataTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dataTable" element={<DataTable />} />
      </Routes>
    </div>
  );
}

export default App; 