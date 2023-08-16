import { useFormik } from "formik";
import React from "react";
import { object, string, number, date, InferType } from "yup";

const initialValues = {
  name: "Hridoy",
  email: "",
  channel: "",
};
const onSubmit = (values) => {};
//validation for all field
const validationSchema = object({
  // use min and max for the string controls. if 3 then ok if greter than 50 then too long
  name: string()
    .min(3, "too short")
    .max(50, "too long")
    .trim("can,t use space in username")
    .required("Required"),
  email: string().email("Invalid Format").required("Required"),
  channel: string().required("Required"),
});

// const validation = (values) => {
//   let errors = {};

//   if (!values.name) {
//     errors.name = "Required";
//   }

//   if (!values.email) {
//     errors.email = "Required";
//   } else if (
//     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
//   ) {
//     errors.email = "Ivalid email format";
//   }

//   if (!values.channel) {
//     errors.channel = "Required";
//   }

//   return errors;
// };

export default function YouTubeForm() {
  //useFormik take paramerer as an object
  const formik = useFormik({
    initialValues,
    onSubmit,
    //validate: validation,
    validationSchema,
  });
  console.log("Visited Field", formik.touched);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            //update values of object
            onChange={formik.handleChange}
            //pass to the from field
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            name="channel"
            onChange={formik.handleChange}
            // particular field for visited information
            onBlur={formik.handleBlur}
            value={formik.values.channel}
          />
          {formik.touched.channel && formik.errors.channel ? (
            //div for show error message and add className for css
            <div className="error">{formik.errors.channel}</div>
          ) : null}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
