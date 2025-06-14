// Cambridge 16 General Reading Test 1 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 General Reading Test 1
 */
export const Cambridge16GRTest1Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      {" "}
      <h2 className="text-lg font-bold mb-4">SECTION 1: Questions 1-14</h2>
      {/* Questions 1-6 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 1-6</h3>
        <p className="mb-2">Look at the five comments about lessons, A-E.</p>
        <p className="mb-2">
          For which comments are the following statements true?
        </p>
        <p className="mb-2">
          Write the correct letter, <strong>A-E</strong>, in boxes 1-6 on your
          answer sheet.
        </p>
        <p className="mb-4">
          <strong>NB</strong> You may use any letter more than once.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>1.</strong> This pupil is interested in the subject
              despite the way it is taught.
            </p>
            <RadioGroup name="question1" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q1-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q1-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q1-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>2.</strong> This pupil is hoping to have a career that
              makes use of the subject.
            </p>
            <RadioGroup name="question2" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q2-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q2-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q2-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>3.</strong> This pupil finds the subject harder than they
              expected.
            </p>
            <RadioGroup name="question3" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q3-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q3-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q3-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>4.</strong> This pupil finds the lessons very
              entertaining.
            </p>
            <RadioGroup name="question4" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q4-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q4-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q4-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>5.</strong> This pupil appreciates the benefit of doing
              challenging work.
            </p>
            <RadioGroup name="question5" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q5-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q5-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q5-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>6.</strong> This pupil has realised the connection between
              two things.
            </p>
            <RadioGroup name="question6" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q6-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q6-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q6-${letter.toLowerCase()}`}
                    className="ml-2"
                  >
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>{" "}
      {/* Questions 7-14 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 7-14</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in the
          text above?
        </p>
        <p className="mb-2">
          In boxes 7-14 on your reading answer sheet, write:
        </p>
        <div className="mb-4">
          <p className="mb-1">
            <strong>TRUE</strong> if the statement agrees with the information
          </p>
          <p className="mb-1">
            <strong>FALSE</strong> if the statement contradicts the information
          </p>
          <p className="mb-1">
            <strong>NOT GIVEN</strong> if there is no information on this
          </p>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>7.</strong> The festival is held every year.
            </p>
            <RadioGroup name="question7" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q7-true" value="TRUE" />
                <Label htmlFor="q7-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q7-false" value="FALSE" />
                <Label htmlFor="q7-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q7-ng" value="NOT GIVEN" />
                <Label htmlFor="q7-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>8.</strong> This year's festival focuses on the town's
              history.
            </p>
            <RadioGroup name="question8" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q8-true" value="TRUE" />
                <Label htmlFor="q8-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q8-false" value="FALSE" />
                <Label htmlFor="q8-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q8-ng" value="NOT GIVEN" />
                <Label htmlFor="q8-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>9.</strong> Goods displayed in the craft fair are unlike
              ones found in shops.
            </p>
            <RadioGroup name="question9" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q9-true" value="TRUE" />
                <Label htmlFor="q9-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q9-false" value="FALSE" />
                <Label htmlFor="q9-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q9-ng" value="NOT GIVEN" />
                <Label htmlFor="q9-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>10.</strong> The barbecue will be cancelled if it rains.
            </p>
            <RadioGroup name="question10" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q10-true" value="TRUE" />
                <Label htmlFor="q10-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q10-false" value="FALSE" />
                <Label htmlFor="q10-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q10-ng" value="NOT GIVEN" />
                <Label htmlFor="q10-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>11.</strong> Adults can attend the barbecue at any time
              without charge.
            </p>
            <RadioGroup name="question11" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q11-true" value="TRUE" />
                <Label htmlFor="q11-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q11-false" value="FALSE" />
                <Label htmlFor="q11-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q11-ng" value="NOT GIVEN" />
                <Label htmlFor="q11-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>12.</strong> Amateur musicians will perform during the
              whole of the barbecue.
            </p>
            <RadioGroup name="question12" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q12-true" value="TRUE" />
                <Label htmlFor="q12-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q12-false" value="FALSE" />
                <Label htmlFor="q12-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q12-ng" value="NOT GIVEN" />
                <Label htmlFor="q12-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>13.</strong> Seating is available for watching the boat
              races.
            </p>
            <RadioGroup name="question13" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q13-true" value="TRUE" />
                <Label htmlFor="q13-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q13-false" value="FALSE" />
                <Label htmlFor="q13-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q13-ng" value="NOT GIVEN" />
                <Label htmlFor="q13-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>14.</strong> People attending the festival will be asked
              to donate some money.
            </p>
            <RadioGroup name="question14" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q14-true" value="TRUE" />
                <Label htmlFor="q14-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-false" value="FALSE" />
                <Label htmlFor="q14-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-ng" value="NOT GIVEN" />
                <Label htmlFor="q14-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>{" "}
      <h2 className="text-lg font-bold mb-4 mt-10">
        SECTION 2: Questions 15-27
      </h2>
      {/* Questions 15-20 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 15-20</h3>
        <p className="mb-2">Complete the notes below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 15-20 on your reading answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-4">Risks and how to avoid them</h4>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2 font-bold">
                  Risk Factor
                </th>
                <th className="border border-gray-300 p-2 font-bold">
                  Examples of Farm Activities
                </th>
                <th className="border border-gray-300 p-2 font-bold">
                  Risk Reduction Measures to Consider
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Heavy Loads
                </td>
                <td className="border border-gray-300 p-2">
                  – Lifting sacks of <strong>15.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                  <br />– Carrying food for animals
                </td>
                <td className="border border-gray-300 p-2">
                  – Divide into containers that weigh less
                  <br />– Use a vehicle such as a tractor
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  Awkward posture
                </td>
                <td className="border border-gray-300 p-2">
                  – Lifting a restless <strong>16.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                  <br />– Moving something around a big <strong>
                    17.
                  </strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </td>
                <td className="border border-gray-300 p-2">
                  – Buy particular <strong>18.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" /> to
                  help with support
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 font-semibold">
                  A lot of <strong>19.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" /> while
                  working
                </td>
                <td className="border border-gray-300 p-2">
                  Fixing a fallen <strong>20.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </td>
                <td className="border border-gray-300 p-2">
                  Use a workbench instead
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>{" "}
      {/* Questions 21-27 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 21-27</h3>
        <p className="mb-2">Complete the sentences below.</p>
        <p className="mb-2">
          Choose <strong>NO MORE THAN TWO WORDS</strong> for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 21-27 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>21.</strong> A{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> approach
              to selling is fine as long as you do not irritate the customer.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>22.</strong> Recommend additional products and{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> without
              being too forceful.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>23.</strong> Know how to compare similar products which
              have different{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>24.</strong> Avoid{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> by always
              saying more than 'no'.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>25.</strong> Keep an eye on the{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> of goods
              on the shelves.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>26.</strong> If a customer has problems paying with their{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> handle
              the problem with care.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>27.</strong> Any{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> from a
              customer should not affect how you treat them.
            </p>
          </div>
        </div>
      </div>{" "}
      <h2 className="text-lg font-bold mb-4 mt-10">
        SECTION 3: Questions 28-40
      </h2>
      {/* Questions 28-34 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 28-34</h3>
        <p className="mb-2">The text has seven paragraphs, A-G.</p>
        <p className="mb-2">
          Choose the correct heading for each paragraph from the list of
          headings below.
        </p>
        <p className="mb-4">
          Write the correct number, i-viii, in boxes 28-34 on your answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-2">List of Headings</h4>
          <p>
            <strong>i</strong> A time when opportunities were limited
          </p>
          <p>
            <strong>ii</strong> The reasons why Ferrando's product is needed
          </p>
          <p>
            <strong>iii</strong> A no-risk solution
          </p>
          <p>
            <strong>iv</strong> Two inventions and some physical details
          </p>
          <p>
            <strong>v</strong> The contrasting views of different generations
          </p>
          <p>
            <strong>vi</strong> A disturbing experience
          </p>
          <p>
            <strong>vii</strong> The problems with replacing a consumer item
          </p>
          <p>
            <strong>viii</strong> Looking back at why water was bottled
          </p>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>28.</strong> Paragraph A
            </p>
            <RadioGroup name="question28" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q28-${num}`}>
                  <RadioGroupItem id={`q28-${num}`} value={num} />
                  <Label htmlFor={`q28-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>29.</strong> Paragraph B
            </p>
            <RadioGroup name="question29" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q29-${num}`}>
                  <RadioGroupItem id={`q29-${num}`} value={num} />
                  <Label htmlFor={`q29-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>30.</strong> Paragraph C
            </p>
            <RadioGroup name="question30" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q30-${num}`}>
                  <RadioGroupItem id={`q30-${num}`} value={num} />
                  <Label htmlFor={`q30-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>31.</strong> Paragraph D
            </p>
            <RadioGroup name="question31" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q31-${num}`}>
                  <RadioGroupItem id={`q31-${num}`} value={num} />
                  <Label htmlFor={`q31-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>32.</strong> Paragraph E
            </p>
            <RadioGroup name="question32" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q32-${num}`}>
                  <RadioGroupItem id={`q32-${num}`} value={num} />
                  <Label htmlFor={`q32-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>33.</strong> Paragraph F
            </p>
            <RadioGroup name="question33" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q33-${num}`}>
                  <RadioGroupItem id={`q33-${num}`} value={num} />
                  <Label htmlFor={`q33-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>34.</strong> Paragraph G
            </p>
            <RadioGroup name="question34" className="flex flex-wrap gap-4">
              {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((num) => (
                <div className="flex items-center" key={`q34-${num}`}>
                  <RadioGroupItem id={`q34-${num}`} value={num} />
                  <Label htmlFor={`q34-${num}`} className="ml-2">
                    {num}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>{" "}
      {/* Questions 35-37 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 35-37</h3>
        <p className="mb-2">
          Choose the correct letter – <strong>A, B, C, or D</strong>.
        </p>
        <p className="mb-4">
          Write the correct letter in boxes 35-37 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>35.</strong> What does Ferrando say about his glass water
              bottle?
            </p>
            <RadioGroup name="question35" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q35-a" value="A" className="mt-1" />
                <Label htmlFor="q35-a" className="ml-2">
                  <strong>A</strong> It matches his bicycle helmet.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q35-b" value="B" className="mt-1" />
                <Label htmlFor="q35-b" className="ml-2">
                  <strong>B</strong> It is cheaper than a plastic bottle.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q35-c" value="C" className="mt-1" />
                <Label htmlFor="q35-c" className="ml-2">
                  <strong>C</strong> He has designed it to suit all ages.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q35-d" value="D" className="mt-1" />
                <Label htmlFor="q35-d" className="ml-2">
                  <strong>D</strong> He wants people to be proud to show it.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>36.</strong> What does the writer find fascinating about
              Ferrando's story?
            </p>
            <RadioGroup name="question36" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q36-a" value="A" className="mt-1" />
                <Label htmlFor="q36-a" className="ml-2">
                  <strong>A</strong> the youthfulness of his ideas.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q36-b" value="B" className="mt-1" />
                <Label htmlFor="q36-b" className="ml-2">
                  <strong>B</strong> the old-fashioned nature of his products.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q36-c" value="C" className="mt-1" />
                <Label htmlFor="q36-c" className="ml-2">
                  <strong>C</strong> the choice it is creating for consumers.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q36-d" value="D" className="mt-1" />
                <Label htmlFor="q36-d" className="ml-2">
                  <strong>D</strong> the change it is revealing in people's
                  attitudes.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>37.</strong> What does the writer suggest about Closca's
              bike helmet?
            </p>
            <RadioGroup name="question37" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q37-a" value="A" className="mt-1" />
                <Label htmlFor="q37-a" className="ml-2">
                  <strong>A</strong> It has both functional and artistic value.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q37-b" value="B" className="mt-1" />
                <Label htmlFor="q37-b" className="ml-2">
                  <strong>B</strong> Its main appeal is to older people.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q37-c" value="C" className="mt-1" />
                <Label htmlFor="q37-c" className="ml-2">
                  <strong>C</strong> It has had extraordinary success worldwide.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q37-d" value="D" className="mt-1" />
                <Label htmlFor="q37-d" className="ml-2">
                  <strong>D</strong> It is more exciting invention than the
                  glass bottle.
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
      {/* Questions 38-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 38-40</h3>
        <p className="mb-2">Complete the summary below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each
          answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 38-40 on your answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-4">Funding a smart invention</h4>

          <div className="space-y-4">
            <p>
              Thirty years ago, the methods used by creators to fund their
              projects involved getting money from the bank or from someone in
              the <strong>38.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" />
            </p>

            <p>
              Banks today are still a useful source of finance, but investments
              may also be sought from 'corporate social responsibility'
              projects.
            </p>

            <p>
              In order to get immediate funding, the method Ferrando took was to
              use a well-known <strong>39.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" /> to
              advertise his product and request financial support. People who
              gave a certain figure or over were offered a free gift. In
              addition, Ferrando advised his donors that his company would
              create bottles in two colours, followed by a <strong>40.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" /> bottle
              once they had received a more significant amount. In this way
              Ferrando avoided debt and found out how many people might want his
              products before manufacturing them.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16GRTest1Questions;
