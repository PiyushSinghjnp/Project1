import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MultiStepForm from './components/Form/MultiStepForm';
import SubmissionTable from './components/SubmissionTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/form" element={<MultiStepForm />} />
        <Route path="/submissions" element={<SubmissionTable />} />
      </Routes>
    </Router>
  );
}

export default App;
