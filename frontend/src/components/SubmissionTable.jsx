import { useState, useEffect } from 'react';
import axios from 'axios';

function SubmissionTable() {
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('/api/form/submissions', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter(submission => {
    const submissionDate = new Date(submission.createdAt);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (!search || submission.name.includes(search)) &&
           (!startDate || submissionDate >= start) &&
           (!endDate || submissionDate <= end);
  });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 ml-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 ml-2"
        />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Files</th>
            <th className="border p-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map(submission => (
            <tr key={submission._id}>
              <td className="border p-2">{submission.name}</td>
              <td className="border p-2">{submission.email}</td>
              <td className="border p-2">{new Date(submission.createdAt).toLocaleDateString()}</td>
              <td className="border p-2">
                {submission.files.join(', ')}
              </td>
              <td className="border p-2">
                {submission.selectedOptions.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubmissionTable;
