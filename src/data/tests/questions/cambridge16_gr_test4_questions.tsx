import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 General Reading Test 4
 */
export const Cambridge16GRTest4Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      {/* SECTION 1 QUESTIONS */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">SECTION 1: Questions 1-14</h3>{" "}
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 1-8</h4>
          <p className="mb-2">Read the text below and answer questions 1-8.</p>
          <p className="mb-2">
            Look at the seven reviews of hiking boots, A-G.
          </p>
          <p className="mb-2">
            For which hiking boots are the following statements true?
          </p>
          <p className="mb-2">
            Write the correct letter, <strong>A-G</strong>, in boxes 1-8 on your
            answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>1.</strong> These boots are a good choice for people who
                want to look smart when they are walking.
              </p>
              <RadioGroup name="question1" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>2.</strong> People do not need to spend time getting
                their feet accustomed to these boots.
              </p>
              <RadioGroup name="question2" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>3.</strong> These boots should last for many years.
              </p>
              <RadioGroup name="question3" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>4.</strong> People find these boots useful when
                travelling as they are not heavy.
              </p>
              <RadioGroup name="question4" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>5.</strong> One feature of these boots does not continue
                to be effective for very long.
              </p>
              <RadioGroup name="question5" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>6.</strong> These boots do not keep the rain out.
              </p>
              <RadioGroup name="question6" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>7.</strong> It is important to make sure these boots are
                done up tightly before starting a walk.
              </p>
              <RadioGroup name="question7" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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

            <div className="question-item">
              <p className="mb-3">
                <strong>8.</strong> These boots should suit people who don't
                want to spend a lot.
              </p>
              <RadioGroup name="question8" className="flex gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
          </div>
        </div>
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 9-14</h4>
          <p className="mb-2">Read the text below and answer Questions 9-14.</p>
          <p className="mb-2">
            Do the following statements agree with the information given in the
            text?
          </p>
          <p className="mb-2">In boxes 9-14 on your answer sheet, write</p>
          <div className="mb-4">
            <p className="mb-1">
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p className="mb-1">
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p className="mb-1">
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>9.</strong> The workshop is only suitable for people who
                already keep their own bees.
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
                <strong>10.</strong> Participants will meet people who are
                involved in selling honey to the public.
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
                <strong>11.</strong> Vegetarian refreshments are available if
                requested in advance.
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
                <strong>12.</strong> Participants will need to pay extra to hire
                appropriate clothes for the workshop.
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
                <strong>13.</strong> Protective footwear will be required during
                the workshop.
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
                <strong>14.</strong> If someone has to cancel before the
                workshop, the fee will be repaid.
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
      </div>

      {/* SECTION 2 QUESTIONS */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">SECTION 2: Questions 15-27</h3>{" "}
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 15-20</h4>
          <p className="mb-2">
            Read the text below and answer Questions 15-20.
          </p>
          <p className="mb-2">
            <strong>Complete the sentences below.</strong>
          </p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>15.</strong> Some jobseekers have difficulty with their
                CV because they have not learnt which qualities they should{" "}
                <Input type="text" className="w-24 inline-block mx-1" />
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>16.</strong> Professional CV writers know which{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> are
                best left out of the CV.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>17.</strong> CV writers with knowledge of a particular
                field of work often provide useful{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> about
                the skills firms expect from job applicants.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>18.</strong> It is advisable to request{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> of what
                a professional CV writer has previously produced.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>19.</strong> Professional CV writers often ask
                jobseekers to work through a{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> as a
                first step.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>20.</strong> If the jobseeker assists the professional
                writer, the tone of the CV will be{" "}
                <Input type="text" className="w-24 inline-block mx-1" />
              </p>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 21-27</h4>
          <p className="mb-2">
            Read the text below and answer Questions 21-27.
          </p>
          <p className="mb-2">
            <strong>Complete the notes below.</strong>
          </p>
          <p className="mb-4">
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the text for
            each answer.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">How best to tackle a new job</h4>

            <div className="mb-4">
              <p className="font-semibold mb-2">The first day</p>
              <p className="font-semibold mb-2">Before arriving at work</p>
              <ul className="list-disc ml-8 mb-4">
                <li className="mb-2">
                  Try out a different morning <strong>21.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> that
                  will create a sense of well-being
                </li>
                <li className="mb-2">
                  Make sure your chosen outfit conforms to the company's{" "}
                  <strong>22.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" />
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">
                If you eat with colleagues at midday:
              </p>
              <ul className="list-disc ml-8 mb-4">
                <li className="mb-2">
                  It will provide information on their <strong>23.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> and
                  the way they operate
                </li>
                <li className="mb-2">
                  It may be wise to prepare some <strong>24.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> to
                  help the interaction flow
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">During the first few weeks</p>
              <ul className="list-disc ml-8">
                <li className="mb-2">
                  Work out some <strong>25.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> and
                  how to go about fulfilling them
                </li>
                <li className="mb-2">
                  Try to keep a completely <strong>26.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> as
                  you settle into the post
                </li>
                <li className="mb-2">
                  Avoid making proposals at <strong>27.</strong>{" "}
                  <Input type="text" className="w-32 inline-block mx-1" /> too
                  soon
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3 QUESTIONS */}
      <div>
        <h3 className="text-lg font-bold mb-4">SECTION 3: Questions 28-40</h3>{" "}
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 28-32</h4>
          <p className="mb-2">
            Read the text below and answer questions 28-40.
          </p>
          <p className="mb-4">
            <strong>Choose the correct letter, A, B, C or D.</strong>
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>28.</strong> In the first paragraph, the writer says
                that in 18th-century Scotland
              </p>
              <RadioGroup name="question28" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q28-a" value="A" className="mt-1" />
                  <Label htmlFor="q28-a" className="ml-2">
                    A only unmarried women were allowed to play football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-b" value="B" className="mt-1" />
                  <Label htmlFor="q28-b" className="ml-2">
                    B women's football was more common than men's football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-c" value="C" className="mt-1" />
                  <Label htmlFor="q28-c" className="ml-2">
                    C women were sometimes forbidden to watch football matches.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-d" value="D" className="mt-1" />
                  <Label htmlFor="q28-d" className="ml-2">
                    D skill at football might be considered when choosing a
                    wife.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29.</strong> The writer says that Nettie J Honeyball was
                unwilling to
              </p>
              <RadioGroup name="question29" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q29-a" value="A" className="mt-1" />
                  <Label htmlFor="q29-a" className="ml-2">
                    A take an active part in team sports.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-b" value="B" className="mt-1" />
                  <Label htmlFor="q29-b" className="ml-2">
                    B mix with people she considered lower class.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-c" value="C" className="mt-1" />
                  <Label htmlFor="q29-c" className="ml-2">
                    C let the public know of her involvement in football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-d" value="D" className="mt-1" />
                  <Label htmlFor="q29-d" className="ml-2">
                    D take a leadership role in the British Ladies' Football
                    Club.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30.</strong> The writer suggests that in Britain,
                between 1895 and 1914
              </p>
              <RadioGroup name="question30" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q30-a" value="A" className="mt-1" />
                  <Label htmlFor="q30-a" className="ml-2">
                    A society was not yet ready for women's football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-b" value="B" className="mt-1" />
                  <Label htmlFor="q30-b" className="ml-2">
                    B there were false reports of the decline of women's
                    football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-c" value="C" className="mt-1" />
                  <Label htmlFor="q30-c" className="ml-2">
                    C the media felt that women's football should not be
                    allowed.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-d" value="D" className="mt-1" />
                  <Label htmlFor="q30-d" className="ml-2">
                    D women's football mainly attracted people because it was
                    unusual.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31.</strong> After the First World War broke out in
                1914, factory managers
              </p>
              <RadioGroup name="question31" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q31-a" value="A" className="mt-1" />
                  <Label htmlFor="q31-a" className="ml-2">
                    A were initially unwilling to employ women.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q31-b" value="B" className="mt-1" />
                  <Label htmlFor="q31-b" className="ml-2">
                    B played in matches against female employees.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q31-c" value="C" className="mt-1" />
                  <Label htmlFor="q31-c" className="ml-2">
                    C allowed extra time for their employees to play football.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q31-d" value="D" className="mt-1" />
                  <Label htmlFor="q31-d" className="ml-2">
                    D decided that women's football might have positive effects.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 32-37</h4>
          <p className="mb-2">
            Look at the following statements (Questions 32-37) and the list of
            football organizations below.
          </p>
          <p className="mb-2">
            Match each statement with the correct organisation,{" "}
            <strong>A, B, C or D</strong>.
          </p>
          <p className="mb-2">
            Write the correct letter, <strong>A, B, C or D</strong>, in boxes
            32-37 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">List of Football Organisations</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p>
                <strong>A.</strong> the British Ladies' Football Club (BLFC)
              </p>
              <p>
                <strong>B.</strong> the Dick, Kerr's Ladies team
              </p>
              <p>
                <strong>C.</strong> the Football Association (FA)
              </p>
              <p>
                <strong>D.</strong> the Union of European Football Associations
                (UEFA)
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>32.</strong> It felt threatened by the rise of women's
                football.
              </p>
              <RadioGroup name="question32" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
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
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33.</strong> It was established by a male office worker
              </p>
              <RadioGroup name="question33" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
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
                <strong>34.</strong> It donated money from football matches to
                good causes
              </p>
              <RadioGroup name="question34" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
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
                <strong>35.</strong> It called for the ending of the ban on
                women's football in Britain
              </p>
              <RadioGroup name="question35" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
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
                <strong>36.</strong> it was accused of being old-fashioned
              </p>
              <RadioGroup name="question36" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
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

            <div className="question-item">
              <p className="mb-3">
                <strong>37.</strong> It was led by a believer in women's rights
              </p>
              <RadioGroup name="question37" className="flex gap-4">
                {["A", "B", "C", "D"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q37-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q37-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q37-${letter.toLowerCase()}`}
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
          <h4 className="font-bold mb-2">Questions 38-40</h4>
          <p className="mb-2">
            <strong>Complete the summary below.</strong>
          </p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">
              A catastrophic year for women's football
            </h4>

            <p className="mb-4">
              At the end of 1921, women's football teams were forbidden to use
              the <strong>38.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" /> of the
              Football Association, and were not allowed to have Football
              Association members as <strong>39.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" /> The FA
              said that women's clubs did not give enough to charity, and that
              there had been mismanagement of funds. Female workers accused the
              FA of <strong>40.</strong>{" "}
              <Input type="text" className="w-24 inline-block mx-1" /> against
              women, but the ban continued until 1971.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16GRTest4Questions;
