"use client";

import Box from "@/components/Box/Box";
import DebugBox from "@/components/DebugBox/DebugBox";
import LengthLimiter from "@/components/LengthLimiter/LengthLimiter";
import SignBadge from "@/components/SignBadge/SignBadge";
import {
  ClassNameList,
  TrueSign,
  TrueSignList,
} from "@/types/assist/extended_zodiac";
import { ErrorComponent } from "@/types/assist/formik";
import { AgeConverter, HeightConverter } from "@/types/assist/language";
import { SubmitTrollSchema } from "@/types/client/troll";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function TrollSubmit() {
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
          { pronouns: [] },
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
        {({
          values,
          isSubmitting,
          handleChange,
          handleBlur,
          handleReset,
          handleSubmit,
        }) => (
          <form onReset={handleReset} onSubmit={handleSubmit}>
            <DebugBox text={values} />
            <Box title="identity" hr>
              <div className="section">
                <label htmlFor="name0">Name</label>
                <p>This is your troll's name.</p>
                <div className="note">
                  <p>Note: your troll will be indexed by its first name!</p>
                  <code>
                    /user/{cookies.TROLLCALL_NAME}
                    /troll/{(values.name ?? [""])[0]}
                  </code>
                </div>
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
              <div className="section">
                <label htmlFor="pronunciation0">PRONUNCIATION</label>
                <p>This is how you pronounce your troll's name.</p>
                <div className="FieldGroup">
                  <Field
                    type="text"
                    name="pronunciation[0]"
                    id="pronunciation0"
                    placeholder="car-cat"
                  />
                  <Field
                    type="text"
                    name="pronunciation[1]"
                    id="pronunciation"
                    placeholder="van-tes"
                  />
                </div>
                <ErrorMessage name="pronunciation" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="username">USERNAME</label>
                <p>This is your troll's trolllog username.</p>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="username"
                    id="username"
                    placeholder="carcinoGeneticist"
                  />
                </div>
                <ErrorMessage name="username" render={ErrorComponent} />
              </div>
              <hr />
              <div className="section">
                <label htmlFor="gender">GENDER</label>
                <p>This is your troll's gender.</p>
                <div className="FieldHolder">
                  <Field
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Male"
                  />
                </div>
                <ErrorMessage name="gender" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="pronouns0_0">PRONOUNS</label>
                <p>These are your troll's pronouns.</p>
                <FieldArray
                  name="pronouns"
                  render={(arrfunc) =>
                    values.pronouns && values.pronouns.length > 0 ? (
                      values.pronouns.map((pronounSet, index) => (
                        <div key={index} className="FieldGroup">
                          <Field
                            type="text"
                            name={`pronouns[${index}][0]`}
                            id={`pronouns${index}_0`}
                            placeholder="he"
                          />
                          <Field
                            type="text"
                            name={`pronouns[${index}][1]`}
                            id={`pronouns${index}_1`}
                            placeholder="him"
                          />
                          <Field
                            type="text"
                            name={`pronouns[${index}][2]`}
                            id={`pronouns${index}_2`}
                            placeholder="his"
                          />
                          <button
                            type="button"
                            onClick={() => arrfunc.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              arrfunc.insert(index + 1, ["", "", ""])
                            }
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          arrfunc.push(["", "", ""]);
                          console.log(values.pronouns);
                        }}
                      >
                        Add Pronoun Set
                      </button>
                    )
                  }
                />
                <ErrorMessage name="pronouns" render={ErrorComponent} />
              </div>
              <hr />
              <div className="section">
                <label htmlFor="trueSign">TRUE SIGN</label>
                <p>
                  This is your troll's actual{" "}
                  <Link href="/hiveswap/truesign/...">True Sign</Link>.
                </p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="trueSign"
                    id="trueSign"
                    // initialValue={values.trueSign}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {TrueSignList.map((v, i) => (
                      <option key={i} value={v} label={v} />
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
                <label htmlFor="falseSign">FALSE SIGN</label>
                <p>
                  This is your troll's "fake" or "mask"{" "}
                  <Link href="/hiveswap/truesign/...">True Sign</Link>.
                </p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="falseSign"
                    id="falseSign"
                    // initialValue={values.trueSign}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={undefined} label="[None]" />
                    {TrueSignList.map((v, i) => (
                      <option key={i} value={v} label={v} />
                    ))}
                  </Field>
                </div>
                {values.falseSign == null ||
                TrueSign[values.falseSign] == null ? (
                  <></>
                ) : (
                  <SignBadge trueSign={TrueSign[values.falseSign]} />
                )}
                <ErrorMessage name="falseSign" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="class">CLASS</label>
                <p>
                  This is your troll's{" "}
                  <Link href="/hiveswap/class/...">Class</Link>.
                </p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="class"
                    id="class"
                    // initialValue={values.trueSign}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    {ClassNameList.map((v, i) => (
                      <option key={i} value={v} label={v} />
                    ))}
                  </Field>
                </div>
                <ErrorMessage name="class" render={ErrorComponent} />
              </div>
            </Box>
            <Box title="Physical" hr>
              <div className="section">
                <label htmlFor="height">HEIGHT</label>
                <p>This is your troll's height in inches.</p>
                <div className="FieldHolder">
                  <Field
                    type="number"
                    name="height"
                    id="height"
                    placeholder="60"
                  />
                  in
                </div>
                <div className="note">
                  {values.height &&
                  !Number.isNaN(values.height) &&
                  values.height != 0
                    ? HeightConverter(values.height)
                    : HeightConverter(60)}
                </div>
                <ErrorMessage name="height" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="age">AGE</label>
                <p>This is your troll's age in sweeps.</p>
                <div className="FieldHolder">
                  <Field type="number" name="age" id="age" placeholder="6" />
                  in
                </div>
                <div className="note">
                  {values.age && !Number.isNaN(values.age) && values.age != 0
                    ? AgeConverter(values.age, true)
                    : AgeConverter(6, true)}
                </div>
                <ErrorMessage name="age" render={ErrorComponent} />
              </div>
              <div className="section">
                <label htmlFor="species">SPECIES</label>
                <p>
                  This is your troll's species mix, if applicable. Kind of like
                  "troll-human" or "troll-cat" or whatever..
                </p>
                <div className="FieldHolder">
                  Troll
                  {values.species != null && values.species != "" ? "-" : ""}
                  <Field
                    type="text"
                    name="species"
                    id="species"
                    placeholder=""
                  />
                </div>
                <ErrorMessage name="species" render={ErrorComponent} />
              </div>
            </Box>
            <Box title="about" hr>
              <div className="section">
                <label htmlFor="description">DESCRIPTION</label>
                <p>
                  Tell us about your troll! Feel free to use this space for
                  lore. Or well, you should, if you have nothing else to talk
                  about.
                </p>
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
                <label htmlFor="facts0">FACTS</label>
                <p>Share some facts about your troll!</p>
                <FieldArray
                  name="facts"
                  render={(arrfunc) =>
                    values.facts && values.facts.length > 0 ? (
                      values.facts.map((factSet, index) => (
                        <div key={index} className="FieldHolder">
                          <Field
                            type="text"
                            name={`facts[${index}]`}
                            id={`facts${index}`}
                            placeholder="Lorem ipsum dolor sit amet..."
                          />
                          <button
                            type="button"
                            onClick={() => arrfunc.remove(index)}
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrfunc.insert(index + 1, "")}
                          >
                            +
                          </button>
                          <LengthLimiter
                            current={factSet.length}
                            min={10}
                            max={100}
                          />
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          arrfunc.push("");
                          console.log(values.facts);
                        }}
                      >
                        Add Fact
                      </button>
                    )
                  }
                />
                <LengthLimiter
                  current={values.facts?.length ?? 0}
                  min={3}
                  max={10}
                />
                <ErrorMessage name="facts" render={ErrorComponent} />
              </div>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
}
