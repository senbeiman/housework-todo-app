import React from 'react';
import { format, parseJSON, sub } from 'date-fns';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@material-ui/core';
import todoService from '../services/todo'
import keyboardService from '../services/keyboard'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    margin: 10,
  },
  root: {
    fontSize: '2rem'
  },
  buttonContainer: {
    display: 'flex',
  },
  createButton: {
    flex: 1,
    margin: 10
  },
  cancelButton: {
    flex: 1,
    margin: 10
  }
})

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  desiredIntervalDays: yup
    .number()
    .min(1, 'interval should be of minimum 1 days')
    .required('interval days is required'),
});

const CreateTodo: React.FC<{todoType: 'periodic' | 'temporary'}> = ({ todoType }) => {
  const history = useHistory()
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      name: '',
      desiredIntervalDays: 1,
      deadline: format(new Date(), "yyyy-MM-dd'T'HH:mm")
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (todoType === 'temporary') {
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
  const toggleKeyboard = () => {
    keyboardService.get('/toggle_keyboard')
  }

  return (
    <div className={classes.container}>
      <Typography variant='h5'>{todoType === 'temporary' ? '一回': '繰り返し'}タスクの追加</Typography>
      <form className={classes.root} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="タスク名"
          value={formik.values.name}
          onChange={formik.handleChange}
          onFocus={toggleKeyboard}
          onBlur={toggleKeyboard}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        {
          todoType === 'temporary' ? 
            <TextField
              fullWidth
              id="deadline"
              name="deadline"
              label="期限"
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
              label="周期(日)"
              type="number"
              value={formik.values.desiredIntervalDays}
              onChange={formik.handleChange}
              onFocus={toggleKeyboard}
              onBlur={toggleKeyboard}
              error={formik.touched.desiredIntervalDays && Boolean(formik.errors.desiredIntervalDays)}
              helperText={formik.touched.desiredIntervalDays && formik.errors.desiredIntervalDays}
            />
        }
        <div className={classes.buttonContainer}>
          <Button size='large' className={classes.createButton} color="primary" variant="contained" type="submit">
            追加
          </Button>
          <Button size='large' className={classes.cancelButton} color="secondary" variant="contained" component={Link} to="/">
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTodo;