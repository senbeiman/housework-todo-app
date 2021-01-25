import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import todoService from '../services/todo'
import { useHistory } from 'react-router-dom';

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  desiredIntervalDays: yup
    .number()
    .min(1, 'interval should be of minimum 1 days')
    .required('interval days is required'),
});

const CreateTodo: React.FC = () => {
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      name: '',
      desiredIntervalDays: 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await todoService.create('/periodic_todos', {
        name: values.name,
        desired_interval_days: values.desiredIntervalDays,
        last_updated_at: null
      })
      history.push('/')
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="desiredIntervalDays"
          name="desiredIntervalDays"
          label="desired interval days"
          type="number"
          value={formik.values.desiredIntervalDays}
          onChange={formik.handleChange}
          error={formik.touched.desiredIntervalDays && Boolean(formik.errors.desiredIntervalDays)}
          helperText={formik.touched.desiredIntervalDays && formik.errors.desiredIntervalDays}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;