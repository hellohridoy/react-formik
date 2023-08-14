import { useFormik } from "formik";
import React from "react";
export default function YouTubeForm() {
  //useFormik take paramerer as an object
  const formik = useFormik({
    initialValues: {
      name: "Hridoy",
      email: "",
      channel: "",
    },
  });
  console.log("Form value", formik.values);
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          name="channel"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.channel}
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}