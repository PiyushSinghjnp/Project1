import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  selectedOptions: Yup.array().of(Yup.string()).required('Required'),
});

function Step3({ onSubmit, onPrevious }) {
  const formik = useFormik({
    initialValues: { selectedOptions: [] },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleChange = (event) => {
    const { options } = event.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
    formik.setFieldValue('selectedOptions', selectedOptions);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="selectedOptions">Select Options</label>
        <select
          id="selectedOptions"
          name="selectedOptions"
          multiple
          onChange={handleChange}
          className="border"
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        {formik.errors.selectedOptions && <div className="text-red-500">{formik.errors.selectedOptions}</div>}
      </div>
      <button type="button" onClick={onPrevious} className="bg-gray-500 text-white p-2">Previous</button>
      <button type="submit" className="bg-blue-500 text-white p-2">Submit</button>
    </form>
  );
}

export default Step3;
