import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  taskName: Yup.string()
    .required('Task name is required')
    .min(2, 'Task name must be at least 2 characters')
    .max(20, 'Task name must not exceed 20 characters'),
  taskDescription: Yup.string()
    .required('Task description is required')
    .min(2, 'Task description must be at least 2 characters')
    .max(40, 'Task description must not exceed 40 characters'),
});
