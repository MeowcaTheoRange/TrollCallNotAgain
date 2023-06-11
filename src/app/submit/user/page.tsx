"use client";

import Box from "@/components/Box/Box";
import ColorChip from "@/components/ColorChip/ColorChip";
import DebugBox from "@/components/DebugBox/DebugBox";
import Flexbox from "@/components/Flexbox/Flexbox";
import LengthLimiter from "@/components/LengthLimiter/LengthLimiter";
import SignBadge from "@/components/SignBadge/SignBadge";
import { TrueSign, TrueSignList } from "@/types/assist/extended_zodiac";
import { ErrorComponent } from "@/types/assist/formik";
import { GiveUserCookies } from "@/types/assist/utility";
import { SubmitUser, SubmitUserSchema } from "@/types/client/user";
import { ServerUser } from "@/types/user";
import { ErrorMessage, Field, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

export default function Form({ params }: { params?: { user: SubmitUser } }) {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies();
  return (
    <>
      <Box title={`Submit User`} primary>
        <p>Allan please add details</p>
      </Box>
      <Formik
        initialValues={SubmitUserSchema.cast(
          params?.user ?? { color: [0, 0, 0] },
          { assert: false }
        )}
        onSubmit={(values, { setSubmitting }) => {
          fetch("/api/user/", {
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
            router.push("/user/" + values.name);
          });
        }}
        validationSchema={SubmitUserSchema}
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
            <DebugBox text={values} />
            <Box title="identity" hr>
              <div className="section">
                <label htmlFor="name">Name</label>
                <p>This is your username.</p>
                <div className="note">
                  <p>Note: Your user page will be indexed by this name!</p>
                  <code>/user/{(values.name ?? "").toLowerCase()}</code>
                </div>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    placeholder="JohnnyDoefor"
                  />
                </div>
                <p>
                  <LengthLimiter
                    current={values.name?.length ?? 0}
                    max={50}
                    min={3}
                  />
                </p>
                <ErrorMessage name="name" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="description">DESCRIPTION</label>
                <p>Tell us about yourself!</p>
                <div className="FieldHolder">
                  <Field
                    as="textarea"
                    name="description"
                    id="description"
                    placeholder="Lorem ipsum dolor sit amet..."
                  />
                </div>
                <p>
                  <LengthLimiter
                    current={values.description?.length ?? 0}
                    max={10000}
                  />
                </p>
                <ErrorMessage name="description" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="url">URL</label>
                <p>
                  This is a link to any external services you can be found on,
                  like <b>Mastodon</b> or <b>Linktree</b>.
                </p>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="url"
                    id="url"
                    placeholder="https://karkatdyinginagluetrap.com/@carcinoGeneticist"
                  />
                </div>
                <ErrorMessage name="url" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="trueSign">TRUE SIGN</label>
                <p>
                  This is your{" "}
                  <Link href="/hiveswap/truesign/...">True Sign</Link>.
                </p>
                <div className="FieldHolder">
                  <Field as="select" name="trueSign" id="trueSign">
                    {TrueSignList.map((v, i) => (
                      <option
                        key={i}
                        value={v}
                        label={
                          v +
                          (v === TrueSign[v].color.sign
                            ? " (" + TrueSign[v].color.dates.join("–") + ")"
                            : "")
                        }
                      />
                    ))}
                  </Field>
                </div>
                {TrueSign[values.trueSign] == null ? (
                  <></>
                ) : (
                  <SignBadge trueSign={TrueSign[values.trueSign]} />
                )}
                <ErrorMessage name="trueSign" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="color0">COLOR</label>
                <p>This is your page's color.</p>
                <div className="FieldGroup">
                  <Field
                    type="number"
                    name="color[0]"
                    id="color0"
                    placeholder="Red"
                    max="255"
                    min="0"
                  ></Field>
                  <Field
                    type="number"
                    name="color[1]"
                    id="color1"
                    placeholder="Green"
                    max="255"
                    min="0"
                  ></Field>
                  <Field
                    type="number"
                    name="color[2]"
                    id="color2"
                    placeholder="Blue"
                    max="255"
                    min="0"
                  ></Field>
                </div>
                <div className="note">
                  #
                  {values.color
                    .map((x) => x.toString(16).padStart(2, "0"))
                    .join("")}
                </div>
                <ColorChip mainColor={values.color} />
                <ErrorMessage name="color" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="code">CODE</label>
                <p>
                  The code TrollCall will use to "authenticate" you. If left
                  empty, TrollCall will generate a random one for you. This can
                  be found in your browser's cookies.
                </p>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="code"
                    id="code"
                    placeholder="DQMmJLeK"
                  />
                </div>
                <ErrorMessage name="code" render={ErrorComponent} />
              </div>
            </Box>
            <Box title="Form Config">
              <p>{Object.keys(values).length} fields completed</p>
              <Flexbox
                direction="row"
                gap="8px"
                justify="flex-end"
                align="center"
              >
                <button type="reset" disabled={isSubmitting}>
                  Reset
                </button>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </Flexbox>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
