// Cambridge 18 General Reading Test 3 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Cambridge18GRTest3Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">SECTION 1</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–7</h3>
          <p className="mb-2">
            Look at the six beach descriptions, <strong>A–F</strong>.
          </p>
          <p className="mb-2">
            For which beaches are the following statements true?
          </p>{" "}
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
                <strong>1</strong> You can buy food at this beach.
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
                <strong>2</strong> You can learn to do a sport at this beach.
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
                <strong>3</strong> This beach can be uncomfortably busy.
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
                <strong>4</strong> Adults can supervise their children without
                much difficulty at this beach.
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
                <strong>5</strong> This beach is nearest to public transport.
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
                <strong>6</strong> People are employed to supervise swimmers at
                this beach.
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
                <strong>7</strong> You can hire sports equipment at this beach.
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
                <strong>8</strong> All property owners receive Sydney Water
                bills.
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
                  <RadioGroupItem id="q8-ng" value="NG" />
                  <Label htmlFor="q8-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>9</strong> Customers who don't have a water meter must
                pay an extra charge.
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
                  <RadioGroupItem id="q9-ng" value="NG" />
                  <Label htmlFor="q9-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>10</strong> Customers who choose to receive a bill every
                month pay extra.
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
                  <RadioGroupItem id="q10-ng" value="NG" />
                  <Label htmlFor="q10-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>11</strong> Pensioners who live in rented accommodation
                might get a discount.
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
                  <RadioGroupItem id="q11-ng" value="NG" />
                  <Label htmlFor="q11-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>12</strong> Customers registered for eBill receive both
                paper and electronic bills.
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
                  <RadioGroupItem id="q12-ng" value="NG" />
                  <Label htmlFor="q12-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>13</strong> Customers who request information from the
                period before their last five bills must pay a fee.
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
                  <RadioGroupItem id="q13-ng" value="NG" />
                  <Label htmlFor="q13-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>14</strong> A fixed charge can be avoided when the water
                supply is disconnected by a licensed plumber.
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
                  <RadioGroupItem id="q14-ng" value="NG" />
                  <Label htmlFor="q14-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>{" "}
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15–20</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 15–20 on your answer sheet.
          </p>
          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>15</strong> Parking is limited, so the use of
                alternative methods of transport and the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of cars
                is encouraged.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>16</strong> Staff with the highest{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> are
                given parking spaces first.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>17</strong> Some parking spaces are reserved for company
                vehicles during the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> but may
                be used by staff at other times.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>18</strong> If an employee leaves the company
                permanently, their parking space will normally be given to their{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>19</strong> If an employee takes extended leave, their
                parking space will be given to the person who provides{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> for the
                absent employee.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>20</strong> All{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> about
                car parking should be sent to the HR Manager.
              </p>
            </div>
          </div>{" "}
        </div>
        <h2 className="text-lg font-bold mb-4">SECTION 2</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 21–27</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 21–27 on your answer sheet.
          </p>
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h4 className="font-bold mb-2">Making sure offices are safe</h4>
            <p className="font-semibold">
              To prevent slips, trips, falls and collisions, ensure that
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>boxes, files, etc. are correctly stored</li>
              <li>
                items such as <strong>21</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> do not
                create a tripping hazard
              </li>
              <li>
                workers do not use <strong>22</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> to
                reach high objects
              </li>
              <li>
                <strong>23</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> are
                fixed at corners
              </li>
              <li>
                floors are covered by <strong>24</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />,
                especially at entrances
              </li>
            </ul>

            <p className="font-semibold">
              To prevent injuries caused by objects, ensure that
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>
                <strong>25</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> in
                office furniture are kept closed
              </li>
              <li>objects which are heavy are kept near the floor</li>
            </ul>

            <p className="font-semibold">
              To prevent injuries due to posture and repetitive movement, ensure
              that
            </p>
            <ul className="list-disc ml-6 space-y-1 mb-4">
              <li>
                office furniture is <strong>26</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </li>
              <li>
                <strong>27</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> are
                provided for documents
              </li>
              <li>the mouse is placed next to the computer keyboard</li>
            </ul>
          </div>{" "}
        </div>
        <h2 className="text-lg font-bold mb-4">SECTION 3</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28–33</h3>
          <p className="mb-2">
            The text has <strong>six</strong> sections, <strong>A–F</strong>.
          </p>
          <p className="mb-2">Which section mentions the following?</p>
          <p className="mb-4">
            Write the correct letter, <strong>A–F</strong>, in boxes 28–33 on
            your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>28</strong> the various functions of Roman roads
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q28-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q28-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q28-${letter.toLowerCase()}`}
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
                <strong>29</strong> reference to some current remains of Roman
                road building
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q29-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q29-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q29-${letter.toLowerCase()}`}
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
                <strong>30</strong> a description of preparations for building a
                road
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q30-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q30-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q30-${letter.toLowerCase()}`}
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
                <strong>31</strong> the period in history when road building
                began
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q31-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q31-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q31-${letter.toLowerCase()}`}
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
                <strong>32</strong> the consequence of damage caused by a
                natural disaster
              </p>
              <RadioGroup name="question32" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q32-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q32-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q32-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>33</strong> the total distance once crossed by Roman
                roads
              </p>
              <RadioGroup name="question33" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q33-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q33-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q33-${letter.toLowerCase()}`}
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
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 34–37</h3>
          <p className="mb-4">
            Choose the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
            <strong>C</strong> or <strong>D</strong>.
          </p>

          <div className="space-y-6">
            {" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>34</strong> Which aspect of Roman road building does the
                writer mention in Section A?
              </p>
              <RadioGroup name="question34" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q34-a" value="A" className="mt-1" />
                  <Label htmlFor="q34-a" className="ml-3">
                    <strong>A</strong> the strength and permanence of the roads
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-b" value="B" className="mt-1" />
                  <Label htmlFor="q34-b" className="ml-3">
                    <strong>B</strong> the magnificence and practicality of the
                    roads
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-c" value="C" className="mt-1" />
                  <Label htmlFor="q34-c" className="ml-3">
                    <strong>C</strong> the number of people involved in building
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-d" value="D" className="mt-1" />
                  <Label htmlFor="q34-d" className="ml-3">
                    <strong>D</strong> the powerful people who financed the
                    roads
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>35</strong> The writer compares the Appian Way to a
                modern highway because
              </p>
              <RadioGroup name="question35" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q35-a" value="A" className="mt-1" />
                  <Label htmlFor="q35-a" className="ml-3">
                    <strong>A</strong> it was lengthened over time.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-b" value="B" className="mt-1" />
                  <Label htmlFor="q35-b" className="ml-3">
                    <strong>B</strong> it took a long time to construct.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-c" value="C" className="mt-1" />
                  <Label htmlFor="q35-c" className="ml-3">
                    <strong>C</strong> it was used by a large number of
                    travellers.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-d" value="D" className="mt-1" />
                  <Label htmlFor="q35-d" className="ml-3">
                    <strong>D</strong> it was designed to avoid certain areas.
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>36</strong> According to the writer, the purpose of the
                triumphal arches was to
              </p>
              <RadioGroup name="question36" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q36-a" value="A" className="mt-1" />
                  <Label htmlFor="q36-a" className="ml-3">
                    <strong>A</strong> display the power of Rome.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-b" value="B" className="mt-1" />
                  <Label htmlFor="q36-b" className="ml-3">
                    <strong>B</strong> celebrate the opening of a road.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-c" value="C" className="mt-1" />
                  <Label htmlFor="q36-c" className="ml-3">
                    <strong>C</strong> show the name of important roads.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-d" value="D" className="mt-1" />
                  <Label htmlFor="q36-d" className="ml-3">
                    <strong>D</strong> provide access for important officials.
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>37</strong> What common use of a milestone is mentioned
                in Section E?
              </p>
              <RadioGroup name="question37" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q37-a" value="A" className="mt-1" />
                  <Label htmlFor="q37-a" className="ml-3">
                    <strong>A</strong> indicating to travellers the total length
                    of the road
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-b" value="B" className="mt-1" />
                  <Label htmlFor="q37-b" className="ml-3">
                    <strong>B</strong> highlighting areas of the road that
                    needed repair
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-c" value="C" className="mt-1" />
                  <Label htmlFor="q37-c" className="ml-3">
                    <strong>C</strong> noting details regarding the maintenance
                    of the road
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-d" value="D" className="mt-1" />
                  <Label htmlFor="q37-d" className="ml-3">
                    <strong>D</strong> marking rest places along the road for
                    travellers and their animals
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 38–40</h3>
          <p className="mb-4">Label the diagram below.</p>
          <p className="mb-4">
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for
            each answer.
          </p>

          <div className="mb-6 flex justify-center">
            <img
              src="https://www.ieltsolve.com/wp-content/uploads/2023/08/Picture22-e1690985722303-1536x637.png"
              alt="Roman Road Construction Diagram"
              className="max-w-full h-auto border border-gray-300 rounded"
            />
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>38</strong>{" "}
                <input
                  type="text"
                  className="border-b border-gray-400 w-40 text-center"
                  placeholder="Answer"
                />
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39</strong>{" "}
                <input
                  type="text"
                  className="border-b border-gray-400 w-40 text-center"
                  placeholder="Answer"
                />
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40</strong>{" "}
                <input
                  type="text"
                  className="border-b border-gray-400 w-40 text-center"
                  placeholder="Answer"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cambridge18GRTest3Questions;
