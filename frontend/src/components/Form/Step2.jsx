import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

const validationSchema = Yup.object({
  files: Yup.array().of(Yup.mixed().required('Required')).max(3, 'Cannot upload more than 3 files'),
});

function Step2({ onNext, onPrevious }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const formik = useFormik({
    initialValues: { files: [] },
    validationSchema,
    onSubmit: (values) => {
      onNext({ files: selectedFiles });
    },
  });

  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="files">Upload Files (PNG, PDF, up to 3)</label>
        <input
          type="file"
          id="files"
          name="files"
          multiple
          onChange={handleFileChange}
          className="border"
        />
        {formik.errors.files && <div className="text-red-500">{formik.errors.files}</div>}
      </div>
      <button type="button" onClick={onPrevious} className="bg-gray-500 text-white p-2">Previous</button>
      <button type="submit" className="bg-blue-500 text-white p-2">Next</button>
      </form>
  );
}

export default Step2;