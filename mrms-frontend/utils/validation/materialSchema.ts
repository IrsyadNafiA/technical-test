import * as yup from 'yup';

// Yup Schema
export const addMaterialSchema = yup.object().shape({
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required('Item name is required'),
        quantity: yup
          .number()
          .min(1, 'Quantity must be at least 1')
          .required('Quantity is required'),
        description: yup.string().required('Description is required'),
      })
    )
    .min(1, 'At least one item is required'),
});

export const approvalMaterialSchema = yup.object().shape({
  status: yup.string().required('Status is required'),
})