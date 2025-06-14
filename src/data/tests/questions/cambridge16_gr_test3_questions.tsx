import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 General Reading Test 3
 */
export const Cambridge16GRTest3Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">      {/* SECTION 1 QUESTIONS */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">SECTION 1: Questions 1-14</h3>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 1-5</h4>
          <p className="mb-2">Read the text below and answer questions 1-5.</p>
          <p className="mb-2">The text has five paragraphs, A-E.</p>
          <p className="mb-2">
            <strong>Which paragraph mentions the following?</strong>
          </p>
          <p className="mb-2">
            <strong>Write the correct letter, A-E,</strong> in boxes 1-5 on your
            answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>1.</strong> The chance to go into caves
              </p>
              <RadioGroup name="question1" className="flex gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q1-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q1-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q1-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>2.</strong> The chance to spend time beside a lake
              </p>
              <RadioGroup name="question2" className="flex gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q2-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q2-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q2-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>3.</strong> Some unusual architecture
              </p>
              <RadioGroup name="question3" className="flex gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q3-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q3-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q3-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>4.</strong> Unsuitability for young children
              </p>
              <RadioGroup name="question4" className="flex gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q4-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q4-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q4-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>5.</strong> The length of the walk depending on the weather
              </p>
              <RadioGroup name="question5" className="flex gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q5-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q5-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q5-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 6-14</h4>
          <p className="mb-2">
            Do the following statements agree with the information given in the text?
          </p>
          <p className="mb-2">In boxes 6-14 on your answer sheet, write</p>
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
                <strong>6.</strong> Traditionally, most scarecrows were the same size as a human being.
              </p>
              <RadioGroup name="question6" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q6-true" value="TRUE" />
                  <Label htmlFor="q6-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-false" value="FALSE" />
                  <Label htmlFor="q6-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-ng" value="NOT GIVEN" />
                  <Label htmlFor="q6-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>7.</strong> The competition in September was the first one in Maplehampton.
              </p>
              <RadioGroup name="question7" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q7-true" value="TRUE" />
                  <Label htmlFor="q7-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-false" value="FALSE" />
                  <Label htmlFor="q7-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-ng" value="NOT GIVEN" />
                  <Label htmlFor="q7-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>8.</strong> The farmers who provided materials could take part in the competition.
              </p>
              <RadioGroup name="question8" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q8-true" value="TRUE" />
                  <Label htmlFor="q8-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q8-false" value="FALSE" />
                  <Label htmlFor="q8-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q8-ng" value="NOT GIVEN" />
                  <Label htmlFor="q8-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>9.</strong> Old clothes were supplied to the people who made the scarecrows.
              </p>
              <RadioGroup name="question9" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q9-true" value="TRUE" />
                  <Label htmlFor="q9-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q9-false" value="FALSE" />
                  <Label htmlFor="q9-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q9-ng" value="NOT GIVEN" />
                  <Label htmlFor="q9-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>10.</strong> The venue for the competition was changed because of the weather.
              </p>
              <RadioGroup name="question10" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q10-true" value="TRUE" />
                  <Label htmlFor="q10-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q10-false" value="FALSE" />
                  <Label htmlFor="q10-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q10-ng" value="NOT GIVEN" />
                  <Label htmlFor="q10-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>11.</strong> Competitors could get advice on making their scarecrows.
              </p>
              <RadioGroup name="question11" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q11-true" value="TRUE" />
                  <Label htmlFor="q11-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q11-false" value="FALSE" />
                  <Label htmlFor="q11-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q11-ng" value="NOT GIVEN" />
                  <Label htmlFor="q11-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>12.</strong> In the judges' opinion, the scarecrow dressed as an alien was better than the giant bird.
              </p>
              <RadioGroup name="question12" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q12-true" value="TRUE" />
                  <Label htmlFor="q12-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q12-false" value="FALSE" />
                  <Label htmlFor="q12-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q12-ng" value="NOT GIVEN" />
                  <Label htmlFor="q12-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>13.</strong> The competition organisers supplied a picnic for the competitors and spectators.
              </p>
              <RadioGroup name="question13" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q13-true" value="TRUE" />
                  <Label htmlFor="q13-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q13-false" value="FALSE" />
                  <Label htmlFor="q13-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q13-ng" value="NOT GIVEN" />
                  <Label htmlFor="q13-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>14.</strong> Alice Cameron bought a scarecrow to frighten birds away from her crops.
              </p>
              <RadioGroup name="question14" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q14-true" value="TRUE" />
                  <Label htmlFor="q14-true" className="ml-2">TRUE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q14-false" value="FALSE" />
                  <Label htmlFor="q14-false" className="ml-2">FALSE</Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q14-ng" value="NOT GIVEN" />
                  <Label htmlFor="q14-ng" className="ml-2">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>      {/* SECTION 2 QUESTIONS */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4">SECTION 2: Questions 15-27</h3>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 15-22</h4>
          <p className="mb-2">Read the text below and answer Questions 15-22.</p>
          <p className="mb-2">
            <strong>Complete the notes below.</strong>
          </p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">Notes on being a great barista</h4>
            
            <div className="mb-4">
              <p className="font-semibold mb-2">Serving the customer</p>
              <ul className="list-disc ml-8 mb-4">
                <li className="mb-2">
                  Be sure you make drinks that are <strong>15.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />{" "}
                  for the customer
                </li>
                <li className="mb-2">
                  Ignore any <strong>16.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />{" "}
                  around you
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Using the equipment</p>
              <ul className="list-disc ml-8 mb-4">
                <li className="mb-2">
                  Clean the machine <strong>17.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />{" "}
                  regularly
                </li>
                <li className="mb-2">
                  Grinding: always use ground coffee that is <strong>18.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </li>
                <li>Remember that air causes the smell to fade</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Making the coffee</p>
              <ul className="list-disc ml-8 mb-4">
                <li>Know when to stop making the espresso</li>
                <li className="mb-2">
                  Too early reduces the <strong>19.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </li>
                <li className="mb-2">
                  Too late makes the coffee <strong>20.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-2">Giving good customer service</p>
              <ul className="list-disc ml-8">
                <li className="mb-2">
                  Talk to your customers: ask about the customers'{" "}
                  <strong>21.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />
                </li>
                <li className="mb-2">
                  Know something about the important <strong>22.</strong>{" "}
                  <Input type="text" className="w-24 inline-block mx-1" />{" "}
                  in the area
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 23-27</h4>
          <p className="mb-2">
            <strong>Complete the flow chart below.</strong>
          </p>
          <p className="mb-4">
            Choose <strong>NO MORE THAN TWO WORDS</strong> from the text for each
            answer.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">Tips on running a meeting</h4>
            <p className="mb-4">
              Arrange seats according to the types of meeting and participants
            </p>
            <ul className="list-disc ml-8 space-y-3">
              <li>
                In small meetings, ask people for some <strong>23.</strong>{" "}
                <Input type="text" className="w-32 inline-block mx-1" />{" "}
                as they introduce themselves
              </li>
              <li>
                Make sure the <strong>24.</strong>{" "}
                <Input type="text" className="w-32 inline-block mx-1" />{" "}
                is available to everyone.
              </li>
              <li>
                Involve people in the discussion and solve any{" "}
                <strong>25.</strong>{" "}
                <Input type="text" className="w-32 inline-block mx-1" />{" "}
                quickly if they arise
              </li>
              <li>Note action points and who is responsible for them</li>
              <li>
                Avoid <strong>26.</strong>{" "}
                <Input type="text" className="w-32 inline-block mx-1" />{" "}
                by involving a range of people in tasks
              </li>
              <li>
                Thank people for coming, and possibly have some kind of{" "}
                <strong>27.</strong>{" "}
                <Input type="text" className="w-32 inline-block mx-1" />{" "}
                afterwards
              </li>
            </ul>
          </div>
        </div>
      </div>      {/* SECTION 3 QUESTIONS */}
      <div>
        <h3 className="text-lg font-bold mb-4">SECTION 3: Questions 28-40</h3>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 28-33</h4>
          <p className="mb-2">Read the text below and answer questions 28-40.</p>
          <p className="mb-2">
            The text has six sections, <strong>A-F</strong>.
          </p>
          <p className="mb-2">
            Choose the correct heading for each section from the list of headings
            below.
          </p>
          <p className="mb-4">
            Write the correct number, <strong>i-viii</strong>, in boxes 28-33 on
            your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">List of Headings</h4>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p><strong>i</strong> The link between feathers and a wider international awareness</p>
              <p><strong>ii</strong> An unsuitable decoration for military purposes</p>
              <p><strong>iii</strong> A significant rise in the popularity of feathers</p>
              <p><strong>iv</strong> Growing disapproval of the trapping of birds for their feathers</p>
              <p><strong>v</strong> A new approach to researching the past</p>
              <p><strong>vi</strong> Feathers as protection and as a symbol of sophistication</p>
              <p><strong>vii</strong> An interesting relationship between the wearing of feathers and gender</p>
              <p><strong>viii</strong> A reason for the continued use of feathers by soldiers</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>28.</strong> Section A
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q28-${heading}`}>
                    <RadioGroupItem id={`q28-${heading}`} value={heading} />
                    <Label htmlFor={`q28-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29.</strong> Section B
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q29-${heading}`}>
                    <RadioGroupItem id={`q29-${heading}`} value={heading} />
                    <Label htmlFor={`q29-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30.</strong> Section C
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q30-${heading}`}>
                    <RadioGroupItem id={`q30-${heading}`} value={heading} />
                    <Label htmlFor={`q30-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31.</strong> Section D
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q31-${heading}`}>
                    <RadioGroupItem id={`q31-${heading}`} value={heading} />
                    <Label htmlFor={`q31-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>32.</strong> Section E
              </p>
              <RadioGroup name="question32" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q32-${heading}`}>
                    <RadioGroupItem id={`q32-${heading}`} value={heading} />
                    <Label htmlFor={`q32-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33.</strong> Section F
              </p>
              <RadioGroup name="question33" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map((heading) => (
                  <div className="flex items-center" key={`q33-${heading}`}>
                    <RadioGroupItem id={`q33-${heading}`} value={heading} />
                    <Label htmlFor={`q33-${heading}`} className="ml-2">
                      {heading}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 34-36</h4>
          <p className="mb-4">
            <strong>Choose the correct letter, A, B, C or D.</strong>
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>34.</strong> In Section B, what information is given about the use of feathers in the 16th century?
              </p>
              <RadioGroup name="question34" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q34-a" value="A" className="mt-1" />
                  <Label htmlFor="q34-a" className="ml-2">
                    A Some were not real feathers, but imitations.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-b" value="B" className="mt-1" />
                  <Label htmlFor="q34-b" className="ml-2">
                    B They were sometimes coloured artificially.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-c" value="C" className="mt-1" />
                  <Label htmlFor="q34-c" className="ml-2">
                    C Birds were specially bred for their feathers.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-d" value="D" className="mt-1" />
                  <Label htmlFor="q34-d" className="ml-2">
                    D There was some disapproval of their use for decoration.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>35.</strong> Rublack suggests the feather costume worn by Duke Frederick in 1599 represented
              </p>
              <RadioGroup name="question35" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q35-a" value="A" className="mt-1" />
                  <Label htmlFor="q35-a" className="ml-2">
                    A a lack of sensitivity to American traditions.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-b" value="B" className="mt-1" />
                  <Label htmlFor="q35-b" className="ml-2">
                    B a rejection of the beliefs held by those around him.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-c" value="C" className="mt-1" />
                  <Label htmlFor="q35-c" className="ml-2">
                    C a positive attitude towards the culture of the Americas.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-d" value="D" className="mt-1" />
                  <Label htmlFor="q35-d" className="ml-2">
                    D a wish to follow a fashion of the time.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>36.</strong> According to Rublack, one reason why feathers survived in European military costume was because
              </p>
              <RadioGroup name="question36" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q36-a" value="A" className="mt-1" />
                  <Label htmlFor="q36-a" className="ml-2">
                    A birds were seen as having religious significance.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-b" value="B" className="mt-1" />
                  <Label htmlFor="q36-b" className="ml-2">
                    B feathers suggested certain qualities about military activities.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-c" value="C" className="mt-1" />
                  <Label htmlFor="q36-c" className="ml-2">
                    C the power of feathers was feared by other cultures.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q36-d" value="D" className="mt-1" />
                  <Label htmlFor="q36-d" className="ml-2">
                    D soldiers came to associate particular birds with warlike qualities.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h4 className="font-bold mb-2">Questions 37-40</h4>
          <p className="mb-2">
            Complete each sentence with the correct ending, <strong>A-G</strong>,
            below.
          </p>

          <div className="border p-4 mb-6">
            <div className="grid grid-cols-1 gap-2 text-sm">
              <p><strong>A</strong> lost popularity in the 16th century.</p>
              <p><strong>B</strong> were used as protection from bad weather.</p>
              <p><strong>C</strong> are worn today by some soldiers.</p>
              <p><strong>D</strong> could only be worn by men of noble birth.</p>
              <p><strong>E</strong> were used to create an outfit worn by a person of high status.</p>
              <p><strong>F</strong> were once awarded for military achievements.</p>
              <p><strong>G</strong> became popular decorations for urban dwellers in the 16th century.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>37.</strong> Hats decorated with long black feathers
              </p>
              <RadioGroup name="question37" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div className="flex items-center" key={`q37-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q37-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q37-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>38.</strong> Feathers from cranes and swallows
              </p>
              <RadioGroup name="question38" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div className="flex items-center" key={`q38-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q38-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q38-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39.</strong> Feathers from exotic birds
              </p>
              <RadioGroup name="question39" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div className="flex items-center" key={`q39-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q39-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q39-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40.</strong> Peacock feathers
              </p>
              <RadioGroup name="question40" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div className="flex items-center" key={`q40-${letter.toLowerCase()}`}>
                    <RadioGroupItem id={`q40-${letter.toLowerCase()}`} value={letter} />
                    <Label htmlFor={`q40-${letter.toLowerCase()}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16GRTest3Questions;
