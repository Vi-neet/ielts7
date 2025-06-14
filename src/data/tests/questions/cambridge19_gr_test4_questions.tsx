// Cambridge 19 General Reading Test 4 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Cambridge19GRTest4Questions: React.FC = () => {
  return (
    <>
      {" "}
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">SECTION 1</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–5</h3>
          <p className="mb-2">
            Look at the six reviews of cafés in the town of Artingly, A–F.
          </p>
          <p className="mb-2">
            For which café are the following statements true?
          </p>
          <p className="mb-2">
            Write the correct letter, A–F, in boxes 1–5 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>1</strong> Cup sizes are more generous than you might
                expect.
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
                <strong>2</strong> Recent changes are likely to have a negative
                impact.
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
                <strong>3</strong> It needs better signage for customers.
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
                <strong>4</strong> It has a strong local customer base.
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
                <strong>5</strong> It deserves the public praise it has
                received.
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
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 6–14</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in the
            text?
          </p>
          <p className="mb-2">In boxes 6–14 on your answer sheet, write</p>
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
                <strong>6</strong> Builders have already started work on the new
                primary school.
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
                  <RadioGroupItem id="q6-ng" value="NG" />
                  <Label htmlFor="q6-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>7</strong> The new school will take in children from
                outside Frog Valley.
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
                  <RadioGroupItem id="q7-ng" value="NG" />
                  <Label htmlFor="q7-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>8</strong> There will be an increase in the number of
                shops.
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
                <strong>9</strong> The community centre will replace an existing
                social club building.
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
                <strong>10</strong> The swimming pool will be free for residents
                of Frog Valley.
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
                <strong>11</strong> The office space will accommodate businesses
                of different sizes.
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
                <strong>12</strong> The business car parking area will be
                underground.
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
                <strong>13</strong> The health centre will offer a wide range of
                new services.
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
                <strong>14</strong> At present, there are too few doctors at the
                health centre.
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
          </div>
        </div>{" "}
        <h2 className="text-lg font-bold mb-4">SECTION 2</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15–24</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in the
            text?
          </p>
          <p className="mb-2">In boxes 15–24 on your answer sheet, write</p>
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
                <strong>15</strong> All of the staff have overseas teaching
                experience.
              </p>
              <RadioGroup name="question15" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q15-true" value="TRUE" />
                  <Label htmlFor="q15-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q15-false" value="FALSE" />
                  <Label htmlFor="q15-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q15-ng" value="NG" />
                  <Label htmlFor="q15-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>16</strong> All modules are of equal length.
              </p>
              <RadioGroup name="question16" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q16-true" value="TRUE" />
                  <Label htmlFor="q16-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q16-false" value="FALSE" />
                  <Label htmlFor="q16-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q16-ng" value="NG" />
                  <Label htmlFor="q16-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>17</strong> Students are encouraged to take holidays in
                the two-week breaks between modules.
              </p>
              <RadioGroup name="question17" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q17-true" value="TRUE" />
                  <Label htmlFor="q17-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q17-false" value="FALSE" />
                  <Label htmlFor="q17-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q17-ng" value="NG" />
                  <Label htmlFor="q17-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>18</strong> Courses may have very different timetables.
              </p>
              <RadioGroup name="question18" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q18-true" value="TRUE" />
                  <Label htmlFor="q18-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q18-false" value="FALSE" />
                  <Label htmlFor="q18-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q18-ng" value="NG" />
                  <Label htmlFor="q18-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>19</strong> You can still obtain an attendance
                certificate if you have been absent through illness.
              </p>
              <RadioGroup name="question19" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q19-true" value="TRUE" />
                  <Label htmlFor="q19-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q19-false" value="FALSE" />
                  <Label htmlFor="q19-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q19-ng" value="NG" />
                  <Label htmlFor="q19-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>20</strong> Permission is required for students to bring
                guests into the restaurant.
              </p>
              <RadioGroup name="question20" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q20-true" value="TRUE" />
                  <Label htmlFor="q20-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q20-false" value="FALSE" />
                  <Label htmlFor="q20-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q20-ng" value="NG" />
                  <Label htmlFor="q20-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>21</strong> The coffee lounge is closed in the evenings.
              </p>
              <RadioGroup name="question21" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q21-true" value="TRUE" />
                  <Label htmlFor="q21-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q21-false" value="FALSE" />
                  <Label htmlFor="q21-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q21-ng" value="NG" />
                  <Label htmlFor="q21-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>22</strong> Groups of 20 or more can make reservations
                to dine at the restaurant on public holidays.
              </p>
              <RadioGroup name="question22" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q22-true" value="TRUE" />
                  <Label htmlFor="q22-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q22-false" value="FALSE" />
                  <Label htmlFor="q22-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q22-ng" value="NG" />
                  <Label htmlFor="q22-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>23</strong> Guests may use the swimming pool.
              </p>
              <RadioGroup name="question23" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q23-true" value="TRUE" />
                  <Label htmlFor="q23-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q23-false" value="FALSE" />
                  <Label htmlFor="q23-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q23-ng" value="NG" />
                  <Label htmlFor="q23-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>24</strong> Students are unable to enter the institute
                after 8.30 pm.
              </p>
              <RadioGroup name="question24" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q24-true" value="TRUE" />
                  <Label htmlFor="q24-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-false" value="FALSE" />
                  <Label htmlFor="q24-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-ng" value="NG" />
                  <Label htmlFor="q24-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 25–27</h3>
          <p className="mb-2">Answer the questions below.</p>
          <p className="mb-2">
            Choose <strong>NO MORE THAN THREE WORDS AND/OR A NUMBER</strong>{" "}
            from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 25–27 on your answer sheet.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>25</strong> To obtain a scholarship, what is the minimum
                course length?{" "}
                <Input type="text" className="w-40 mx-1 inline-block" />
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>26</strong> What do scholarship winners receive towards
                their airfares if they live over 2,500 km from Sydney?{" "}
                <Input type="text" className="w-40 mx-1 inline-block" />
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> Who pays for dependent children to travel?{" "}
                <Input type="text" className="w-40 mx-1 inline-block" />
              </p>
            </div>
          </div>
        </div>{" "}
        <h2 className="text-lg font-bold mb-4">SECTION 3</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28–30</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 28–30 on your answer sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-bold mb-2">Knepp Castle estate</h3>
            <p className="mb-2">
              About ten years ago, the decision was taken to rewild the farmland
              at Knepp Castle. Now the <strong>28</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> that used
              to be grown there has disappeared and the countryside is more like
              parts of <strong>29</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" />. The
              hedges surrounding the fields have been allowed to expand and deer
              can be seen running among the wild flowers. The estate hosts the
              largest number of <strong>30</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> of a
              particular species in the whole country and bird numbers are
              increasing. All these changes have happened remarkably quickly.
            </p>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 31–36</h3>
          <p className="mb-2">
            Look at the following statements (Questions 31–36) and the list of
            people below.
          </p>
          <p className="mb-2">
            Match each statement with the correct person, A–G.
          </p>
          <p className="mb-4">
            Write the correct letter, A–G, in boxes 31–36 on your answer sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-bold mb-2">List of People</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>A. Charlie Burrell</div>
              <div>B. Leo Linnartz</div>
              <div>C. George Monbiot</div>
              <div>D. Frans Vera</div>
              <div>E. David Balharry</div>
              <div>F. Wouter Helmer</div>
              <div>G. Elaine Gilligan</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>31</strong> Some people are against rewilding as it
                reduces the amount of crops that could provide much needed
                nourishment.
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>32</strong> It may not be easy to get city residents to
                take part in rewilding.
              </p>
              <RadioGroup name="question32" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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
                <strong>33</strong> Rewilding does not necessarily lead to a
                landscape thickly covered in trees.
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
                <strong>34</strong> It is acceptable to turn fields which do not
                yield many crops into natural spaces for people to enjoy.
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
                <strong>35</strong> The support of people living in the area is
                needed to make the authorities take rewilding seriously.
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
                <strong>36</strong> There is evidence that people get used to
                the idea of rewilding with time.
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
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 37–40</h3>
          <p className="mb-2">
            Choose the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
            <strong>C</strong> or <strong>D</strong>.
          </p>
          <p className="mb-4">
            Write the correct letter in boxes 37–40 on your answer sheet.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>37</strong> In the fifth paragraph, the writer points
                out that Burrell
              </p>
              <RadioGroup name="question37" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q37-a" value="A" />
                  <Label htmlFor="q37-a" className="ml-2">
                    A had clear financial reasons for rewilding his farm.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q37-b" value="B" />
                  <Label htmlFor="q37-b" className="ml-2">
                    B is worried that his land now looks extremely untidy.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q37-c" value="C" />
                  <Label htmlFor="q37-c" className="ml-2">
                    C has considerably increased the money he makes from his
                    farm.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q37-d" value="D" />
                  <Label htmlFor="q37-d" className="ml-2">
                    D was initially guided by other people who had let their
                    land go wild.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>38</strong> What does Helmer say about young people and
                the land?
              </p>
              <RadioGroup name="question38" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q38-a" value="A" />
                  <Label htmlFor="q38-a" className="ml-2">
                    A They want to leave it and find work in the city.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-b" value="B" />
                  <Label htmlFor="q38-b" className="ml-2">
                    B Many want to take over running their families' farms.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-c" value="C" />
                  <Label htmlFor="q38-c" className="ml-2">
                    C They have developed new ways of interacting with it.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-d" value="D" />
                  <Label htmlFor="q38-d" className="ml-2">
                    D Many are interested in building businesses on farmland.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39</strong> Ted Green is particularly concerned that
              </p>
              <RadioGroup name="question39" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q39-a" value="A" />
                  <Label htmlFor="q39-a" className="ml-2">
                    A there are increasing problems with water pollution in
                    cities.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-b" value="B" />
                  <Label htmlFor="q39-b" className="ml-2">
                    B money needs to be invested to create more dams across
                    rivers.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-c" value="C" />
                  <Label htmlFor="q39-c" className="ml-2">
                    C modern agricultural methods mean rain washes away
                    productive soil.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-d" value="D" />
                  <Label htmlFor="q39-d" className="ml-2">
                    D more barriers are needed to prevent rivers flooding
                    domestic homes.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40</strong> In the final paragraph, what point is made
                about rewilding?
              </p>
              <RadioGroup name="question40" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q40-a" value="A" />
                  <Label htmlFor="q40-a" className="ml-2">
                    A It will be very difficult to organise efficiently in large
                    expanses of countryside.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-b" value="B" />
                  <Label htmlFor="q40-b" className="ml-2">
                    B It may attract so much public interest that smaller
                    projects get forgotten.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-c" value="C" />
                  <Label htmlFor="q40-c" className="ml-2">
                    C It has caused problems for certain types of animals and
                    insects in Britain.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-d" value="D" />
                  <Label htmlFor="q40-d" className="ml-2">
                    D It may be a trend that will lose its popularity quite
                    quickly.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cambridge19GRTest4Questions;
