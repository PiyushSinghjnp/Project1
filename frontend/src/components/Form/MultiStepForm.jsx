import { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import axios from 'axios';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
    recordPartialData(data);
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (data) => {
    const finalData = { ...formData, ...data };
    try {
      await axios.post('/api/form/submit', finalData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Form submitted successfully');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const recordPartialData = async (data) => {
    try {
      await axios.post('/api/form/submit', data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {step === 1 && <Step1 onNext={handleNext} />}
      {step === 2 && <Step2 onNext={handleNext} onPrevious={handlePrevious} />}
      {step === 3 && <Step3 onSubmit={handleSubmit} onPrevious={handlePrevious} />}
    </div>
  );
}

export default MultiStepForm;
