import React from 'react';
import { format, parseJSON, sub } from 'date-fns';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, FormControl, FormControlLabel, Radio, RadioGroup, FormLabel } from '@material-ui/core';
import todoService from '../services/todo'
import keyboardService from '../services/keyboard'
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
      todoType: 'temporary',
      name: '',
      desiredIntervalDays: 1,
      deadline: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (values.todoType === 'temporary') {
        await todoService.create('/temporary_todos', {
          name: values.name,
          deadline: sub(parseJSON(`${values.deadline}:00`), { hours: 9 })
        })
      } else {
        await todoService.create('/periodic_todos', {
          name: values.name,
          desired_interval_days: values.desiredIntervalDays,
          last_updated_at: null
        })
      }
      history.push('/')
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Todo type</FormLabel>
          <RadioGroup row aria-label="todo type" name="todoType" value={formik.values.todoType} onChange={formik.handleChange}>
            <FormControlLabel value="temporary" control={<Radio />} label="Temporary" />
            <FormControlLabel value="periodic" control={<Radio />} label="Periodic" />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onFocus={() => {
            keyboardService.get('/keyboard_on')
          }}
          onBlur={() => {
            keyboardService.get('/keyboard_off')
          }}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        {
          formik.values.todoType === 'temporary' ? 
            <TextField
              id="deadline"
              name="deadline"
              label="deadline"
              type="datetime-local"
              value={formik.values.deadline}
              onChange={formik.handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            /> :
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
        }
        <Button color="primary" variant="contained" fullWidth type="submit">
          Add
        </Button>
      </form>
    </div>
  );
};

export default CreateTodo;