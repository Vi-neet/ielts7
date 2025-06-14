// Cambridge 18 General Reading Test 4 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Cambridge18GRTest4Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">SECTION 1</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–7</h3>{" "}
          <p className="mb-2">
            Look at the <strong>six advertisements</strong> for ice cream
            makers, <strong>A–F</strong>.
          </p>
          <p className="mb-2">
            For which ice cream maker are the following statements true?
          </p>
          <p className="mb-4">
            Write the correct letter, <strong>A–F</strong>, in boxes 1–7 on your
            answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>
          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>1</strong> Users of this machine will need to put some
                physical effort into making ice cream.
              </p>
              <RadioGroup name="question1" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>2</strong> Users of this machine can decide how soft
                they want their ice cream to be.
              </p>
              <RadioGroup name="question2" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>3</strong> This ice cream maker can be fixed onto an
                existing kitchen appliance.
              </p>
              <RadioGroup name="question3" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>4</strong> It is possible to make a larger amount of ice
                cream at one time than in most other machines.
              </p>
              <RadioGroup name="question4" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>5</strong> This machine has features that make it worth
                the high price.
              </p>
              <RadioGroup name="question5" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>6</strong> People might find it difficult to take this
                machine apart.
              </p>
              <RadioGroup name="question6" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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

            <div className="question-item">
              <p className="mb-3">
                <strong>7</strong> This machine makes an enjoyable sound when
                the ice cream is prepared.
              </p>
              <RadioGroup name="question7" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q7-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q7-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q7-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8–14</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in the
            text?
          </p>
          <p className="mb-2">In boxes 8–14 on your answer sheet, write</p>
          <div className="mb-4 space-y-1">
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>8</strong> The course is aimed at people who are already
                skilled photographers.
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
            </div>{" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>9</strong> Three meals a day are included in the course
                fee.
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
                <strong>10</strong> The only way to reach the hotel is by car.
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
                <strong>11</strong> The topics covered on the course depend
                mainly on the wishes of the participants.
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
                <strong>12</strong> Participants are expected to get up early on
                their first morning to take photographs.
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
                <strong>13</strong> The tutor will show participants examples of
                her work after dinner.
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
                <strong>14</strong> Participants should be prepared for bad
                weather.
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
        </div>
        <h2 className="text-lg font-bold mb-4 mt-10">SECTION 2</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15–21</h3>{" "}
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 15–21 on your answer sheet.
          </p>
          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>15</strong> Some respirators are unsuitable for use in
                areas with limited levels of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>16</strong> Facial fit tests should be conducted on a{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> basis.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>17</strong> For workers who have a{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />, an
                alternative to tight-fitting RPE may be required.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>18</strong> Workers should avoid cleaning their RPE with{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>19</strong> RPE can either be hung up or placed on a
                timber <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                in order to dry it.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>20</strong> It is important to ensure that the RPE{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> are not
                ripped and can still stretch.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>21</strong> RPE should not be exposed to direct{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> when it
                is being stored.
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 22–27</h3>
          <p className="mb-2">Complete the table below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 22–27 on your answer sheet.
          </p>

          <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-bold">
                    Hazard
                  </th>
                  <th className="border-b border-gray-300 px-4 py-3 text-left font-bold">
                    Managing the hazard
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold" rowSpan={4}>
                    Slips and trips
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">Slippery floor surfaces</div>
                    <div className="mt-2 text-sm">
                      Remove solid spills such as grain immediately.
                      <br />
                      Ensure all items of <strong>22</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />{" "}
                      have good grip.
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="font-medium">Hoses and pipes</div>
                    <div className="mt-2 text-sm">
                      Ensure they are fitted to walls where possible.
                      <br />
                      Highlight obstructions with brightly coloured tape.
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="font-medium">Overhead obstacles</div>
                    <div className="mt-2 text-sm">
                      Ensure they are covered with <strong>23</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />
                      .
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="font-medium">Unsuitable steps</div>
                    <div className="mt-2 text-sm">
                      Provide good lighting and install <strong>24</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />
                      .
                    </div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-semibold">
                    Lifting and carrying
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      Transporting containers and calves
                    </div>
                    <div className="mt-2 text-sm">
                      Spread the weight evenly between both hands.
                      <br />
                      Try to avoid moving containers by hand, and use equipment
                      such as <strong>25</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />{" "}
                      instead.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">Milking by hand</td>
                  <td className="px-4 py-3">
                    <div className="font-medium">
                      Repetitive handling of milking equipment
                    </div>
                    <div className="mt-2 text-sm">
                      Keep everything accessible so that employees don't need to
                      bend or <strong>26</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />
                      .<br />
                      Introduce a system of <strong>27</strong>{" "}
                      <Input
                        type="text"
                        className="w-24 mx-1 inline-block text-xs"
                      />{" "}
                      to increase variety.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-4 mt-10">SECTION 3</h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28–34</h3>
          <p className="mb-2">
            The text has <strong>seven sections, A–G</strong>.
          </p>
          <p className="mb-2">
            Choose the correct heading for each section from the list of
            headings below.
          </p>
          <p className="mb-4">
            Write the correct number, <strong>i–viii</strong>, in boxes 28–34 on
            your answer sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">List of Headings</h4>
            <div className="grid grid-cols-1 gap-1 text-sm">
              <p>
                <strong>i</strong> How chance contributes to conditions being
                right
              </p>
              <p>
                <strong>ii</strong> Concern about the changing environment
              </p>
              <p>
                <strong>iii</strong> The process of photographing animals at
                night is getting easier
              </p>
              <p>
                <strong>iv</strong> How human developments are affecting
                wildlife
              </p>
              <p>
                <strong>v</strong> Photographing objects that can't be seen in
                detail
              </p>
              <p>
                <strong>vi</strong> A season that may seem unsuitable for
                photographers
              </p>
              <p>
                <strong>vii</strong> No longer too expensive
              </p>
              <p>
                <strong>viii</strong> A less ambitious approach
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>28</strong> Section A
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q28-${numeral}`}>
                      <RadioGroupItem id={`q28-${numeral}`} value={numeral} />
                      <Label htmlFor={`q28-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29</strong> Section B
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q29-${numeral}`}>
                      <RadioGroupItem id={`q29-${numeral}`} value={numeral} />
                      <Label htmlFor={`q29-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30</strong> Section C
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q30-${numeral}`}>
                      <RadioGroupItem id={`q30-${numeral}`} value={numeral} />
                      <Label htmlFor={`q30-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31</strong> Section D
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q31-${numeral}`}>
                      <RadioGroupItem id={`q31-${numeral}`} value={numeral} />
                      <Label htmlFor={`q31-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>32</strong> Section E
              </p>
              <RadioGroup name="question32" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q32-${numeral}`}>
                      <RadioGroupItem id={`q32-${numeral}`} value={numeral} />
                      <Label htmlFor={`q32-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33</strong> Section F
              </p>
              <RadioGroup name="question33" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q33-${numeral}`}>
                      <RadioGroupItem id={`q33-${numeral}`} value={numeral} />
                      <Label htmlFor={`q33-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>34</strong> Section G
              </p>
              <RadioGroup name="question34" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (numeral) => (
                    <div className="flex items-center" key={`q34-${numeral}`}>
                      <RadioGroupItem id={`q34-${numeral}`} value={numeral} />
                      <Label htmlFor={`q34-${numeral}`} className="ml-2">
                        {numeral}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 35–40</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 35–40 on your answer sheet.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>35</strong> November is a time when{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> grow.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>36</strong> The apparent size of the moon depends on its
                position in relation to the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>37</strong> Sunlight is reflected by the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of the
                moon.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>38</strong> When the night sky is clear, many objects in
                the <Input type="text" className="w-32 mx-1 inline-block" />,
                e.g., buildings, are visible.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39</strong> With modern cameras, it is possible to
                photograph not only constellations but also{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40</strong> Deer and wild boar may search for food in{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> in
                towns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cambridge18GRTest4Questions;
