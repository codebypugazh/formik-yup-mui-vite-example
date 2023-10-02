import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import * as Yup from "yup";

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, "Minnimum 3 char")
        .max(10, "max 10 char")
        .required("Please enter name"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Please enter email"),
    }),
    onSubmit: (values, { onSubmit, setSubmitting }) => {
      setTimeout(() => {
        //API Call Here....
        console.log(values);
        formik.resetForm();
        setSubmitting(false);
      }, 3000);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            maxWidth: 250,
            margin: "20px auto",
          }}
        >
          <TextField
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && !!formik.errors.name}
            helperText={formik.touched.name && formik.errors.name}
            label="Name"
          />
          <TextField
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
            label="Email"
          />
          <LoadingButton
            loading={formik.isSubmitting}
            type="submit"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </div>
      </form>
    </>
  );
}

export default App;
