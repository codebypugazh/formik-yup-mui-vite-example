import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minnimum 3 char")
    .max(10, "max 10 char")
    .required("Please enter name"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Please enter email"),
  mobile: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number")
    .required("Enter Mobile number"),
  gender: Yup.string().required("Select gender"),
});

function App() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      setTimeout(() => {
        //API Call Here....
        console.log(values);
        resetForm();
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
          <TextField
            name="mobile"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            error={formik.touched.mobile && !!formik.errors.mobile}
            helperText={formik.touched.mobile && formik.errors.mobile}
            label="Mobile"
          />

          <FormControl
            fullWidth
            error={formik.touched.gender && !!formik.errors.gender}
          >
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              value={formik.values.gender}
              name="gender"
              onChange={formik.handleChange}
              label="Gender"
            >
              <MenuItem value="">Select gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

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
