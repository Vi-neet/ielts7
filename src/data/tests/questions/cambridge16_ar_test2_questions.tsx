// Cambridge 16 Academic Reading Test 2 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 16 Academic Reading Test 2
 */
export const Cambridge16ARTest2Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 1: Questions 1-13
      </h2>

      {/* Questions 1-8 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 1-8</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in Reading Passage 1?
        </p>
        <p className="mb-2">In boxes 1-8 on your answer sheet, write</p>
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
              <strong>1.</strong> Most geoglyphs in England are located in a particular area of the country.
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
              <strong>2.</strong> There are more geoglyphs in the shape of a horse than any other creature.
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
              <strong>3.</strong> A recent dating of the Uffington White Horse indicates that people were mistaken about its age.
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
              <strong>4.</strong> Historians have come to an agreement about the origins of the Long Man of Wilmington.
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
              <strong>5.</strong> Geoglyphs were created by people placing white chalk on the hillside.
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
              <strong>6.</strong> Many geoglyphs in England are no longer visible.
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
              <strong>7.</strong> The shape of some geoglyphs has been altered over time.
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
              <strong>8.</strong> The fame of the Uffington White Horse is due to its size.
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
        </div>
      </div>

      {/* Questions 9-13 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 9-13</h3>
        <p className="mb-2">Complete the summary below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 9-13 on your answer sheet.
        </p>

        <div className="summary-box border border-gray-300 p-4 mb-4">
          <h4 className="font-bold mb-4">The Uffington White Horse</h4>
          
          <p className="mb-4"><strong>The location of the Uffington White Horse:</strong></p>
          <p className="mb-2">– a distance of 2.5 km from Uffington village</p>
          <p className="mb-2">– near an ancient road known as the <strong>9</strong> <Input type="text" className="w-32 mx-1 inline-block" /></p>
          <p className="mb-4">– close to an ancient cemetery that has a number of burial mounds</p>
          
          <p className="mb-4"><strong>Dating the Uffington White Horse:</strong></p>
          <p className="mb-2">– first reference to White Horse Hill appears in <strong>10</strong> <Input type="text" className="w-32 mx-1 inline-block" /> from the 1070s</p>
          <p className="mb-2">– horses shown on coins from the period 100 BCE – 1 BCE are similar in appearance</p>
          <p className="mb-4">– according to analysis of the surrounding <strong>11</strong> <Input type="text" className="w-32 mx-1 inline-block" />, the Horse is Late Bronze Age / Early Iron Age</p>
          
          <p className="mb-4"><strong>Possible reasons for creation of the Uffington White Horse:</strong></p>
          <p className="mb-2">– an emblem to indicate land ownership</p>
          <p className="mb-2">– formed part of an ancient ritual</p>
          <p className="mb-2">– was a representation of goddess Epona – associated with protection of horses and <strong>12</strong> <Input type="text" className="w-32 mx-1 inline-block" /></p>
          <p className="mb-2">– was a representation of a Welsh goddess called <strong>13</strong> <Input type="text" className="w-32 mx-1 inline-block" /></p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 2: Questions 14-26
      </h2>

      {/* Questions 14-16 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 14-16</h3>
        <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
        <p className="mb-4">Write the correct letter in boxes 14-16 on your answer sheet.</p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>14.</strong> What point does the writer make about microbes in the first paragraph?
            </p>
            <RadioGroup name="question14" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q14-a" value="A" />
                <Label htmlFor="q14-a" className="ml-2">
                  A. They adapt quickly to their environment.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-b" value="B" />
                <Label htmlFor="q14-b" className="ml-2">
                  B. The risk they pose has been exaggerated.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-c" value="C" />
                <Label htmlFor="q14-c" className="ml-2">
                  C. They are more plentiful in animal life than plant life.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q14-d" value="D" />
                <Label htmlFor="q14-d" className="ml-2">
                  D. They will continue to exist for longer than the human race.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>15.</strong> In the second paragraph, the writer is impressed by the fact that
            </p>
            <RadioGroup name="question15" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q15-a" value="A" />
                <Label htmlFor="q15-a" className="ml-2">
                  A. each species tends to have vastly different microbes.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-b" value="B" />
                <Label htmlFor="q15-b" className="ml-2">
                  B. some parts of the body contain relatively few microbes.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-c" value="C" />
                <Label htmlFor="q15-c" className="ml-2">
                  C. the average individual has more microbial cells than human ones.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q15-d" value="D" />
                <Label htmlFor="q15-d" className="ml-2">
                  D. scientists have limited understanding of how microbial cells behave.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>16.</strong> What is the writer doing in the fifth paragraph?
            </p>
            <RadioGroup name="question16" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q16-a" value="A" />
                <Label htmlFor="q16-a" className="ml-2">
                  A. explaining how a discovery was made
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-b" value="B" />
                <Label htmlFor="q16-b" className="ml-2">
                  B. comparing scientists' theories about microbes
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-c" value="C" />
                <Label htmlFor="q16-c" className="ml-2">
                  C. describing confusion among scientists
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q16-d" value="D" />
                <Label htmlFor="q16-d" className="ml-2">
                  D. giving details of how microbes cause disease
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 17-20 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 17-20</h3>
        <p className="mb-2">Complete the summary using the list of words, A-H, below.</p>
        <p className="mb-4">Write the correct letter, A-H, in boxes 17-20 on your answer sheet.</p>

        <div className="summary-box border border-gray-300 p-4 mb-4">
          <h4 className="font-bold mb-4">We should be more tolerant of microbes</h4>
          
          <p className="mb-4">
            Yong's book argues that we should be more tolerant of microbes. Many have a beneficial effect, and only a relatively small number lead to <strong>17</strong> <Input type="text" className="w-32 mx-1 inline-block" />. And although it is misleading to think of microbes as 'friendly', we should also stop thinking of them as the enemy. In fact, we should accept that our relationship with microbes is one based on <strong>18</strong> <Input type="text" className="w-32 mx-1 inline-block" />. New research shows that microbes have numerous benefits for humans. Amongst other things, they aid digestion, remove poisons, produce vitamins, and may even help reduce obesity. However, there is a growing problem. Our poor <strong>19</strong> <Input type="text" className="w-32 mx-1 inline-block" />, our overuse of antibiotics, and our excessive focus on <strong>20</strong> <Input type="text" className="w-32 mx-1 inline-block" /> are upsetting the bacterial balance and may be contributing to the huge increase in allergies and immune system problems.
          </p>
        </div>

        <div className="options-grid grid grid-cols-4 gap-4 mb-4">
          <div>A. solution</div>
          <div>B. partnership</div>
          <div>C. destruction</div>
          <div>D. exaggeration</div>
          <div>E. cleanliness</div>
          <div>F. regulations</div>
          <div>G. illness</div>
          <div>H. nutrition</div>
        </div>
      </div>

      {/* Questions 21-26 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 21-26</h3>
        <p className="mb-2">
          Do the following statements agree with the claims of the writer in Reading Passage 2?
        </p>
        <p className="mb-2">In boxes 21-26 on your answer sheet, write</p>
        <div className="mb-4">
          <p className="mb-1">
            <strong>YES</strong> if the statement agrees with the claims of the writer
          </p>
          <p className="mb-1">
            <strong>NO</strong> if the statement contradicts the claims of the writer
          </p>
          <p className="mb-1">
            <strong>NOT GIVEN</strong> if it is impossible to say what the writer thinks about this
          </p>
        </div>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>21.</strong> It is possible that using antibacterial products in the home fails to have the desired effect.
            </p>
            <RadioGroup name="question21" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q21-yes" value="YES" />
                <Label htmlFor="q21-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q21-no" value="NO" />
                <Label htmlFor="q21-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q21-ng" value="NOT GIVEN" />
                <Label htmlFor="q21-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>22.</strong> It is a good idea to ensure that children come into contact with as few bacteria as possible.
            </p>
            <RadioGroup name="question22" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q22-yes" value="YES" />
                <Label htmlFor="q22-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q22-no" value="NO" />
                <Label htmlFor="q22-no" className="ml-2">
                  NO
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q22-ng" value="NOT GIVEN" />
                <Label htmlFor="q22-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>23.</strong> Yong's book contains more case studies than are necessary.
            </p>
            <RadioGroup name="question23" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q23-yes" value="YES" />
                <Label htmlFor="q23-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q23-no" value="NO" />
                <Label htmlFor="q23-no" className="ml-2">
                  NO
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
              <strong>24.</strong> The case study about bacteria that prevent squid from being attacked may have limited appeal.
            </p>
            <RadioGroup name="question24" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q24-yes" value="YES" />
                <Label htmlFor="q24-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q24-no" value="NO" />
                <Label htmlFor="q24-no" className="ml-2">
                  NO
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
              <strong>25.</strong> Efforts to control dengue fever have been surprisingly successful.
            </p>
            <RadioGroup name="question25" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q25-yes" value="YES" />
                <Label htmlFor="q25-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q25-no" value="NO" />
                <Label htmlFor="q25-no" className="ml-2">
                  NO
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
              <strong>26.</strong> Microbes that reduce the risk of infection have already been put inside the walls of some hospital wards.
            </p>
            <RadioGroup name="question26" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q26-yes" value="YES" />
                <Label htmlFor="q26-yes" className="ml-2">
                  YES
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q26-no" value="NO" />
                <Label htmlFor="q26-no" className="ml-2">
                  NO
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

      {/* Questions 27-30 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 27-30</h3>
        <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
        <p className="mb-4">Write the correct letter in boxes 27-30 on your answer sheet.</p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>27.</strong> What point does the writer make in the first paragraph?
            </p>
            <RadioGroup name="question27" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q27-a" value="A" />
                <Label htmlFor="q27-a" className="ml-2">
                  A. Wisdom appears to be unique to the human race.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-b" value="B" />
                <Label htmlFor="q27-b" className="ml-2">
                  B. A basic assumption about wisdom may be wrong.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-c" value="C" />
                <Label htmlFor="q27-c" className="ml-2">
                  C. Concepts of wisdom may depend on the society we belong to.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-d" value="D" />
                <Label htmlFor="q27-d" className="ml-2">
                  D. There is still much to be discovered about the nature of wisdom.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>28.</strong> What does Igor Grossmann suggest about the ability to make wise decisions?
            </p>
            <RadioGroup name="question28" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q28-a" value="A" />
                <Label htmlFor="q28-a" className="ml-2">
                  A. It can vary greatly from one person to another.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-b" value="B" />
                <Label htmlFor="q28-b" className="ml-2">
                  B. Earlier research into it was based on unreliable data.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-c" value="C" />
                <Label htmlFor="q28-c" className="ml-2">
                  C. The importance of certain influences on it was underestimated.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-d" value="D" />
                <Label htmlFor="q28-d" className="ml-2">
                  D. Various branches of psychology define it according to their own criteria.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>29.</strong> According to the third paragraph, Grossmann claims that the level of wisdom an individual shows
            </p>
            <RadioGroup name="question29" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q29-a" value="A" />
                <Label htmlFor="q29-a" className="ml-2">
                  A. can be greater than they think it is.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-b" value="B" />
                <Label htmlFor="q29-b" className="ml-2">
                  B. will be different in different circumstances.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-c" value="C" />
                <Label htmlFor="q29-c" className="ml-2">
                  C. may be determined by particular aspects of their personality.
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-d" value="D" />
                <Label htmlFor="q29-d" className="ml-2">
                  D. should develop over time as a result of their life experiences.
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>30.</strong> What is described in the fifth paragraph?
            </p>
            <RadioGroup name="question30" className="space-y-2">
              <div className="flex items-center">
                <RadioGroupItem id="q30-a" value="A" />
                <Label htmlFor="q30-a" className="ml-2">
                  A. a difficulty encountered when attempting to reason wisely
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-b" value="B" />
                <Label htmlFor="q30-b" className="ml-2">
                  B. an example of the type of person who is likely to reason wisely
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-c" value="C" />
                <Label htmlFor="q30-c" className="ml-2">
                  C. a controversial view about the benefits of reasoning wisely
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-d" value="D" />
                <Label htmlFor="q30-d" className="ml-2">
                  D. a recommended strategy that can help people to reason wisely
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 31-35 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 31-35</h3>
        <p className="mb-2">Complete the summary using the list of words, A-J, below.</p>
        <p className="mb-4">Write the correct letter, A-J, in boxes 31-35 on your answer sheet.</p>

        <div className="summary-box border border-gray-300 p-4 mb-4">
          <h4 className="font-bold mb-4">The characteristics of wise reasoning</h4>
          
          <p className="mb-4">
            Igor Grossmann and colleagues have established four characteristics which enable us to make wise decisions. It is important to have a certain degree of <strong>31</strong> <Input type="text" className="w-32 mx-1 inline-block" /> regarding the extent of our knowledge, and to take into account <strong>32</strong> <Input type="text" className="w-32 mx-1 inline-block" /> which may not be the same as our own. We should also be able to take a broad <strong>33</strong> <Input type="text" className="w-32 mx-1 inline-block" /> of any situation. Another key characteristic is being aware of the likelihood of alterations in the way that people relate to each other. Grossmann also believes that it is better to regard scenarios with <strong>34</strong> <Input type="text" className="w-32 mx-1 inline-block" />. By avoiding the first-person perspective, we focus more on <strong>35</strong> <Input type="text" className="w-32 mx-1 inline-block" /> and on other moral ideals, which in turn leads to wiser decision-making.
          </p>
        </div>

        <div className="options-grid grid grid-cols-5 gap-4 mb-4">
          <div>A. opinions</div>
          <div>B. confidence</div>
          <div>C. view</div>
          <div>D. modesty</div>
          <div>E. problems</div>
          <div>F. objectivity</div>
          <div>G. fairness</div>
          <div>H. experiences</div>
          <div>I. range</div>
          <div>J. reasons</div>
        </div>
      </div>

      {/* Questions 36-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 36-40</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in Reading Passage 3?
        </p>
        <p className="mb-2">In boxes 36-40 on your answer sheet, write</p>
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
              <strong>36.</strong> Students participating in the job prospects experiment could choose one of two perspectives to take.
            </p>
            <RadioGroup name="question36" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q36-true" value="TRUE" />
                <Label htmlFor="q36-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q36-false" value="FALSE" />
                <Label htmlFor="q36-false" className="ml-2">
                  FALSE
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
              <strong>37.</strong> Participants in the couples experiment were aware that they were taking part in a study about wise reasoning.
            </p>
            <RadioGroup name="question37" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q37-true" value="TRUE" />
                <Label htmlFor="q37-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q37-false" value="FALSE" />
                <Label htmlFor="q37-false" className="ml-2">
                  FALSE
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
              <strong>38.</strong> In the couples experiment, the length of the couples' relationships had an impact on the results.
            </p>
            <RadioGroup name="question38" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q38-true" value="TRUE" />
                <Label htmlFor="q38-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q38-false" value="FALSE" />
                <Label htmlFor="q38-false" className="ml-2">
                  FALSE
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
              <strong>39.</strong> In both experiments, the participants who looked at the situation from a more detached viewpoint tended to make wiser decisions.
            </p>
            <RadioGroup name="question39" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q39-true" value="TRUE" />
                <Label htmlFor="q39-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q39-false" value="FALSE" />
                <Label htmlFor="q39-false" className="ml-2">
                  FALSE
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
              <strong>40.</strong> Grossmann believes that a person's wisdom is determined by their intelligence to only a very limited extent.
            </p>
            <RadioGroup name="question40" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q40-true" value="TRUE" />
                <Label htmlFor="q40-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q40-false" value="FALSE" />
                <Label htmlFor="q40-false" className="ml-2">
                  FALSE
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

export default Cambridge16ARTest2Questions;
