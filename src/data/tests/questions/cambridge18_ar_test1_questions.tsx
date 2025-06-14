import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Component that displays the questions for Cambridge 18 Academic Reading Test 1
 */
export const Cambridge18ARTest1Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 1: Questions 1-13
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1-3</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>NO MORE THAN TWO WORDS AND/OR A NUMBER</strong> from
            the passage for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 1-3 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">Urban Farming in Paris</h4>

            <p className="mb-3">
              <strong>1</strong> Vertical tubes are used to grow strawberries,{" "}
              <Input type="text" className="w-32 inline-block mx-1" />, and
              herbs.
            </p>

            <p className="mb-3">
              <strong>2</strong> There will eventually be a daily harvest of as
              much as <Input type="text" className="w-32 inline-block mx-1" />{" "}
              in weight of fruit and vegetables.
            </p>

            <p className="mb-3">
              <strong>3</strong> It may be possible that the farm's produce will
              account for as much as 10% of the city's{" "}
              <Input type="text" className="w-32 inline-block mx-1" /> overall.
            </p>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 4-7</h3>
          <p className="mb-2">Complete the table below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 4-7 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">
              Intensive farming versus aeroponic urban farming
            </h4>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left"></th>
                  <th className="border p-2 text-left">Growth</th>
                  <th className="border p-2 text-left">Selection</th>
                  <th className="border p-2 text-left">Sale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Intensive farming</td>
                  <td className="border p-2">
                    <ul className="list-disc pl-4">
                      <li>
                        wide range of <strong>4</strong>{" "}
                        <Input type="text" className="w-32 inline-block mx-1" />{" "}
                        used
                      </li>
                      <li>techniques pollute air</li>
                    </ul>
                  </td>
                  <td className="border p-2">
                    <ul className="list-disc pl-4">
                      <li>quality not good</li>
                      <li>
                        varieties of fruit and vegetables chosen that can
                        survive long <strong>5</strong>{" "}
                        <Input type="text" className="w-32 inline-block mx-1" />
                      </li>
                    </ul>
                  </td>
                  <td className="border p-2">
                    <ul className="list-disc pl-4">
                      <li>
                        <strong>6</strong>{" "}
                        <Input type="text" className="w-32 inline-block mx-1" />{" "}
                        receive very little of overall income
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Aeroponic urban farming</td>
                  <td className="border p-2">
                    <ul className="list-disc pl-4">
                      <li>no soil used</li>
                      <li>nutrients added to water, which is recycled</li>
                    </ul>
                  </td>
                  <td className="border p-2">
                    <ul className="list-disc pl-4">
                      <li>
                        produce chosen because of its <strong>7</strong>{" "}
                        <Input type="text" className="w-32 inline-block mx-1" />
                      </li>
                    </ul>
                  </td>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8-13</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>
          <p className="mb-2">In boxes 8-13 on your answer sheet, write</p>
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

          <div className="space-y-4">
            {" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>8</strong> Urban farming can take place above or below
                ground.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q8-true" />
                  <Label htmlFor="q8-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q8-false" />
                  <Label htmlFor="q8-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q8-ng" />
                  <Label htmlFor="q8-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>9</strong> Some of the equipment used in aeroponic
                farming can be made by hand.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q9-true" />
                  <Label htmlFor="q9-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q9-false" />
                  <Label htmlFor="q9-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q9-ng" />
                  <Label htmlFor="q9-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>10</strong> Urban farming relies more on electricity
                than some other types of farming.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q10-true" />
                  <Label htmlFor="q10-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q10-false" />
                  <Label htmlFor="q10-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q10-ng" />
                  <Label htmlFor="q10-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>11</strong> Fruit and vegetables grown on an aeroponic
                urban farm are cheaper than traditionally grown organic produce.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q11-true" />
                  <Label htmlFor="q11-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q11-false" />
                  <Label htmlFor="q11-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q11-ng" />
                  <Label htmlFor="q11-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>12</strong> Most produce can be grown on an aeroponic
                urban farm at any time of the year.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q12-true" />
                  <Label htmlFor="q12-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q12-false" />
                  <Label htmlFor="q12-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q12-ng" />
                  <Label htmlFor="q12-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>13</strong> Beans take longer to grow on an urban farm
                than other vegetables.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q13-true" />
                  <Label htmlFor="q13-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q13-false" />
                  <Label htmlFor="q13-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q13-ng" />
                  <Label htmlFor="q13-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>

      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 2: Questions 14-26
        </h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 14-18</h3>
          <p className="mb-2">Reading Passage 2 has seven paragraphs, A-G.</p>
          <p className="mb-2">
            Which paragraph contains the following information?
          </p>{" "}
          <p className="mb-4">
            Write the correct letter, A-G, in boxes 14-18 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>
          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>14</strong> bad outcomes for a forest when people focus
                only on its financial reward
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q14-a" />
                  <Label htmlFor="q14-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q14-b" />
                  <Label htmlFor="q14-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q14-c" />
                  <Label htmlFor="q14-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q14-d" />
                  <Label htmlFor="q14-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q14-e" />
                  <Label htmlFor="q14-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q14-f" />
                  <Label htmlFor="q14-f">F</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="G" id="q14-g" />
                  <Label htmlFor="q14-g">G</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>15</strong> reference to the aspects of any tree that
                contribute to its worth
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q15-a" />
                  <Label htmlFor="q15-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q15-b" />
                  <Label htmlFor="q15-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q15-c" />
                  <Label htmlFor="q15-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q15-d" />
                  <Label htmlFor="q15-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q15-e" />
                  <Label htmlFor="q15-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q15-f" />
                  <Label htmlFor="q15-f">F</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="G" id="q15-g" />
                  <Label htmlFor="q15-g">G</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>16</strong> mention of the potential use of wood to help
                run vehicles
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q16-a" />
                  <Label htmlFor="q16-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q16-b" />
                  <Label htmlFor="q16-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q16-c" />
                  <Label htmlFor="q16-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q16-d" />
                  <Label htmlFor="q16-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q16-e" />
                  <Label htmlFor="q16-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q16-f" />
                  <Label htmlFor="q16-f">F</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="G" id="q16-g" />
                  <Label htmlFor="q16-g">G</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>17</strong> examples of insects that attack trees
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q17-a" />
                  <Label htmlFor="q17-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q17-b" />
                  <Label htmlFor="q17-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q17-c" />
                  <Label htmlFor="q17-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q17-d" />
                  <Label htmlFor="q17-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q17-e" />
                  <Label htmlFor="q17-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q17-f" />
                  <Label htmlFor="q17-f">F</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="G" id="q17-g" />
                  <Label htmlFor="q17-g">G</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>18</strong> an alternative name for trees that produce
                low-use wood
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q18-a" />
                  <Label htmlFor="q18-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q18-b" />
                  <Label htmlFor="q18-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q18-c" />
                  <Label htmlFor="q18-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q18-d" />
                  <Label htmlFor="q18-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q18-e" />
                  <Label htmlFor="q18-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q18-f" />
                  <Label htmlFor="q18-f">F</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="G" id="q18-g" />
                  <Label htmlFor="q18-g">G</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 19-21</h3>
          <p className="mb-2">
            Look at the following purposes (Questions 19-21) and the list of
            timber cuts below.
          </p>
          <p className="mb-2">
            Match each purpose with the correct timber cut, A, B or C.
          </p>
          <p className="mb-2">
            Write the correct letter, A, B or C, in boxes 19-21 on your answer
            sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="mb-4 border p-3">
            <h4 className="font-bold mb-2">List of Timber Cuts</h4>
            <p className="mb-1">
              <strong>A</strong> a TSI Cut
            </p>
            <p className="mb-1">
              <strong>B</strong> a Salvage Cut
            </p>
            <p className="mb-1">
              <strong>C</strong> a Shelterwood Cut
            </p>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>19</strong> to remove trees that are diseased
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q19-a" />
                  <Label htmlFor="q19-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q19-b" />
                  <Label htmlFor="q19-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q19-c" />
                  <Label htmlFor="q19-c">C</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>20</strong> to generate income across a number of years
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q20-a" />
                  <Label htmlFor="q20-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q20-b" />
                  <Label htmlFor="q20-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q20-c" />
                  <Label htmlFor="q20-c">C</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>21</strong> to create a forest whose trees are close in
                age
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q21-a" />
                  <Label htmlFor="q21-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q21-b" />
                  <Label htmlFor="q21-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q21-c" />
                  <Label htmlFor="q21-c">C</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 22-26</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 22-26 on your answer sheet.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>22</strong> Some dead wood is removed to avoid the
                possibility of{" "}
                <Input type="text" className="w-32 inline-block mx-1" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>23</strong> The{" "}
                <Input type="text" className="w-32 inline-block mx-1" /> from
                the tops of cut trees can help improve soil quality.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>24</strong> Some damaged trees should be left, as their{" "}
                <Input type="text" className="w-32 inline-block mx-1" /> provide
                habitats for a range of creatures.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>25</strong> Some trees that are small, such as{" "}
                <Input type="text" className="w-32 inline-block mx-1" />, are a
                source of food for animals and insects.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>26</strong> Any trees that are{" "}
                <Input type="text" className="w-32 inline-block mx-1" /> should
                be left to grow, as they add to the variety of species in the
                forest.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 3: Questions 27-40
        </h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27-31</h3>
          <p className="mb-2">Reading Passage 3 has six sections, A-F.</p>
          <p className="mb-2">
            Which section contains the following information?
          </p>
          <p className="mb-4">
            Write the correct letter, A-F, in boxes 27-31 on your answer sheet.
          </p>{" "}
          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> a reference to the cooperation that takes
                place to try and minimise risk
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q27-a" />
                  <Label htmlFor="q27-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q27-b" />
                  <Label htmlFor="q27-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q27-c" />
                  <Label htmlFor="q27-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q27-d" />
                  <Label htmlFor="q27-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q27-e" />
                  <Label htmlFor="q27-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q27-f" />
                  <Label htmlFor="q27-f">F</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>28</strong> an explanation of a person's aims
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q28-a" />
                  <Label htmlFor="q28-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q28-b" />
                  <Label htmlFor="q28-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q28-c" />
                  <Label htmlFor="q28-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q28-d" />
                  <Label htmlFor="q28-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q28-e" />
                  <Label htmlFor="q28-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q28-f" />
                  <Label htmlFor="q28-f">F</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>29</strong> a description of a major collision that
                occurred in space
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q29-a" />
                  <Label htmlFor="q29-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q29-b" />
                  <Label htmlFor="q29-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q29-c" />
                  <Label htmlFor="q29-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q29-d" />
                  <Label htmlFor="q29-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q29-e" />
                  <Label htmlFor="q29-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q29-f" />
                  <Label htmlFor="q29-f">F</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>30</strong> a comparison between tracking objects in
                space and the efficiency of a transportation system
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q30-a" />
                  <Label htmlFor="q30-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q30-b" />
                  <Label htmlFor="q30-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q30-c" />
                  <Label htmlFor="q30-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q30-d" />
                  <Label htmlFor="q30-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q30-e" />
                  <Label htmlFor="q30-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q30-f" />
                  <Label htmlFor="q30-f">F</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>31</strong> a reference to efforts to classify space
                junk
              </p>
              <RadioGroup className="flex flex-row space-x-2">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q31-a" />
                  <Label htmlFor="q31-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q31-b" />
                  <Label htmlFor="q31-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q31-c" />
                  <Label htmlFor="q31-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q31-d" />
                  <Label htmlFor="q31-d">D</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="E" id="q31-e" />
                  <Label htmlFor="q31-e">E</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="q31-f" />
                  <Label htmlFor="q31-f">F</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 32-35</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 32-35 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">
              The Inter-Agency Space Debris Coordination Committee
            </h4>

            <p className="mb-4">
              The committee gives advice on how the <strong>32</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> of space
              can be achieved. The committee advises that when satellites are no
              longer active, any unused <strong>33</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> or
              pressurised material that could cause <strong>34</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> should be
              removed.
            </p>
            <p className="mb-4">
              Although operators of large satellite constellations accept that
              they have obligations as stewards of space, Holger Krag points out
              that the operators that become <strong>35</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> are
              unlikely to prioritise removing their satellites from space.
            </p>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 36-40</h3>
          <p className="mb-2">
            Look at the following statements (Questions 36-40) and the list of
            people below.
          </p>
          <p className="mb-2">
            Match each statement with the correct person, A, B, C or D.
          </p>
          <p className="mb-2">
            Write the correct letter, A, B, C or D, in boxes 36-40 on your
            answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="mb-4 border p-3">
            <h4 className="font-bold mb-2">List of People</h4>
            <p className="mb-1">
              <strong>A</strong> Carolin Frueh
            </p>
            <p className="mb-1">
              <strong>B</strong> Holger Krag
            </p>
            <p className="mb-1">
              <strong>C</strong> Marlon Sorge
            </p>
            <p className="mb-1">
              <strong>D</strong> Moriba Jah
            </p>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>36</strong> Knowing the exact location of space junk
                would help prevent any possible danger.
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q36-a" />
                  <Label htmlFor="q36-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q36-b" />
                  <Label htmlFor="q36-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q36-c" />
                  <Label htmlFor="q36-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q36-d" />
                  <Label htmlFor="q36-d">D</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>37</strong> Space should be available to everyone and
                should be preserved for the future.
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q37-a" />
                  <Label htmlFor="q37-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q37-b" />
                  <Label htmlFor="q37-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q37-c" />
                  <Label htmlFor="q37-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q37-d" />
                  <Label htmlFor="q37-d">D</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>38</strong> A recommendation regarding satellites is
                widely ignored.
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q38-a" />
                  <Label htmlFor="q38-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q38-b" />
                  <Label htmlFor="q38-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q38-c" />
                  <Label htmlFor="q38-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q38-d" />
                  <Label htmlFor="q38-d">D</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>39</strong> There is conflicting information about where
                some satellites are in space.
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q39-a" />
                  <Label htmlFor="q39-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q39-b" />
                  <Label htmlFor="q39-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q39-c" />
                  <Label htmlFor="q39-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q39-d" />
                  <Label htmlFor="q39-d">D</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>40</strong> There is a risk we will not be able to undo
                the damage that occurs in space.
              </p>
              <RadioGroup className="flex flex-row space-x-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="A" id="q40-a" />
                  <Label htmlFor="q40-a">A</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="B" id="q40-b" />
                  <Label htmlFor="q40-b">B</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="C" id="q40-c" />
                  <Label htmlFor="q40-c">C</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="D" id="q40-d" />
                  <Label htmlFor="q40-d">D</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
