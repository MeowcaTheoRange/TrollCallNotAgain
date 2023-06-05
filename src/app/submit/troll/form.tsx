"use client";

import Box from "@/components/Box/Box";
import { ErrorComponent } from "@/types/assist/formik";
import { SubmitTrollSchema } from "@/types/client/troll";
import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Form() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "TROLLCALL_NAME",
    "TROLLCALL_CODE",
  ]);
  const [h, sh] = useState(false);
  useEffect(() => sh(true), []);
  if (!h) return <></>; // [SEARCH: HACK] a hack, thanks react server/client hydration
  return (
    <>
      <Box title={`Submit Troll`} primary>
        <p>Allan please add details</p>
      </Box>
      <Formik
        initialValues={SubmitTrollSchema.cast(
          {},
          {
            assert: false,
          }
        )}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
        validationSchema={SubmitTrollSchema}
      >
        {({ values, isSubmitting, handleReset, handleSubmit }) => (
          <form onReset={handleReset} onSubmit={handleSubmit}>
            <Box title="identity" hr>
              <div className="section">
                <label htmlFor="name0">Name</label>
                <p>This is your troll's name.</p>
                <p className="note">
                  <p>Note: your troll will be indexed by its first name!</p>
                  <code>
                    /user/{cookies.TROLLCALL_NAME}
                    /troll/{(values.name ?? [""])[0]}
                  </code>
                </p>
                <div className="FieldGroup">
                  <Field
                    type="text"
                    name="name[0]"
                    id="name0"
                    placeholder="Karkat"
                  />
                  <Field
                    type="text"
                    name="name[1]"
                    id="name1"
                    placeholder="Vantas"
                  />
                </div>
                <ErrorMessage name="name" render={ErrorComponent} />
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
