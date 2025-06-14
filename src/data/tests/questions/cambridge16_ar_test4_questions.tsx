// Cambridge 16 Academic Reading Test 4 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 Academic Reading Test 4
 */
export const Cambridge16ARTest4Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 1: Questions 1-13
      </h2>

      {/* Questions 1-6 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 1-6</h3>
        <p className="mb-2">Label the diagrams below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each
          answer.
        </p>{" "}
        <p className="mb-4">
          Write your answers in boxes 1-6 on your answer sheet.
        </p>
        {/* Diagram Images */}
        <div className="mb-6">
          <div className="mb-4">
            <img
              src="https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam-16-Reading-Test-4-01-1024x626.jpg"
              alt="Qanat tunnel construction diagram showing posts, shafts, and water flow"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
            />
          </div>
          <div className="mb-4">
            <img
              src="https://ieltstrainingonline.com/wp-content/uploads/2021/07/Cam-16-Reading-Test-4-02-1024x500.jpg"
              alt="Detailed view of tunnel shaft construction with handholds and covers"
              className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-2">
              <strong>1.</strong> _________________ to direct the tunnelling.
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              Water runs a <strong>2.</strong> _________________ used by local
              people.
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              Vertical shafts to remove earth and for <strong>3.</strong>{" "}
              _________________
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>4.</strong> _________________ made of wood or stone.
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>5.</strong> _________________ attached to plump line
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              handholds and footholds used for <strong>6.</strong>{" "}
              _________________
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>
        </div>
      </div>

      {/* Questions 7-10 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 7-10</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in
          Reading Passage 1?
        </p>
        <p className="mb-2">In boxes 7-10 on your answer sheet, write</p>
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
              <strong>7.</strong> The counter-excavation method completely
              replaced the qanat method in the 6th century BCE.
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
              <strong>8.</strong> Only experienced builders were employed to
              construct a tunnel using the counter-excavation method.
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
              <strong>9.</strong> The information about a problem that occurred
              during the construction of the Saldae aqueduct system was found in
              an ancient book.
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
              <strong>10.</strong> The mistake made by the builders of the
              Saldae aqueduct system was that the two parts of the tunnel failed
              to meet.
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
        </div>
      </div>

      {/* Questions 11-13 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 11-13</h3>
        <p className="mb-2">Answer the questions below.</p>
        <p className="mb-2">
          Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for
          each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 11-13 on your answer sheet.
        </p>

        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-2">
              <strong>11.</strong> What type of mineral were the Dolaucothi
              mines in Wales built to extract?
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>12.</strong> In addition to the patron, whose name might
              be carved onto a tunnel?
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>13.</strong> What part of Seleuceia Pieria was the Çevlik
              tunnel built to protect?
            </p>
            <Input type="text" className="w-48" placeholder="Your answer" />
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 2: Questions 14-26
      </h2>

      {/* Questions 14-17 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 14-17</h3>
        <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
        <p className="mb-4">
          Write the correct letter in boxes 14-17 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>14.</strong> What is the writer's main point in the first
              paragraph?
            </p>
            <RadioGroup name="question14" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q14-a" value="A" />
                <Label htmlFor="q14-a" className="ml-2">
                  A. Our use of technology is having a hidden effect on us.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-b" value="B" />
                <Label htmlFor="q14-b" className="ml-2">
                  B. Technology can be used to help youngsters to read.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-c" value="C" />
                <Label htmlFor="q14-c" className="ml-2">
                  C. Travellers should be encouraged to use technology on
                  planes.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-d" value="D" />
                <Label htmlFor="q14-d" className="ml-2">
                  D. Playing games is a more popular use of technology than
                  reading.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>15.</strong> What main point does Sherry Turkle make about
              innovation?
            </p>
            <RadioGroup name="question15" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q15-a" value="A" />
                <Label htmlFor="q15-a" className="ml-2">
                  A. Technological innovation has led to a reduction in print
                  reading.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-b" value="B" />
                <Label htmlFor="q15-b" className="ml-2">
                  B. We should pay attention to what might be lost when
                  innovation occurs.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-c" value="C" />
                <Label htmlFor="q15-c" className="ml-2">
                  C. We should encourage more young people to become involved in
                  innovation.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-d" value="D" />
                <Label htmlFor="q15-d" className="ml-2">
                  D. There is a difference between developing products and
                  developing ideas.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>16.</strong> What point is the writer making in the fourth
              paragraph?
            </p>
            <RadioGroup name="question16" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q16-a" value="A" />
                <Label htmlFor="q16-a" className="ml-2">
                  A. Humans have an inborn ability to read and write.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-b" value="B" />
                <Label htmlFor="q16-b" className="ml-2">
                  B. Reading can be done using many different mediums.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-c" value="C" />
                <Label htmlFor="q16-c" className="ml-2">
                  C. Writing systems make unexpected demands on the brain.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-d" value="D" />
                <Label htmlFor="q16-d" className="ml-2">
                  D. Some brain circuits adjust to whatever is required of them.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>17.</strong> According to Mark Edmundson, the attitude of
              college students
            </p>
            <RadioGroup name="question17" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q17-a" value="A" />
                <Label htmlFor="q17-a" className="ml-2">
                  A. has changed the way he teaches.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q17-b" value="B" />
                <Label htmlFor="q17-b" className="ml-2">
                  B. has influenced what they select to read.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q17-c" value="C" />
                <Label htmlFor="q17-c" className="ml-2">
                  C. does not worry him as much as it does others.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q17-d" value="D" />
                <Label htmlFor="q17-d" className="ml-2">
                  D. does not match the views of the general public.
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 18-22 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 18-22</h3>
        <p className="mb-2">
          Complete the summary using the list of words, A-H, below.
        </p>
        <p className="mb-4">
          Write the correct letter, A-H, in boxes 18-22 on your answer sheet.
        </p>

        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">Studies on digital screen use</h4>
          <p className="mb-4">
            There have been many studies on digital screen use, showing some{" "}
            <strong>18</strong> _______ trends. Psychologist Anne Mangen gave
            high-school students a short story to read, half using digital and
            half using print mediums. Her team then used a question-and-answer
            technique to find out how <strong>19</strong> _______ each group's
            understanding of the plot was. The findings showed a clear pattern
            in the responses, with those who read screens finding the order of
            information <strong>20</strong> _______ to recall. Studies by Ziming
            Liu show that students are tending to read <strong>21</strong>{" "}
            _______ words and phrases in a text to save time. This approach, she
            says, gives the reader a superficial understanding of the{" "}
            <strong>22</strong> _______ content of material, leaving no time for
            thought.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>A. fast</div>
          <div>B. isolated</div>
          <div>C. emotional</div>
          <div>D. worrying</div>
          <div>E. many</div>
          <div>F. hard</div>
          <div>G. combined</div>
          <div>H. thorough</div>
        </div>

        <div className="space-y-4">
          <div className="question-item flex items-center">
            <strong>18.</strong>
            <Input type="text" className="w-20 ml-2" placeholder="Letter" />
          </div>
          <div className="question-item flex items-center">
            <strong>19.</strong>
            <Input type="text" className="w-20 ml-2" placeholder="Letter" />
          </div>
          <div className="question-item flex items-center">
            <strong>20.</strong>
            <Input type="text" className="w-20 ml-2" placeholder="Letter" />
          </div>
          <div className="question-item flex items-center">
            <strong>21.</strong>
            <Input type="text" className="w-20 ml-2" placeholder="Letter" />
          </div>
          <div className="question-item flex items-center">
            <strong>22.</strong>
            <Input type="text" className="w-20 ml-2" placeholder="Letter" />
          </div>
        </div>
      </div>

      {/* Questions 23-26 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 23-26</h3>
        <p className="mb-2">
          Do the following statements agree with the views of the writer in
          Reading Passage 2?
        </p>
        <p className="mb-2">In boxes 23-26 on your answer sheet, write</p>
        <div className="mb-4">
          <p className="mb-1">
            <strong>TRUE</strong> if the statement agrees with the views of the
            writer
          </p>
          <p className="mb-1">
            <strong>FALSE</strong> if the statement contradicts the views of the
            writer
          </p>
          <p className="mb-1">
            <strong>NOT GIVEN</strong> if it is impossible to say what the
            writer thinks about this
          </p>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>23.</strong> The medium we use to read can affect our
              choice of reading content.
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
                <RadioGroupItem id="q23-ng" value="NOT GIVEN" />
                <Label htmlFor="q23-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>24.</strong> Some age groups are more likely to lose their
              complex reading skills than others.
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
                <RadioGroupItem id="q24-ng" value="NOT GIVEN" />
                <Label htmlFor="q24-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>25.</strong> False information has become more widespread
              in today's digital era.
            </p>
            <RadioGroup name="question25" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q25-true" value="TRUE" />
                <Label htmlFor="q25-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q25-false" value="FALSE" />
                <Label htmlFor="q25-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q25-ng" value="NOT GIVEN" />
                <Label htmlFor="q25-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>26.</strong> We still have opportunities to rectify the
              problems that technology is presenting.
            </p>
            <RadioGroup name="question26" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q26-true" value="TRUE" />
                <Label htmlFor="q26-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q26-false" value="FALSE" />
                <Label htmlFor="q26-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q26-ng" value="NOT GIVEN" />
                <Label htmlFor="q26-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 3: Questions 27-40
      </h2>

      {/* Questions 27-32 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 27-32</h3>
        <p className="mb-2">Reading Passage 3 has six sections, A-F.</p>
        <p className="mb-2">
          Choose the correct heading for each section from the list of headings
          below.
        </p>
        <p className="mb-4">
          Write the correct number, i-viii, in boxes 27-32 on your answer sheet.
        </p>

        <div className="mb-4 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">List of Headings</h4>
          <div className="grid grid-cols-1 gap-2">
            <div>i. An increasing divergence of attitudes towards AI</div>
            <div>
              ii. Reasons why we have more faith in human judgement than in AI
            </div>
            <div>
              iii. The superiority of AI projections over those made by humans
            </div>
            <div>
              iv. The process by which AI can help us make good decisions
            </div>
            <div>v. The advantages of involving users in AI processes</div>
            <div>vi. Widespread distrust of an AI innovation</div>
            <div>vii. Encouraging openness about how AI functions</div>
            <div>viii. A surprisingly successful AI application</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-2">
              <strong>27.</strong> Section A
            </p>
            <RadioGroup name="question27" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q27-i" value="i" />
                <Label htmlFor="q27-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-ii" value="ii" />
                <Label htmlFor="q27-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-iii" value="iii" />
                <Label htmlFor="q27-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-iv" value="iv" />
                <Label htmlFor="q27-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-v" value="v" />
                <Label htmlFor="q27-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-vi" value="vi" />
                <Label htmlFor="q27-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-vii" value="vii" />
                <Label htmlFor="q27-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-viii" value="viii" />
                <Label htmlFor="q27-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>28.</strong> Section B
            </p>
            <RadioGroup name="question28" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q28-i" value="i" />
                <Label htmlFor="q28-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-ii" value="ii" />
                <Label htmlFor="q28-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-iii" value="iii" />
                <Label htmlFor="q28-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-iv" value="iv" />
                <Label htmlFor="q28-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-v" value="v" />
                <Label htmlFor="q28-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-vi" value="vi" />
                <Label htmlFor="q28-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-vii" value="vii" />
                <Label htmlFor="q28-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-viii" value="viii" />
                <Label htmlFor="q28-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>29.</strong> Section C
            </p>
            <RadioGroup name="question29" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q29-i" value="i" />
                <Label htmlFor="q29-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-ii" value="ii" />
                <Label htmlFor="q29-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-iii" value="iii" />
                <Label htmlFor="q29-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-iv" value="iv" />
                <Label htmlFor="q29-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-v" value="v" />
                <Label htmlFor="q29-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-vi" value="vi" />
                <Label htmlFor="q29-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-vii" value="vii" />
                <Label htmlFor="q29-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-viii" value="viii" />
                <Label htmlFor="q29-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>30.</strong> Section D
            </p>
            <RadioGroup name="question30" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q30-i" value="i" />
                <Label htmlFor="q30-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-ii" value="ii" />
                <Label htmlFor="q30-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-iii" value="iii" />
                <Label htmlFor="q30-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-iv" value="iv" />
                <Label htmlFor="q30-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-v" value="v" />
                <Label htmlFor="q30-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-vi" value="vi" />
                <Label htmlFor="q30-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-vii" value="vii" />
                <Label htmlFor="q30-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-viii" value="viii" />
                <Label htmlFor="q30-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>31.</strong> Section E
            </p>
            <RadioGroup name="question31" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q31-i" value="i" />
                <Label htmlFor="q31-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-ii" value="ii" />
                <Label htmlFor="q31-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-iii" value="iii" />
                <Label htmlFor="q31-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-iv" value="iv" />
                <Label htmlFor="q31-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-v" value="v" />
                <Label htmlFor="q31-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-vi" value="vi" />
                <Label htmlFor="q31-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-vii" value="vii" />
                <Label htmlFor="q31-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-viii" value="viii" />
                <Label htmlFor="q31-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>32.</strong> Section F
            </p>
            <RadioGroup name="question32" className="flex gap-4 flex-wrap">
              <div className="flex items-center">
                <RadioGroupItem id="q32-i" value="i" />
                <Label htmlFor="q32-i" className="ml-2">
                  i
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-ii" value="ii" />
                <Label htmlFor="q32-ii" className="ml-2">
                  ii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-iii" value="iii" />
                <Label htmlFor="q32-iii" className="ml-2">
                  iii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-iv" value="iv" />
                <Label htmlFor="q32-iv" className="ml-2">
                  iv
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-v" value="v" />
                <Label htmlFor="q32-v" className="ml-2">
                  v
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-vi" value="vi" />
                <Label htmlFor="q32-vi" className="ml-2">
                  vi
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-vii" value="vii" />
                <Label htmlFor="q32-vii" className="ml-2">
                  vii
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-viii" value="viii" />
                <Label htmlFor="q32-viii" className="ml-2">
                  viii
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 33-35 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 33-35</h3>
        <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
        <p className="mb-4">
          Write the correct letter in boxes 33-35 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>33.</strong> What is the writer doing in Section A?
            </p>
            <RadioGroup name="question33" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q33-a" value="A" />
                <Label htmlFor="q33-a" className="ml-2">
                  A. providing a solution to a concern
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q33-b" value="B" />
                <Label htmlFor="q33-b" className="ml-2">
                  B. justifying an opinion about an issue
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q33-c" value="C" />
                <Label htmlFor="q33-c" className="ml-2">
                  C. highlighting the existence of a problem
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q33-d" value="D" />
                <Label htmlFor="q33-d" className="ml-2">
                  D. explaining the reasons for a phenomenon
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>34.</strong> According to Section C, why might some people
              be reluctant to accept AI?
            </p>
            <RadioGroup name="question34" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q34-a" value="A" />
                <Label htmlFor="q34-a" className="ml-2">
                  A. They are afraid it will replace humans in decision-making
                  jobs.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q34-b" value="B" />
                <Label htmlFor="q34-b" className="ml-2">
                  B. Its complexity makes them feel that they are at a
                  disadvantage.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q34-c" value="C" />
                <Label htmlFor="q34-c" className="ml-2">
                  C. They would rather wait for the technology to be tested over
                  a period of time.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q34-d" value="D" />
                <Label htmlFor="q34-d" className="ml-2">
                  D. Misunderstandings about how it works make it seem more
                  challenging than it is.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>35.</strong> What does the writer say about the media in
              Section C of the text?
            </p>
            <RadioGroup name="question35" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q35-a" value="A" />
                <Label htmlFor="q35-a" className="ml-2">
                  A. It leads the public to be mistrustful of AI.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q35-b" value="B" />
                <Label htmlFor="q35-b" className="ml-2">
                  B. It devotes an excessive amount of attention to AI.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q35-c" value="C" />
                <Label htmlFor="q35-c" className="ml-2">
                  C. Its reports of incidents involving AI are often inaccurate.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q35-d" value="D" />
                <Label htmlFor="q35-d" className="ml-2">
                  D. It gives the impression that AI failures are due to
                  designer error.
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 36-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 36-40</h3>
        <p className="mb-2">
          Do the following statements agree with the claims of the writer in
          Reading Passage 3?
        </p>
        <p className="mb-2">In boxes 36-40 on your answer sheet, write</p>
        <div className="mb-4">
          <p className="mb-1">
            <strong>YES</strong> if the statement agrees with the claims of the
            writer
          </p>
          <p className="mb-1">
            <strong>NO</strong> if the statement contradicts the claims of the
            writer
          </p>
          <p className="mb-1">
            <strong>NOT GIVEN</strong> if it is impossible to say what the
            writer thinks about this
          </p>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>36.</strong> Subjective depictions of AI in sci-fi films
              make people change their opinions about automation.
            </p>
            <RadioGroup name="question36" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q36-yes" value="YES" />
                <Label htmlFor="q36-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q36-no" value="NO" />
                <Label htmlFor="q36-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q36-ng" value="NOT GIVEN" />
                <Label htmlFor="q36-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>37.</strong> Portrayals of AI in media and entertainment
              are likely to become more positive.
            </p>
            <RadioGroup name="question37" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q37-yes" value="YES" />
                <Label htmlFor="q37-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q37-no" value="NO" />
                <Label htmlFor="q37-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q37-ng" value="NOT GIVEN" />
                <Label htmlFor="q37-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>38.</strong> Rejection of the possibilities of AI may have
              a negative effect on many people's lives.
            </p>
            <RadioGroup name="question38" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q38-yes" value="YES" />
                <Label htmlFor="q38-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q38-no" value="NO" />
                <Label htmlFor="q38-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q38-ng" value="NOT GIVEN" />
                <Label htmlFor="q38-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>39.</strong> Familiarity with AI has very little impact on
              people's attitudes to the technology.
            </p>
            <RadioGroup name="question39" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q39-yes" value="YES" />
                <Label htmlFor="q39-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q39-no" value="NO" />
                <Label htmlFor="q39-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q39-ng" value="NOT GIVEN" />
                <Label htmlFor="q39-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>40.</strong> AI applications which users are able to
              modify are more likely to gain consumer approval.
            </p>
            <RadioGroup name="question40" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q40-yes" value="YES" />
                <Label htmlFor="q40-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q40-no" value="NO" />
                <Label htmlFor="q40-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q40-ng" value="NOT GIVEN" />
                <Label htmlFor="q40-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16ARTest4Questions;
