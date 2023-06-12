"use client";

import Box from "@/components/Box/Box";
import DebugBox from "@/components/DebugBox/DebugBox";
import Flexbox from "@/components/Flexbox/Flexbox";
import LengthLimiter from "@/components/LengthLimiter/LengthLimiter";
import SignBadge from "@/components/SignBadge/SignBadge";
import "@/components/shell/Dialoglog/Dialoglog.css";
import {
  ClassNameList,
  TrueSign,
  TrueSignList,
} from "@/types/assist/extended_zodiac";
import { ErrorComponent } from "@/types/assist/formik";
import {
  AgeConverter,
  HeightConverter,
  ProperNounCase,
} from "@/types/assist/language";
import { SubmitTrollSchema } from "@/types/client/troll";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function TrollSubmit() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies([
    "TROLLCALL_NAME",
    "TROLLCALL_CODE",
  ]);
  const [h, sh] = useState(false);
  let ImageElement;
  useEffect(() => sh(true), []);
  if (!h) return <></>; // [SEARCH: HACK] a hack, thanks react server/client hydration
  return (
    <>
      <Box title={`Submit Troll`} primary>
        <p>Allan please add details</p>
      </Box>
      <Formik
        initialValues={SubmitTrollSchema.cast(
          {
            owners: [],
            pronouns: [["", "", ""]],
            preferences: {
              love: ["", "", ""],
              hate: ["", "", ""],
            },
            facts: ["", "", ""],
            trueSign: "Aries",
            class: "Witch",
          },
          {
            assert: false,
          }
        )}
        onSubmit={(values, { setSubmitting }) => {
          fetch("/api/troll/", {
            method: "POST",
            body: JSON.stringify(values),
          }).then(async (res) => {
            if (res.status !== 200) {
              alert(await res.text());
              setSubmitting(false);
              return;
            }
            router.push(
              "/user/" + cookies.TROLLCALL_NAME + "/troll/" + values.name[0]
            );
          });
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
          setFieldValue,
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
                    /troll/{(values.name ?? [""])[0].toLowerCase()}
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
              <div className="section">
                <label htmlFor="textColor0">TEXT COLOR</label>
                <button
                  type="button"
                  onClick={() => setFieldValue("textColor", undefined)}
                >
                  Remove Text Color
                </button>
                <p>This is your troll's text color.</p>
                <div className="FieldGroup">
                  <Field
                    type="number"
                    name="textColor[0]"
                    id="textColor0"
                    placeholder="Red"
                    max="255"
                    min="0"
                  ></Field>
                  <Field
                    type="number"
                    name="textColor[1]"
                    id="textColor1"
                    placeholder="Green"
                    max="255"
                    min="0"
                  ></Field>
                  <Field
                    type="number"
                    name="textColor[2]"
                    id="textColor2"
                    placeholder="Blue"
                    max="255"
                    min="0"
                  ></Field>
                </div>
                {values.textColor ? (
                  <>
                    <div className="note">
                      #
                      {values.textColor
                        .map((x) => (+x).toString(16).padStart(2, "0"))
                        .join("")}
                    </div>
                    <div className="Dialoglog">
                      <span
                        style={{
                          color:
                            "#" +
                            values.textColor
                              .map((x) => (+x).toString(16).padStart(2, "0"))
                              .join(""),
                        }}
                      >
                        Blah blah blah.
                      </span>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <ErrorMessage name="textColor" render={ErrorComponent} />
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
                <div className="note">
                  {ProperNounCase((values.name ?? [""])[0])} is a{" "}
                  <b>
                    {values.class} of {TrueSign[values.trueSign].aspect.name}
                  </b>
                  .
                </div>
                <ErrorMessage name="class" render={ErrorComponent} />
              </div>
              <hr />
              <div className="section">
                <label htmlFor="preferences.love0">PREFERENCES</label>
                <p>Opinions that your troll displays about certain things.</p>
                <hr />
                <h3>♥️ LOVES</h3>
                <p>What does your troll prefer?</p>
                <FieldArray
                  name="preferences.love"
                  render={(arrfunc) =>
                    values.preferences.love &&
                    values.preferences.love.length > 0 ? (
                      values.preferences.love.map(
                        (preferenceLoveSet, index) => (
                          <div key={index} className="FieldHolder">
                            <Field
                              type="text"
                              name={`preferences.love[${index}]`}
                              id={`preferences.love${index}`}
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
                              current={preferenceLoveSet.length}
                              min={10}
                              max={100}
                            />
                          </div>
                        )
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          arrfunc.push("");
                        }}
                      >
                        Add Preference
                      </button>
                    )
                  }
                />
                <LengthLimiter
                  current={values.preferences.love?.length ?? 0}
                  min={3}
                  max={10}
                />
                <ErrorMessage name="preferences.love" render={ErrorComponent} />
                {/* ---- */}
                <h3>♠️ HATES</h3>
                <p>What does your troll not prefer?</p>
                <FieldArray
                  name="preferences.hate"
                  render={(arrfunc) =>
                    values.preferences.hate &&
                    values.preferences.hate.length > 0 ? (
                      values.preferences.hate.map(
                        (preferenceHateSet, index) => (
                          <div key={index} className="FieldHolder">
                            <Field
                              type="text"
                              name={`preferences.love[${index}]`}
                              id={`preferences.love${index}`}
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
                              current={preferenceHateSet.length}
                              min={10}
                              max={100}
                            />
                          </div>
                        )
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          arrfunc.push("");
                        }}
                      >
                        Add Preference
                      </button>
                    )
                  }
                />
                <LengthLimiter
                  current={values.preferences.hate?.length ?? 0}
                  min={3}
                  max={10}
                />
                <ErrorMessage name="preferences.hate" render={ErrorComponent} />
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
                <label htmlFor="image">IMAGE</label>
                <p>
                  This is URL linking to an image that will display on your
                  troll's page. I recommend using{" "}
                  <Link target="_blank" href="https://filegarden.com/">
                    File Garden
                  </Link>
                  .
                </p>
                <p>
                  The image should be <b>transparent</b> and trimmed around the
                  edges.
                </p>
                <div className="FieldHolder">
                  <Field
                    type="url"
                    name="image"
                    id="image"
                    placeholder="https://file.garden/..."
                  />
                </div>
                {values.image != null && values.image != "" ? (
                  <>
                    <img
                      id="ImageElement"
                      className="previewImage"
                      src={values.image}
                    ></img>
                    <div className="note">
                      {
                        (
                          document.querySelector(
                            "#ImageElement"
                          ) as HTMLImageElement
                        )?.naturalWidth
                      }
                      px x{" "}
                      {
                        (
                          document.querySelector(
                            "#ImageElement"
                          ) as HTMLImageElement
                        )?.naturalHeight
                      }
                      px
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <ErrorMessage name="image" render={ErrorComponent} />
              </div>
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
              <div className="section">
                <label htmlFor="policies.fanart">YOUR POLICIES</label>
                <p>What you allow others to do with your troll.</p>
                <hr />
                <h3>FANART</h3>
                <p>If others can make fanart of your troll.</p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="policies.fanart"
                    id="policies.fanart"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"yes"} label={"Yes"} />
                    <option value={"ask"} label={"Ask me"} />
                    <option value={"no"} label={"Not at all"} />
                  </Field>
                </div>
                <ErrorMessage name="policies.fanart" render={ErrorComponent} />
                {/* ---- */}
                <h3>FANART WITH OTHER CHARACTERS</h3>
                <p>
                  If others can make fanart of your troll alongside other
                  characters.
                </p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="policies.fanartOthers"
                    id="policies.fanartOthers"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"yes"} label={"Yes"} />
                    <option value={"ask"} label={"Ask me"} />
                    <option value={"no"} label={"Not at all"} />
                  </Field>
                </div>
                <ErrorMessage
                  name="policies.fanartOthers"
                  render={ErrorComponent}
                />
                {/* ---- */}
                <h3>KINNING</h3>
                <p>If others can publicly kin your troll.</p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="policies.kinning"
                    id="policies.kinning"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"yes"} label={"Yes"} />
                    <option value={"ask"} label={"Ask me"} />
                    <option value={"no"} label={"Not at all"} />
                  </Field>
                </div>
                <ErrorMessage name="policies.kinning" render={ErrorComponent} />
                {/* ---- */}
                <h3>SHIPPING</h3>
                <p>If others can ship your troll with other characters.</p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="policies.shipping"
                    id="policies.shipping"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"yes"} label={"Yes"} />
                    <option value={"ask"} label={"Ask me"} />
                    <option value={"no"} label={"Not at all"} />
                  </Field>
                </div>
                <ErrorMessage
                  name="policies.shipping"
                  render={ErrorComponent}
                />
                {/* ---- */}
                <h3>FANFICTION</h3>
                <p>If others can write fanfiction about your troll.</p>
                <div className="FieldHolder">
                  <Field
                    as="select"
                    name="policies.fanfiction"
                    id="policies.fanfiction"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value={"yes"} label={"Yes"} />
                    <option value={"ask"} label={"Ask me"} />
                    <option value={"no"} label={"Not at all"} />
                  </Field>
                </div>
                <ErrorMessage
                  name="policies.fanfiction"
                  render={ErrorComponent}
                />
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
