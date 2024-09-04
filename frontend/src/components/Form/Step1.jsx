import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phoneNumber: Yup.string().required('Required'),
  address: Yup.object({
    line1: Yup.string().required('Required'),
    line2: Yup.string(),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    country: Yup.string().required('Required'),
  }).required('Required'),
});

function Step1({ onNext }) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: {
        line1: '',
        line2: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
      },
    },
    validationSchema,
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          {...formik.getFieldProps('name')}
          className="border"
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          {...formik.getFieldProps('email')}
          className="border"
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          {...formik.getFieldProps('phoneNumber')}
          className="border"
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="address.line1">Address Line 1</label>
        <input
          type="text"
          id="address.line1"
          name="address.line1"
          {...formik.getFieldProps('address.line1')}
          className="border"
        />
        {formik.touched.address?.line1 && formik.errors.address?.line1 ? (
          <div>{formik.errors.address.line1}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="address.line2">Address Line 2</label>
        <input
          type="text"
          id="address.line2"
          name="address.line2"
          {...formik.getFieldProps('address.line2')}
          className="border"
        />
      </div>
      <div>
        <label htmlFor="address.city">City</label>
        <input
          type="text"
          id="address.city"
          name="address.city"
          {...formik.getFieldProps('address.city')}
          className="border"
        />
        {formik.touched.address?.city && formik.errors.address?.city ? (
          <div>{formik.errors.address.city}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="address.state">State</label>
        <input
          type="text"
          id="address.state"
          name="address.state"
          {...formik.getFieldProps('address.state')}
          className="border"
        />
        {formik.touched.address?.state && formik.errors.address?.state ? (
          <div>{formik.errors.address.state}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="address.pincode">Pincode</label>
        <input
          type="text"
          id="address.pincode"
          name="address.pincode"
          {...formik.getFieldProps('address.pincode')}
          className="border"
        />
        {formik.touched.address?.pincode && formik.errors.address?.pincode ? (
          <div>{formik.errors.address.pincode}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="address.country">Country</label>
        <input
          type="text"
          id="address.country"
          name="address.country"
          {...formik.getFieldProps('address.country')}
          className="border"
        />
        {formik.touched.address?.country && formik.errors.address?.country ? (
          <div>{formik.errors.address.country}</div>
        ) : null}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Next</button>
    </form>
  );
}

export default Step1;
