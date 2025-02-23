import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { Formik, Form } from 'formik';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ProfileSchema } from '../components/forms/ValidationSchemas';

export const MyProfile: React.FC = () => {
  const initialValues = {
    firstName: 'Adrian',
    lastName: 'Stefan',
    email: 'adrian@mrfertility.co.za',
    phone: '+27 123 4567',
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Card>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                // Handle form submission
                console.log('Form values:', values);
                await new Promise((resolve) => setTimeout(resolve, 1000));
              } catch (error) {
                console.error('Submission error:', error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="firstName"
                      label="First Name"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="lastName"
                      label="Last Name"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone"
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LoadingButton
                      loading={isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      Save Changes
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};