// Cambridge 16 General Reading Test 2 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 General Reading Test 2
 */
export const Cambridge16GRTest2Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      {" "}
      <h2 className="text-lg font-bold mb-4">SECTION 1: Questions 1-14</h2>
      {/* Questions 1-7 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 1-7</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in the
          text above?
        </p>
        <p className="mb-2">
          <strong>TRUE</strong> if the statement agrees with the information
        </p>
        <p className="mb-2">
          <strong>FALSE</strong> if the statement contradicts the information
        </p>
        <p className="mb-4">
          <strong>NOT GIVEN</strong> if there is no information on this
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>1.</strong> After selecting a builder, you should decide
              on the design of your new house.
            </p>
            <RadioGroup name="question1" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q1-true" value="TRUE" />
                <Label htmlFor="q1-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q1-false" value="FALSE" />
                <Label htmlFor="q1-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q1-ng" value="NOT GIVEN" />
                <Label htmlFor="q1-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>2.</strong> In Australia, you can make sure that a builder
              has the appropriate license.
            </p>
            <RadioGroup name="question2" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q2-true" value="TRUE" />
                <Label htmlFor="q2-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q2-false" value="FALSE" />
                <Label htmlFor="q2-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q2-ng" value="NOT GIVEN" />
                <Label htmlFor="q2-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>3.</strong> The best builders usually belong to the
              Housing Industry Association.
            </p>
            <RadioGroup name="question3" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q3-true" value="TRUE" />
                <Label htmlFor="q3-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q3-false" value="FALSE" />
                <Label htmlFor="q3-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q3-ng" value="NOT GIVEN" />
                <Label htmlFor="q3-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>4.</strong> The HIA gives an award to builders whose
              standards of customer service are very high.
            </p>
            <RadioGroup name="question4" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q4-true" value="TRUE" />
                <Label htmlFor="q4-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q4-false" value="FALSE" />
                <Label htmlFor="q4-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q4-ng" value="NOT GIVEN" />
                <Label htmlFor="q4-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>5.</strong> Builders who work on smaller projects are more
              likely to have display homes.
            </p>
            <RadioGroup name="question5" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q5-true" value="TRUE" />
                <Label htmlFor="q5-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q5-false" value="FALSE" />
                <Label htmlFor="q5-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q5-ng" value="NOT GIVEN" />
                <Label htmlFor="q5-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>6.</strong> It is advisable to have a contract which is in
              accordance with the Domestic Building Contracts Act.
            </p>
            <RadioGroup name="question6" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q6-true" value="TRUE" />
                <Label htmlFor="q6-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q6-false" value="FALSE" />
                <Label htmlFor="q6-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q6-ng" value="NOT GIVEN" />
                <Label htmlFor="q6-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>7.</strong> A contract is legally binding from the time it
              has been signed.
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
        </div>
      </div>
      {/* Questions 8-14 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 8-14</h3>
        <p className="mb-2">
          Look at the eight advertisements for adventure sports on an island,{" "}
          <strong>A-H</strong>.
        </p>
        <p className="mb-2">
          For which adventure sport are the following statements true?
        </p>
        <p className="mb-2">
          Write the correct letter, <strong>A-H</strong>, in boxes 8-14 on your
          answer sheet.
        </p>
        <p className="mb-4">
          <strong>NB</strong> You may use any letter more than once.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>8.</strong> You will be provided with safety equipment.
            </p>
            <RadioGroup name="question8" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q8-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q8-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q8-${letter.toLowerCase()}`}
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
              <strong>9.</strong> You may get some minor injuries doing this
              activity.
            </p>
            <RadioGroup name="question9" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q9-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q9-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q9-${letter.toLowerCase()}`}
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
              <strong>10.</strong> You can see a disused, isolated building.
            </p>
            <RadioGroup name="question10" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q10-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q10-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q10-${letter.toLowerCase()}`}
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
              <strong>11.</strong> You can relax and look down from above in an
              unusual location.
            </p>
            <RadioGroup name="question11" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q11-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q11-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q11-${letter.toLowerCase()}`}
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
              <strong>12.</strong> You will take an exciting trip in rough water
              close to big ships.
            </p>
            <RadioGroup name="question12" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q12-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q12-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q12-${letter.toLowerCase()}`}
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
              <strong>13.</strong> You can choose easy options or more difficult
              ones.
            </p>
            <RadioGroup name="question13" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q13-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q13-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q13-${letter.toLowerCase()}`}
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
              <strong>14.</strong> You may find this more difficult than you
              expect.
            </p>
            <RadioGroup name="question14" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q14-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q14-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q14-${letter.toLowerCase()}`}
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
          Write your answers in boxes 15-20 on your answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-4">Barrington Music Service</h4>

          <div className="mb-4">
            <p className="font-semibold mb-2">Activities</p>
            <ul className="list-disc ml-8 mb-4">
              <li>organises music lessons</li>
              <li>enables the hire of instruments</li>
              <li>
                Events such as <strong>15.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> for
                local and visiting schools
              </li>
              <li>supports Barrington Youth Orchestra</li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">
              Post of Business and Development Manager
            </p>
            <p className="mb-2">– person appointed will</p>
            <ul className="list-disc ml-8 mb-4">
              <li>manage the administration of the Service</li>
              <li>
                be responsible for keeping to the <strong>16.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" />
              </li>
              <li>
                build <strong>17.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> with
                other organisations
              </li>
              <li>be proactive in fundraising</li>
              <li>
                increase the focus on <strong>18.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> in
                school music lessons (e.g., international styles)
              </li>
              <li>
                make sure records and a <strong>19.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> is kept
                up-to-date
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Person appointed must have</p>
            <ul className="list-disc ml-8">
              <li>ability to supervise and motivate others</li>
              <li>
                basic knowledge of <strong>20.</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" />
              </li>
              <li>other relevant skills</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Questions 21-27 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 21-27</h3>
        <p className="mb-2">Complete the notes below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 21-27 on your reading answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>21.</strong> One cause of health and safety problems in
              small businesses is that managers do not have enough relevant{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>22.</strong> Managers complain they have too many{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> to deal
              with.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>23.</strong> Managers may not fully understand their{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>24.</strong> Businesses sometimes feel that inspectors
              give them far too many{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>25.</strong> Businesses above a certain size must produce
              a written <Input type="text" className="w-32 mx-1 inline-block" />{" "}
              of their health and safety policy.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>26.</strong> A company's health and safety policy is
              relevant to both its employees and its{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>27.</strong> The Health and Safety Executive can advise
              small businesses on problems of{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> among
              their employees.
            </p>
          </div>
        </div>
      </div>{" "}
      <h2 className="text-lg font-bold mb-4 mt-10">
        SECTION 3: Questions 28-40
      </h2>
      {/* Questions 28-32 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 28-32</h3>
        <p className="mb-2">
          Choose the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
          <strong>C</strong> or <strong>D</strong>.
        </p>
        <p className="mb-4">
          Write the correct letter in boxes 28-32 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>28.</strong> What does the writer say about scribes in
              ancient Egypt?
            </p>
            <RadioGroup name="question28" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q28-a" value="A" className="mt-1" />
                <Label htmlFor="q28-a" className="ml-2">
                  A Their working days were very long.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-b" value="B" className="mt-1" />
                <Label htmlFor="q28-b" className="ml-2">
                  B The topics they wrote about were very varied.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-c" value="C" className="mt-1" />
                <Label htmlFor="q28-c" className="ml-2">
                  C Many of them were once ordinary working people.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-d" value="D" className="mt-1" />
                <Label htmlFor="q28-d" className="ml-2">
                  D Few of them realised the true value of their occupation.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>29.</strong> What is the writer doing in the second
              paragraph?
            </p>
            <RadioGroup name="question29" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q29-a" value="A" className="mt-1" />
                <Label htmlFor="q29-a" className="ml-2">
                  A explaining why jobs were plentiful in ancient Egypt
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-b" value="B" className="mt-1" />
                <Label htmlFor="q29-b" className="ml-2">
                  B pointing out how honest workers were in ancient Egypt
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-c" value="C" className="mt-1" />
                <Label htmlFor="q29-c" className="ml-2">
                  C comparing manual and professional work in ancient Egypt
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-d" value="D" className="mt-1" />
                <Label htmlFor="q29-d" className="ml-2">
                  D noting the range of duties an individual worker had in
                  ancient Egypt
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>30.</strong> What is the writer doing in the fifth
              paragraph?
            </p>
            <RadioGroup name="question30" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q30-a" value="A" className="mt-1" />
                <Label htmlFor="q30-a" className="ml-2">
                  A explaining a problem
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-b" value="B" className="mt-1" />
                <Label htmlFor="q30-b" className="ml-2">
                  B describing a change
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-c" value="C" className="mt-1" />
                <Label htmlFor="q30-c" className="ml-2">
                  C rejecting a popular view
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-d" value="D" className="mt-1" />
                <Label htmlFor="q30-d" className="ml-2">
                  D criticising a past activity
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>31.</strong> The writer refers to the value of ma'at in
              order to explain
            </p>
            <RadioGroup name="question31" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q31-a" value="A" className="mt-1" />
                <Label htmlFor="q31-a" className="ml-2">
                  A how the work of artists reflected beliefs in ancient Egypt.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q31-b" value="B" className="mt-1" />
                <Label htmlFor="q31-b" className="ml-2">
                  B how ancient Egyptians viewed their role in society.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q31-c" value="C" className="mt-1" />
                <Label htmlFor="q31-c" className="ml-2">
                  C why the opinions of certain people were valued in ancient
                  Egypt.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q31-d" value="D" className="mt-1" />
                <Label htmlFor="q31-d" className="ml-2">
                  D why ancient Egyptians expressed their views so readily.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>32.</strong> Which word best describes the attitude of the
              Egyptian government toward its workers?
            </p>
            <RadioGroup name="question32" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q32-a" value="A" className="mt-1" />
                <Label htmlFor="q32-a" className="ml-2">
                  A strict
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q32-b" value="B" className="mt-1" />
                <Label htmlFor="q32-b" className="ml-2">
                  B patient
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q32-c" value="C" className="mt-1" />
                <Label htmlFor="q32-c" className="ml-2">
                  C negligent
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q32-d" value="D" className="mt-1" />
                <Label htmlFor="q32-d" className="ml-2">
                  D appreciative
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>{" "}
      {/* Questions 33-36 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 33-36</h3>
        <p className="mb-2">
          Look at the following statements (Questions 33-36) and the list of
          jobs below.
        </p>
        <p className="mb-2">
          Match each statement with the correct job, <strong>A-G</strong>.
        </p>
        <p className="mb-4">
          Write the correct letter, <strong>A-G</strong>, in boxes 33-36 on your
          answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-4">List of Jobs</h4>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <p>
              <strong>A</strong> scribe
            </p>
            <p>
              <strong>B</strong> reed cutter
            </p>
            <p>
              <strong>C</strong> farmer
            </p>
            <p>
              <strong>D</strong> potter
            </p>
            <p>
              <strong>E</strong> stonemason
            </p>
            <p>
              <strong>F</strong> overseer
            </p>
            <p>
              <strong>G</strong> sculptor
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>33.</strong> was unable to work at certain times
            </p>
            <RadioGroup name="question33" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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

          <div className="question-item">
            <p className="mb-3">
              <strong>34.</strong> divided workers into groups
            </p>
            <RadioGroup name="question34" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q34-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q34-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q34-${letter.toLowerCase()}`}
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
              <strong>35.</strong> faced daily hazards
            </p>
            <RadioGroup name="question35" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q35-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q35-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q35-${letter.toLowerCase()}`}
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
              <strong>36.</strong> underwent a long period of training
            </p>
            <RadioGroup name="question36" className="flex flex-wrap gap-4">
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                <div
                  className="flex items-center"
                  key={`q36-${letter.toLowerCase()}`}
                >
                  <RadioGroupItem
                    id={`q36-${letter.toLowerCase()}`}
                    value={letter}
                  />
                  <Label
                    htmlFor={`q36-${letter.toLowerCase()}`}
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
      {/* Questions 37-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 37-40</h3>
        <p className="mb-2">Complete the summary below.</p>
        <p className="mb-2">
          Choose <strong>NO MORE THAN TWO WORDS</strong> from the text for each
          answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 37-40 on your answer sheet.
        </p>

        <div className="border p-4 mb-6">
          <h4 className="font-bold mb-4">The king's building projects</h4>

          <p className="mb-4">
            Labourers who worked on the king's buildings were local people who
            chose to participate in <strong>37.</strong>{" "}
            <Input type="text" className="w-32 inline-block mx-1" /> or who
            received payment.
          </p>

          <p className="mb-4">
            The work involved breaking up stone cliffs using wooden wedges. The
            large pieces of stone were then transported to another site on
            sleds, which moved easily over the <strong>38.</strong>{" "}
            <Input type="text" className="w-32 inline-block mx-1" /> Here, the
            blocks could be cut and shaped using tools made of{" "}
            <strong>39.</strong>{" "}
            <Input type="text" className="w-32 inline-block mx-1" /> and wood.
            Some of these had to be sharpened regularly.
          </p>

          <p className="mb-4">
            Eventually, the stone was moved into place to create a building. The
            job of moving the stone was often done by <strong>40.</strong>{" "}
            <Input type="text" className="w-32 inline-block mx-1" /> or other
            unskilled workers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16GRTest2Questions;
