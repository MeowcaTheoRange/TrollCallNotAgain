"use client";

import Box from "@/components/Box/Box";
import Flexbox from "@/components/Flexbox/Flexbox";
import LengthLimiter from "@/components/LengthLimiter/LengthLimiter";
import SignBadge from "@/components/SignBadge/SignBadge";
import "@/components/shell/Dialoglog/Dialoglog.css";
import { parseQuirk } from "@/lib/trollcall/quirks";
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
import { SubmitTroll, SubmitTrollSchema } from "@/types/client/troll";
import { QuirkReplacementTypes } from "@/types/quirks";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function TrollSubmit({
  params,
}: {
  params: { troll: SubmitTroll };
}) {
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
        <p>Submit one of your cool trolls to the site!</p>
      </Box>
      <Formik
        initialValues={SubmitTrollSchema.cast(
          params?.troll ?? {
            owners: [],
            pronouns: [["", "", ""]],
            preferences: {
              love: ["", "", ""],
              hate: ["", "", ""],
            },
            facts: ["", "", ""],
            trueSign: "Aries",
            class: "Witch",
            quirks: [["default", { quirk: [] }]],
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
                              name={`preferences.hate[${index}]`}
                              id={`preferences.hate${index}`}
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
                  about.{" "}
                  <Link href="https://commonmark.org/help/" target="_blank">
                    CommonMark
                  </Link>{" "}
                  Markdown is allowed.
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
            <Box title="Quirk Editor" hr>
              <div className="section">
                <label htmlFor="quirks0Key">QUIRK MODES</label>
                <p>
                  All of the different quirks your troll uses in certain
                  contexts, like being scared, drunk, etc.
                </p>
                <FieldArray
                  name="quirks"
                  render={(QuirkModeFunctions) =>
                    values.quirks && values.quirks.length > 0 ? (
                      <>
                        {values.quirks.map((QuirkMode, QuirkModeIndex) => (
                          <details open key={QuirkModeIndex}>
                            <summary>
                              <Flexbox gap="8px" align="center">
                                <div
                                  key={QuirkModeIndex}
                                  className="FieldHolder"
                                >
                                  <Field
                                    type="text"
                                    name={`quirks[${QuirkModeIndex}][0]`}
                                    id={`quirks${QuirkModeIndex}Key`}
                                    placeholder="Default..."
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      QuirkModeFunctions.remove(QuirkModeIndex)
                                    }
                                  >
                                    -
                                  </button>
                                </div>
                                <span>
                                  "
                                  {parseQuirk(
                                    "The quick brown fox jumps over the lazy dog.",
                                    values.quirks[QuirkModeIndex][1]
                                  )}
                                  "
                                </span>
                                <ErrorMessage
                                  name={`quirks[${QuirkModeIndex}][0]`}
                                  render={ErrorComponent}
                                />
                              </Flexbox>
                            </summary>
                            {/* 2nd recursion start */}
                            <div className="subsection">
                              <FieldArray
                                name={`quirks[${QuirkModeIndex}][1].quirk`}
                                render={(QuirkReplacementFunctions) =>
                                  values.quirks[QuirkModeIndex][1].quirk &&
                                  values.quirks[QuirkModeIndex][1].quirk
                                    .length > 0 ? (
                                    <>
                                      {values.quirks[
                                        QuirkModeIndex
                                      ][1].quirk.map(
                                        (
                                          QuirkReplacement,
                                          QuirkReplacementIndex
                                        ) => (
                                          <div
                                            className="subsection"
                                            key={QuirkReplacementIndex}
                                          >
                                            <label>
                                              Quirk Modifier #
                                              {QuirkReplacementIndex + 1}
                                            </label>
                                            <hr />
                                            <label>Type</label>
                                            <div className="FieldHolder">
                                              <Field
                                                as="select"
                                                name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].type`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                              >
                                                <option
                                                  value={"prefix"}
                                                  label={"Prefix"}
                                                />
                                                <option
                                                  value={"suffix"}
                                                  label={"Suffix"}
                                                />
                                                <option
                                                  value={"simple"}
                                                  label={"Simple replacement"}
                                                />
                                                <option
                                                  value={"regex"}
                                                  label={"RegExp replacement"}
                                                />
                                                <option
                                                  value={"case"}
                                                  label={"Change case"}
                                                />
                                                <option
                                                  value={"case_simple"}
                                                  label={
                                                    "Change case with simple replacement"
                                                  }
                                                />
                                                <option
                                                  value={"case_regex"}
                                                  label={
                                                    "Change case with RegExp replacement"
                                                  }
                                                />
                                                <option
                                                  value={"case_pos"}
                                                  label={
                                                    "Change case with position expression"
                                                  }
                                                />
                                              </Field>
                                            </div>
                                            <ErrorMessage
                                              name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].type`}
                                              render={ErrorComponent}
                                            />
                                            {QuirkReplacementTypes[
                                              values.quirks[QuirkModeIndex][1]
                                                .quirk[QuirkReplacementIndex]
                                                .type
                                            ].find ? (
                                              <>
                                                <label>Find</label>
                                                <p
                                                  style={{
                                                    whiteSpace: "pre-line",
                                                  }}
                                                >
                                                  {
                                                    QuirkReplacementTypes[
                                                      values.quirks[
                                                        QuirkModeIndex
                                                      ][1].quirk[
                                                        QuirkReplacementIndex
                                                      ].type
                                                    ].find
                                                  }
                                                </p>
                                                <div
                                                  key={QuirkReplacementIndex}
                                                  className="FieldHolder"
                                                >
                                                  <Field
                                                    type="text"
                                                    name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].find`}
                                                    placeholder="Find..."
                                                  />
                                                </div>
                                                <ErrorMessage
                                                  name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].find`}
                                                  render={ErrorComponent}
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            <label>Replace</label>
                                            <p
                                              style={{ whiteSpace: "pre-line" }}
                                            >
                                              {
                                                QuirkReplacementTypes[
                                                  values.quirks[
                                                    QuirkModeIndex
                                                  ][1].quirk[
                                                    QuirkReplacementIndex
                                                  ].type
                                                ].replace
                                              }
                                            </p>
                                            <p>
                                              Adding more replacement strings
                                              picks one by random.
                                            </p>
                                            {/* FUCK NOT AGAIN */}
                                            <FieldArray
                                              name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].replace`}
                                              render={(
                                                ModifierReplaceFunctions
                                              ) =>
                                                values.quirks[QuirkModeIndex][1]
                                                  .quirk[QuirkReplacementIndex]
                                                  .replace &&
                                                values.quirks[QuirkModeIndex][1]
                                                  .quirk[QuirkReplacementIndex]
                                                  .replace.length > 0 ? (
                                                  <>
                                                    {values.quirks[
                                                      QuirkModeIndex
                                                    ][1].quirk[
                                                      QuirkReplacementIndex
                                                    ].replace.map(
                                                      (
                                                        ModifierReplace,
                                                        ModifierReplaceIndex
                                                      ) => (
                                                        <>
                                                          <div
                                                            key={
                                                              QuirkReplacementIndex
                                                            }
                                                            className="FieldHolder"
                                                          >
                                                            <Field
                                                              type="text"
                                                              name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].replace[${ModifierReplaceIndex}]`}
                                                              placeholder="Replace..."
                                                            />
                                                            <button
                                                              type="button"
                                                              onClick={() =>
                                                                ModifierReplaceFunctions.remove(
                                                                  ModifierReplaceIndex
                                                                )
                                                              }
                                                            >
                                                              -
                                                            </button>
                                                          </div>
                                                          <ErrorMessage
                                                            name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].replace[${ModifierReplaceIndex}]`}
                                                            render={
                                                              ErrorComponent
                                                            }
                                                          />
                                                        </>
                                                      )
                                                    )}
                                                    <button
                                                      type="button"
                                                      onClick={() => {
                                                        ModifierReplaceFunctions.push(
                                                          ""
                                                        );
                                                      }}
                                                    >
                                                      Add Replacement String
                                                    </button>
                                                  </>
                                                ) : (
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      ModifierReplaceFunctions.push(
                                                        ""
                                                      );
                                                    }}
                                                  >
                                                    Add Replacement String
                                                  </button>
                                                )
                                              }
                                            />
                                            <ErrorMessage
                                              name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].replace`}
                                              render={ErrorComponent}
                                            />
                                            {/* OK GOOD ITS OVER */}
                                            <label>Condition</label>
                                            <p>
                                              A Regular Expression, that when
                                              matched with, enables this
                                              modifier.
                                            </p>
                                            <div
                                              key={QuirkReplacementIndex}
                                              className="FieldHolder"
                                            >
                                              <Field
                                                type="text"
                                                name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].condition`}
                                                placeholder="Condition..."
                                              />
                                            </div>
                                            <ErrorMessage
                                              name={`quirks[${QuirkModeIndex}][1].quirk[${QuirkReplacementIndex}].condition`}
                                              render={ErrorComponent}
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                QuirkReplacementFunctions.remove(
                                                  QuirkReplacementIndex
                                                )
                                              }
                                            >
                                              Remove Quirk Modifier
                                            </button>
                                            <Flexbox gap="8px">
                                              {QuirkReplacementIndex > 0 ? (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    QuirkReplacementFunctions.swap(
                                                      QuirkReplacementIndex,
                                                      QuirkReplacementIndex - 1
                                                    )
                                                  }
                                                >
                                                  Move up
                                                </button>
                                              ) : (
                                                <></>
                                              )}
                                              {QuirkReplacementIndex <
                                              values.quirks[QuirkModeIndex][1]
                                                .quirk.length -
                                                1 ? (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    QuirkReplacementFunctions.swap(
                                                      QuirkReplacementIndex,
                                                      QuirkReplacementIndex + 1
                                                    )
                                                  }
                                                >
                                                  Move down
                                                </button>
                                              ) : (
                                                <></>
                                              )}
                                            </Flexbox>
                                          </div>
                                        )
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          QuirkReplacementFunctions.push({
                                            type: "prefix",
                                            find: "",
                                            replace: [""],
                                            condition: "",
                                          });
                                        }}
                                      >
                                        Add Quirk Modifier
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        QuirkReplacementFunctions.push({
                                          type: "prefix",
                                          find: "",
                                          replace: [""],
                                          condition: "",
                                        });
                                      }}
                                    >
                                      Add Quirk Modifier
                                    </button>
                                  )
                                }
                              />
                              <ErrorMessage
                                name={`quirks[${QuirkModeIndex}][1]`}
                                render={ErrorComponent}
                              />
                            </div>
                            {/* 2nd recursion end */}
                          </details>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            QuirkModeFunctions.push(["", { quirk: [] }]);
                          }}
                        >
                          Add Quirk Mode
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          QuirkModeFunctions.push(["", { quirk: [] }]);
                        }}
                      >
                        Add Quirk Mode
                      </button>
                    )
                  }
                />
                <ErrorMessage name="quirks" render={ErrorComponent} />
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
