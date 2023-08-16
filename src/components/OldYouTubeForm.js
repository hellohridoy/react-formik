import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import React from "react";
import { object, string } from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  channel: "",
  comments: "",
  address: "",
  social: {
    facebook: "",
    twitter: "",
  },
  phoneNumber: ["", ""],
  phNumber: [""],
};
const onSubmit = (values) => {
  console.log(values);
};

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

const validateComments = (value) => {
  let error;
  if (!value) {
    error = "Required";
  }
  return error;
};

export default function OldYouTubeForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      //   validateOnChange={false}
      //   validateOnBlur={false}
    >
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="channel">Channel</label>
          <Field type="text" id="channel" name="channel" />
          <ErrorMessage name="channel" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          <Field
            component="textarea"
            id="comments"
            name="comments"
            validate={validateComments}
          />
          <ErrorMessage name="comments" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="address">Address</label>
          <FastField name="address">
            {(props) => {
              const { field, form, meta } = props;
              console.log("Render props", props);
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </FastField>
          <ErrorMessage name="channel" />
        </div>
        <div className="form-control">
          <label htmlFor="facebook">Facebook profile</label>
          <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className="form-control">
          <label htmlFor="twitter">Twitter profile</label>
          <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className="form-control">
          <label htmlFor="primaryPh">Primary phone number</label>
          <Field type="text" id="primaryPh" name="phoneNumber[0]" />
        </div>

        <div className="form-control">
          <label htmlFor="secondaryPh">Secondary phone number</label>
          <Field type="text" id="secondaryPh" name="phoneNumber[1]" />
        </div>

        <div className="form-control">
          <label>List of Phone Number</label>
          <FieldArray name="phNumber">
            {(fieldArrayProps) => {
              //console.log("fieldArrayProps", fieldArrayProps);
              const { push, remove, form } = fieldArrayProps;
              const { values } = form;
              const { phNumber } = values;
              console.log("Form errors", form.errors);
              return (
                <div>
                  {phNumber.map((phNumber, index) => (
                    <div key={index}>
                      <Field name={`phNumber[${index}]`} />
                      {index > 0 && (
                        <button type="button" onClick={() => remove(index)}>
                          {" "}
                          -{" "}
                        </button>
                      )}

                      <button type="button" onClick={() => push("")}>
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  ))}
                </div>
              );
            }}
          </FieldArray>
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
}
