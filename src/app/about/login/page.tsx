"use client";

import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import "@/styles/form.css";
import { GiveUserCookies } from "@/types/assist/utility";
import { ServerUser } from "@/types/user";
import { Field, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function LogOut() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <>
      <Box title="LOGGING IN">
        <p>Enter your username and user code:</p>
        <Formik
          initialValues={{}}
          onSubmit={(values, { setSubmitting }) => {
            fetch("/api/about/login/", {
              method: "POST",
              body: JSON.stringify(values),
            }).then(async (res) => {
              if (res.status !== 200) {
                alert(await res.text());
                setSubmitting(false);
                return;
              }
              const user: ServerUser = await res.json();
              GiveUserCookies(setCookie, user.name, user.code);
              window.location.href = "/";
            });
          }}
        >
          {({
            values,
            isSubmitting,
            handleChange,
            handleBlur,
            handleReset,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onReset={handleReset} onSubmit={handleSubmit}>
              <div className="section">
                <label htmlFor="name">Name</label>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="JohnnyDoefor"
                  />
                </div>
              </div>
              <div className="section">
                <label htmlFor="code">Code</label>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="code"
                    id="code"
                    placeholder="DQMmJLeK"
                  />
                </div>
              </div>
              <Flexbox
                direction="row"
                gap="8px"
                justify="flex-end"
                align="center"
              >
                <button type="submit" disabled={isSubmitting}>
                  Log In
                </button>
              </Flexbox>
            </form>
          )}
        </Formik>
      </Box>
    </>
  );
}
