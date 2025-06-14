// Cambridge 16 Academic Reading Test 1 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 Academic Reading Test 1
 */
export const Cambridge16ARTest1Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 1 : Questions 1-13
      </h2>

      {/* Questions 1-7 */}
      <div className="question-set mb-8">
        <p className="mb-4">
          Do the following statements agree with the information given in Reading Passage 1?
        </p>
        <p className="mb-2">In boxes 1-7 on your answer sheet, write</p>
        <p className="mb-1">
          <strong>TRUE</strong> if the statement agrees with the information
        </p>
        <p className="mb-1">
          <strong>FALSE</strong> if the statement contradicts the information
        </p>
        <p className="mb-4">
          <strong>NOT GIVEN</strong> if there is no information on this
        </p>

        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-2">
              <strong>1.</strong> Polar bears suffer from various health problems due to the build-up of fat under their skin.
            </p>
            <RadioGroup name="question1" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q1-true" value="TRUE" />
                <Label htmlFor="q1-true" className="ml-2">TRUE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q1-false" value="FALSE" />
                <Label htmlFor="q1-false" className="ml-2">FALSE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q1-ng" value="NOT GIVEN" />
                <Label htmlFor="q1-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>2.</strong> The study done by Liu and his colleagues compared different groups of polar bears.
            </p>
            <RadioGroup name="question2" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q2-true" value="TRUE" />
                <Label htmlFor="q2-true" className="ml-2">TRUE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q2-false" value="FALSE" />
                <Label htmlFor="q2-false" className="ml-2">FALSE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q2-ng" value="NOT GIVEN" />
                <Label htmlFor="q2-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>3.</strong> Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.
            </p>
            <RadioGroup name="question3" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q3-true" value="TRUE" />
                <Label htmlFor="q3-true" className="ml-2">TRUE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q3-false" value="FALSE" />
                <Label htmlFor="q3-false" className="ml-2">FALSE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q3-ng" value="NOT GIVEN" />
                <Label htmlFor="q3-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>4.</strong> Polar bears are able to control their levels of 'bad' cholesterol by genetic means.
            </p>
            <RadioGroup name="question4" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q4-true" value="TRUE" />
                <Label htmlFor="q4-true" className="ml-2">TRUE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q4-false" value="FALSE" />
                <Label htmlFor="q4-false" className="ml-2">FALSE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q4-ng" value="NOT GIVEN" />
                <Label htmlFor="q4-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>5.</strong> Female polar bears are able to survive for about six months without food.
            </p>
            <RadioGroup name="question5" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q5-true" value="TRUE" />
                <Label htmlFor="q5-true" className="ml-2">TRUE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q5-false" value="FALSE" />
                <Label htmlFor="q5-false" className="ml-2">FALSE</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q5-ng" value="NOT GIVEN" />
                <Label htmlFor="q5-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>6.</strong> It was found that the bones of female polar bears were very weak when they came out of their dens in spring.
            </p>
            <RadioGroup name="question6" className="flex gap-6">
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
                <Label htmlFor="q6-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>7.</strong> The polar bear's mechanism for increasing bone density could also be used by people one day.
            </p>
            <RadioGroup name="question7" className="flex gap-6">
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
                <Label htmlFor="q7-ng" className="ml-2">NG</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 8-13 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 8-13</h3>
        <p className="mb-2">Complete the table below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 8-13 on your answer sheet.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">Reasons why polar bears should be protected</h4>
          <p className="mb-2">
            – People think of bears as unintelligent and <strong>8</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />
          </p>
          <p className="mb-3">However, this may not be correct. For example:</p>
          <p className="mb-2">
            – In Tennoji Zoo, a bear has been seen using a branch as a <strong>9</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />
          </p>
          <p className="mb-2 ml-4">
            This allowed him to knock down some <strong>10</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />
          </p>
          <p className="mb-2">
            – A wild polar bear worked out a method of reaching a platform where a <strong>11</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> was located.
          </p>
          <p className="mb-2">
            – Polar bears have displayed behaviour such as conscious manipulation of objects and activity similar to a <strong>12</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />
          </p>
          <p className="mb-3">Bears may also display emotions. For example:</p>
          <p className="mb-2">
            – They may make movements suggesting <strong>13</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> if disappointed when hunting.
          </p>
          <p className="mb-2">– They may form relationships with other species.</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 2 : Questions 14-26
      </h2>

      {/* Questions 14-20 */}
      <div className="question-set mb-8">
        <p className="mb-4">
          Reading Passage 2 has seven paragraphs, A-G.
        </p>
        <p className="mb-2">
          Choose the correct heading for each paragraph from the list of headings below.
        </p>
        <p className="mb-4">
          Write the correct number, i-ix, in boxes 14-20 on your answer sheet.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">List of Headings</h4>
          <p className="mb-1"><strong>i</strong> The areas and artefacts within the pyramid itself</p>
          <p className="mb-1"><strong>ii</strong> A difficult task for those involved</p>
          <p className="mb-1"><strong>iii</strong> A king who saved his people</p>
          <p className="mb-1"><strong>iv</strong> A single certainty among other less definite facts</p>
          <p className="mb-1"><strong>v</strong> An overview of the external buildings and areas</p>
          <p className="mb-1"><strong>vi</strong> A pyramid design that others copied</p>
          <p className="mb-1"><strong>vii</strong> An idea for changing the design of burial structures</p>
          <p className="mb-1"><strong>viii</strong> An incredible experience despite the few remains</p>
          <p className="mb-1"><strong>ix</strong> The answers to some unexpected questions</p>
        </div>

        <div className="space-y-4">
          {[14, 15, 16, 17, 18, 19, 20].map((num, index) => (
            <div className="question-item" key={num}>
              <p className="mb-2">
                <strong>{num}.</strong> Paragraph {String.fromCharCode(65 + index)}
              </p>
              <RadioGroup name={`question${num}`} className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"].map((roman) => (
                  <div className="flex items-center" key={`q${num}-${roman}`}>
                    <RadioGroupItem id={`q${num}-${roman}`} value={roman} />
                    <Label htmlFor={`q${num}-${roman}`} className="ml-2">{roman}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </div>

      {/* Questions 21-24 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 21-24</h3>
        <p className="mb-2">Complete the notes below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 21-24 on your answer sheet.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">The Step Pyramid of Djoser</h4>
          <p className="mb-2">
            The complex that includes the Step Pyramid and its surroundings is considered to be as big as an Egyptian <strong>21</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> of the past. The area outside the pyramid included accommodation that was occupied by <strong>22</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />, along with many other buildings and features. A wall ran around the outside of the complex and a number of false entrances were built into this. In addition, a long <strong>23</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> encircled the wall. As a result, any visitors who had not been invited were cleverly prevented from entering the pyramid grounds unless they knew the <strong>24</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> of the real entrance.
          </p>
        </div>
      </div>

      {/* Questions 25-26 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 25-26</h3>
        <p className="mb-2">Choose <strong>TWO</strong> letters, A-E.</p>
        <p className="mb-4">
          Write the correct letters in boxes 25 and 26 on your answer sheet.
        </p>
        
        <p className="mb-4">
          Which <strong>TWO</strong> of the following points does the writer make about King Djoser?
        </p>

        <div className="space-y-2">
          <div className="flex items-start">
            <input type="checkbox" id="q25-26-a" className="mt-1 mr-2" />
            <label htmlFor="q25-26-a" className="text-sm">
              <strong>A.</strong> Initially he had to be persuaded to build in stone rather than clay.
            </label>
          </div>
          <div className="flex items-start">
            <input type="checkbox" id="q25-26-b" className="mt-1 mr-2" />
            <label htmlFor="q25-26-b" className="text-sm">
              <strong>B.</strong> There is disagreement concerning the length of his reign.
            </label>
          </div>
          <div className="flex items-start">
            <input type="checkbox" id="q25-26-c" className="mt-1 mr-2" />
            <label htmlFor="q25-26-c" className="text-sm">
              <strong>C.</strong> He failed to appreciate Imhotep's part in the design of the Step Pyramid.
            </label>
          </div>
          <div className="flex items-start">
            <input type="checkbox" id="q25-26-d" className="mt-1 mr-2" />
            <label htmlFor="q25-26-d" className="text-sm">
              <strong>D.</strong> A few of his possessions were still in his tomb when archaeologists found it.
            </label>
          </div>
          <div className="flex items-start">
            <input type="checkbox" id="q25-26-e" className="mt-1 mr-2" />
            <label htmlFor="q25-26-e" className="text-sm">
              <strong>E.</strong> He criticised the design and construction of other pyramids in Egypt.
            </label>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 3 : Questions 27-40
      </h2>

      {/* Questions 27-30 */}
      <div className="question-set mb-8">
        <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
        <p className="mb-4">
          Write the correct letter in boxes 27-30 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>27.</strong> The first paragraph tells us about
            </p>
            <RadioGroup name="question27" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q27-a" value="A" className="mt-1" />
                <Label htmlFor="q27-a" className="ml-2 text-sm">
                  <strong>A.</strong> the kinds of jobs that will be most affected by the growth of AI.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q27-b" value="B" className="mt-1" />
                <Label htmlFor="q27-b" className="ml-2 text-sm">
                  <strong>B.</strong> the extent to which AI will alter the nature of the work that people do.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q27-c" value="C" className="mt-1" />
                <Label htmlFor="q27-c" className="ml-2 text-sm">
                  <strong>C.</strong> the proportion of the world's labour force who will have jobs in AI in the future.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q27-d" value="D" className="mt-1" />
                <Label htmlFor="q27-d" className="ml-2 text-sm">
                  <strong>D.</strong> the difference between ways that embodied and disembodied AI with impact on workers.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>28.</strong> According to the second paragraph, what is Stella Pachidi's view of the 'knowledge economy'?
            </p>
            <RadioGroup name="question28" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q28-a" value="A" className="mt-1" />
                <Label htmlFor="q28-a" className="ml-2 text-sm">
                  <strong>A.</strong> It is having an influence on the number of jobs available.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-b" value="B" className="mt-1" />
                <Label htmlFor="q28-b" className="ml-2 text-sm">
                  <strong>B.</strong> It is changing people's attitudes towards their occupations.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-c" value="C" className="mt-1" />
                <Label htmlFor="q28-c" className="ml-2 text-sm">
                  <strong>C.</strong> It is the main reason why the production sector is declining.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q28-d" value="D" className="mt-1" />
                <Label htmlFor="q28-d" className="ml-2 text-sm">
                  <strong>D.</strong> It is a key factor driving current developments in the workplace.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>29.</strong> What did Pachidi observe at the telecommunications company?
            </p>
            <RadioGroup name="question29" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q29-a" value="A" className="mt-1" />
                <Label htmlFor="q29-a" className="ml-2 text-sm">
                  <strong>A.</strong> staff disagreeing with the recommendations of AI
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-b" value="B" className="mt-1" />
                <Label htmlFor="q29-b" className="ml-2 text-sm">
                  <strong>B.</strong> staff feeling resentful about the intrusion of AI in their work
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-c" value="C" className="mt-1" />
                <Label htmlFor="q29-c" className="ml-2 text-sm">
                  <strong>C.</strong> staff making sure that AI produces the results that they want
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q29-d" value="D" className="mt-1" />
                <Label htmlFor="q29-d" className="ml-2 text-sm">
                  <strong>D.</strong> staff allowing AI to carry out tasks they ought to do themselves
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>30.</strong> In his recently published research, Ewan McGaughey
            </p>
            <RadioGroup name="question30" className="space-y-2">
              <div className="flex items-start">
                <RadioGroupItem id="q30-a" value="A" className="mt-1" />
                <Label htmlFor="q30-a" className="ml-2 text-sm">
                  <strong>A.</strong> challenges the idea that redundancy is a negative thing.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-b" value="B" className="mt-1" />
                <Label htmlFor="q30-b" className="ml-2 text-sm">
                  <strong>B.</strong> shows the profound effect of mass unemployment on society.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-c" value="C" className="mt-1" />
                <Label htmlFor="q30-c" className="ml-2 text-sm">
                  <strong>C.</strong> highlights some differences between past and future job losses.
                </Label>
              </div>
              <div className="flex items-start">
                <RadioGroupItem id="q30-d" value="D" className="mt-1" />
                <Label htmlFor="q30-d" className="ml-2 text-sm">
                  <strong>D.</strong> illustrates how changes in the job market can be successfully handled.
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 31-34 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 31-34</h3>
        <p className="mb-2">Complete the summary using the list of words, A-G, below.</p>
        <p className="mb-4">
          Write the correct letter, A-G, in boxes 31-34 on your answer sheet.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">The 'algorithmication' of jobs</h4>
          <p className="mb-4">
            Stella Pachidi of Cambridge Judge Business School has been focusing on the 'algorithmication' of jobs which rely not on production but on <strong>31</strong>{" "}
            <Input type="text" className="w-16 mx-1 inline-block" />. While monitoring a telecommunications company, Pachidi observed a growing <strong>32</strong>{" "}
            <Input type="text" className="w-16 mx-1 inline-block" /> on the recommendations made by AI, as workers begin to learn through the 'algorithm's eyes'. Meanwhile, staff are deterred from experimenting and using their own <strong>33</strong>{" "}
            <Input type="text" className="w-16 mx-1 inline-block" />, and are therefore prevented from achieving innovation. To avoid the kind of situations which Pachidi observed, researchers are trying to make AI's decision-making process easier to comprehend, and to increase users' <strong>34</strong>{" "}
            <Input type="text" className="w-16 mx-1 inline-block" /> with regard to the technology.
          </p>
          
          <div className="mt-4">
            <div className="flex flex-wrap gap-4">
              <span><strong>A.</strong> pressure</span>
              <span><strong>B.</strong> satisfaction</span>
              <span><strong>C.</strong> intuition</span>
              <span><strong>D.</strong> promotion</span>
              <span><strong>E.</strong> reliance</span>
              <span><strong>F.</strong> confidence</span>
              <span><strong>G.</strong> information</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions 35-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 35-40</h3>
        <p className="mb-2">
          Look at the following statements (Questions 35-40) and the list of people below.
        </p>
        <p className="mb-2">
          Match each statement with the correct person, A, B or C.
        </p>
        <p className="mb-4">
          Write the correct letter, A, B or C, in boxes 35-40 on your answer sheet.
        </p>
        <p className="mb-4">
          <strong>NB</strong> You may use any letter more than once.
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-md">
          <h4 className="font-bold mb-3">List of people</h4>
          <p className="mb-1"><strong>A</strong> Stella Pachidi</p>
          <p className="mb-1"><strong>B</strong> Hamish Low</p>
          <p className="mb-1"><strong>C</strong> Ewan McGaughey</p>
        </div>

        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-2">
              <strong>35.</strong> Greater levels of automation will not result in lower employment.
            </p>
            <RadioGroup name="question35" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q35-a" value="A" />
                <Label htmlFor="q35-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q35-b" value="B" />
                <Label htmlFor="q35-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q35-c" value="C" />
                <Label htmlFor="q35-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>36.</strong> There are several reasons why AI is appealing to businesses.
            </p>
            <RadioGroup name="question36" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q36-a" value="A" />
                <Label htmlFor="q36-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q36-b" value="B" />
                <Label htmlFor="q36-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q36-c" value="C" />
                <Label htmlFor="q36-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>37.</strong> AI's potential to transform people's lives has parallels with major cultural shifts which occurred in previous eras.
            </p>
            <RadioGroup name="question37" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q37-a" value="A" />
                <Label htmlFor="q37-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q37-b" value="B" />
                <Label htmlFor="q37-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q37-c" value="C" />
                <Label htmlFor="q37-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>38.</strong> It is important to be aware of the range of problems that AI causes.
            </p>
            <RadioGroup name="question38" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q38-a" value="A" />
                <Label htmlFor="q38-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q38-b" value="B" />
                <Label htmlFor="q38-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q38-c" value="C" />
                <Label htmlFor="q38-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>39.</strong> People are going to follow a less conventional career path than in the past.
            </p>
            <RadioGroup name="question39" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q39-a" value="A" />
                <Label htmlFor="q39-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q39-b" value="B" />
                <Label htmlFor="q39-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q39-c" value="C" />
                <Label htmlFor="q39-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-2">
              <strong>40.</strong> Authorities should take measures to ensure that there will be adequately paid work for everyone.
            </p>
            <RadioGroup name="question40" className="flex gap-6">
              <div className="flex items-center">
                <RadioGroupItem id="q40-a" value="A" />
                <Label htmlFor="q40-a" className="ml-2">A. Stella Pachidi</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q40-b" value="B" />
                <Label htmlFor="q40-b" className="ml-2">B. Hamish Low</Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q40-c" value="C" />
                <Label htmlFor="q40-c" className="ml-2">C. Ewan McGaughey</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16ARTest1Questions;
