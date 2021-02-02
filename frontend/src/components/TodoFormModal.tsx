import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Typography } from '@material-ui/core';
import keyboardService from '../services/keyboard'
import { makeStyles, Modal } from '@material-ui/core';
import { TemporaryTodo, PeriodicTodo, FormValues } from '../types';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3), 
    outline: 0,
    borderRadius: 5,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  buttonContainer: {
    display: 'flex',
  },
  edgeButton: {
    flex: 1,
  },
  centerButton: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  textField: {
    marginBottom: 10
  }
}))

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Name is required'),
  desiredIntervalDays: yup
    .number()
    .min(1, 'interval should be of minimum 1 days')
    .required('interval days is required'),
});

interface Props {
  todoType: 'periodic' | 'temporary'
  open: boolean
  handleClose: () => void
  selectedTodo: TemporaryTodo | PeriodicTodo | null
  handleSubmit: (values: FormValues) => void
  handleDelete: (id: number) => void
}
const initialValues = {
  name: '',
  desiredIntervalDays: 1,
  deadline: format(new Date(), "yyyy-MM-dd'T'HH:mm")
}
const CreateTodo: React.FC<Props> = ({ todoType, open, handleClose, selectedTodo, handleSubmit, handleDelete }) => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  useEffect(() => {
    if (selectedTodo) {
      formik.setFieldValue('name', selectedTodo.name)
      if ('deadline' in selectedTodo) {
        formik.setFieldValue('deadline', format(selectedTodo.deadline, "yyyy-MM-dd'T'HH:mm"))
      }
      if ('desiredIntervalDays' in selectedTodo) {
        formik.setFieldValue('desiredIntervalDays', selectedTodo.desiredIntervalDays)
      }
    } else {
      formik.resetForm()
      formik.setFieldValue('deadline', format(new Date(), "yyyy-MM-dd'T'HH:mm"))
    }
  }, [open])
  const toggleKeyboard = () => {
    keyboardService.get('/toggle_keyboard')
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.container}>
        <Typography className={classes.textField} variant='h5'>{todoType === 'temporary' ? '一回': '繰り返し'}タスクの{selectedTodo ? '編集' : '追加'}</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            className={classes.textField}
            fullWidth
            variant='outlined'
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
                className={classes.textField}
                fullWidth
                variant='outlined'
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
                className={classes.textField}
                variant='outlined'
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
            <Button size='large' className={classes.edgeButton} color="primary" variant="contained" type="submit">
              {selectedTodo ? '更新' : '追加'}
            </Button>
            {selectedTodo && 
              <Button size='large' className={classes.centerButton} color="secondary" variant="contained" onClick={()=>{handleDelete(selectedTodo.id)}}>
                削除
              </Button>
            }
            <Button size='large' className={classes.edgeButton} color="secondary" variant="contained" onClick={handleClose}>
              キャンセル
            </Button>
          </div>
        </form>
      </div>

    </Modal>
  );
};

export default CreateTodo;