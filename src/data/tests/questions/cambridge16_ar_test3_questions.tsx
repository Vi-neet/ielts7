// Cambridge 16 Academic Reading Test 3 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Component that displays the questions for Cambridge 16 Academic Reading Test 3
 */
export const Cambridge16ARTest3Questions: React.FC = () => {
  return (
    <div className="reading-questions p-4 bg-white">
      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 1: Questions 1-13
      </h2>

      {/* Questions 1-5 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 1-5</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in
          Reading Passage 1?
        </p>
        <p className="mb-2">In boxes 1-5 on your answer sheet, write</p>
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
              <strong>1.</strong> The Romans' shipbuilding skills were passed on
              to the Greeks and the Egyptians.
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
              <strong>2.</strong> Skilled craftsmen were needed for the mortise
              and tenon method of fixing planks.
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
              <strong>3.</strong> The later practice used by Mediterranean
              shipbuilders involved building the hull before the frame.
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
              <strong>4.</strong> The Romans called the Mediterranean Sea Mare
              Nostrum because they dominated its use.
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
              <strong>5.</strong> Most rowers on ships were people from the
              Roman army.
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
        </div>
      </div>

      {/* Questions 6-13 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 6-13</h3>
        <p className="mb-2">Complete the summary below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each
          answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 6-13 on your answer sheet.
        </p>

        <div className="summary-box border border-gray-300 p-4 mb-4">
          <h4 className="font-bold mb-4">Warships and merchant ships</h4>

          <p className="mb-4">
            Warships were designed so that they were <strong>6</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> and moved
            quickly. They often remained afloat after battles and were able to
            sail close to land as they lacked any additional weight. A battering
            ram made of <strong>7</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> was
            included in the design for attacking and damaging the timber and
            oars of enemy ships. Warships, such as the 'trireme', had rowers on
            three different <strong>8</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />. Unlike
            warships, merchant ships had a broad <strong>9</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> that lay
            far below the surface of the sea. Merchant ships were steered
            through the water with the help of large rudders and a tiller bar.
            They had both square and <strong>10</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> sails. On
            merchant ships and warships, <strong>11</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> was used to
            ensure rowers moved their oars in and out of the water at the same
            time. Quantities of agricultural goods such as <strong>12</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> were
            transported by merchant ships to two main ports in Italy. The ships
            were pulled to the shore by <strong>13</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />. When the
            weather was clear and they could see islands or land, sailors used
            landmarks that they knew to help them navigate their route.
          </p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 2: Questions 14-26
      </h2>

      {/* Questions 14-19 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 14-19</h3>
        <p className="mb-2">Reading Passage 2 has eight sections, A-H.</p>
        <p className="mb-2">
          Which section contains the following information?
        </p>
        <p className="mb-4">
          Write the correct letter, A-H, in boxes 14-19 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>14.</strong> an explanation for weapons being left behind
              in the mountains
            </p>
            <RadioGroup name="question14" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q14-${letter}`} value={letter} />
                  <Label htmlFor={`q14-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>15.</strong> a reference to the physical difficulties
              involved in an archaeological expedition
            </p>
            <RadioGroup name="question15" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q15-${letter}`} value={letter} />
                  <Label htmlFor={`q15-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>16.</strong> an explanation of why less food may have been
              available
            </p>
            <RadioGroup name="question16" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q16-${letter}`} value={letter} />
                  <Label htmlFor={`q16-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>17.</strong> a reference to the possibility of future
              archaeological discoveries
            </p>
            <RadioGroup name="question17" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q17-${letter}`} value={letter} />
                  <Label htmlFor={`q17-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>18.</strong> examples of items that would have been traded
            </p>
            <RadioGroup name="question18" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q18-${letter}`} value={letter} />
                  <Label htmlFor={`q18-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>19.</strong> a reference to the pressure archaeologists
              are under to work quickly
            </p>
            <RadioGroup name="question19" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q19-${letter}`} value={letter} />
                  <Label htmlFor={`q19-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 20-22 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 20-22</h3>
        <p className="mb-2">Complete the summary below.</p>
        <p className="mb-2">
          Choose <strong>ONE WORD ONLY</strong> from the passage for each
          answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 20-22 on your answer sheet.
        </p>

        <div className="summary-box border border-gray-300 p-4 mb-4">
          <h4 className="font-bold mb-4">
            Interesting finds at an archaeological site
          </h4>

          <p className="mb-4">
            Organic materials such as animal skins and textiles are not
            discovered very often at archaeological sites. They have little
            protection against <strong>20</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" />, which
            means that they decay relatively quickly. But this is not always the
            case. If temperatures are low enough, fragile artefacts can be
            preserved for thousands of years. A team of archaeologists have been
            working in the mountains in Oppland in Norway to recover artefacts
            revealed by shrinking ice cover. In the past, there were trade
            routes through these mountains and <strong>21</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> gathered
            there in the summer months to avoid being attacked by{" "}
            <strong>22</strong>{" "}
            <Input type="text" className="w-32 mx-1 inline-block" /> on lower
            ground. The people who used these mountains left things behind and
            it is those objects that are of interest to archaeologists.
          </p>
        </div>
      </div>

      {/* Questions 23-24 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 23 and 24</h3>
        <p className="mb-2">Choose TWO letters, A-E.</p>
        <p className="mb-4">
          Write the correct letters in boxes 23 and 24 on your answer sheet.
        </p>
        <p className="mb-4 font-bold">
          Which TWO of the following statements does the writer make about the
          discoveries of Barrett's team?
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="q23-24-a" />
            <Label htmlFor="q23-24-a">
              <strong>A.</strong> Artefacts found in the higher mountain passes
              were limited to skiing equipment.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q23-24-b" />
            <Label htmlFor="q23-24-b">
              <strong>B.</strong> Hunters went into the mountains even during
              periods of extreme cold.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q23-24-c" />
            <Label htmlFor="q23-24-c">
              <strong>C.</strong> The number of artefacts from certain time
              periods was relatively low.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q23-24-d" />
            <Label htmlFor="q23-24-d">
              <strong>D.</strong> Radiocarbon dating of artefacts produced some
              unreliable results.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q23-24-e" />
            <Label htmlFor="q23-24-e">
              <strong>E.</strong> More artefacts were found in Oppland than at
              any other mountain site.
            </Label>
          </div>
        </div>
      </div>

      {/* Questions 25-26 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 25 and 26</h3>
        <p className="mb-2">Choose TWO letters, A-E.</p>
        <p className="mb-4">
          Write the correct letters in boxes 25 and 26 on your answer sheet.
        </p>
        <p className="mb-4 font-bold">
          Which TWO of the following statements does the writer make about the
          Viking Age?
        </p>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="q25-26-a" />
            <Label htmlFor="q25-26-a">
              <strong>A.</strong> Hunters at this time benefited from an
              increased demand for goods.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q25-26-b" />
            <Label htmlFor="q25-26-b">
              <strong>B.</strong> The beginning of the period saw the greatest
              growth in the wealth of Vikings.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q25-26-c" />
            <Label htmlFor="q25-26-c">
              <strong>C.</strong> Vikings did not rely on ships alone to
              transport goods.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q25-26-d" />
            <Label htmlFor="q25-26-d">
              <strong>D.</strong> Norwegian towns at this time attracted traders
              from around the world.
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="q25-26-e" />
            <Label htmlFor="q25-26-e">
              <strong>E.</strong> Vikings were primarily interested in their
              trading links with the Middle East.
            </Label>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">
        READING PASSAGE 3: Questions 27-40
      </h2>

      {/* Questions 27-32 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 27-32</h3>
        <p className="mb-2">
          Do the following statements agree with the information given in
          Reading Passage 3?
        </p>
        <p className="mb-2">In boxes 27-32 on your answer sheet, write</p>
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
              <strong>27.</strong> The Cambridge scientists' discovery of the
              'thermometer molecule' caused surprise among other scientists.
            </p>
            <RadioGroup name="question27" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q27-true" value="TRUE" />
                <Label htmlFor="q27-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-false" value="FALSE" />
                <Label htmlFor="q27-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q27-ng" value="NOT GIVEN" />
                <Label htmlFor="q27-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>28.</strong> The target for agricultural production by
              2050 could be missed.
            </p>
            <RadioGroup name="question28" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q28-true" value="TRUE" />
                <Label htmlFor="q28-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-false" value="FALSE" />
                <Label htmlFor="q28-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q28-ng" value="NOT GIVEN" />
                <Label htmlFor="q28-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>29.</strong> Wheat and rice suffer from a rise in
              temperatures.
            </p>
            <RadioGroup name="question29" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q29-true" value="TRUE" />
                <Label htmlFor="q29-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-false" value="FALSE" />
                <Label htmlFor="q29-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q29-ng" value="NOT GIVEN" />
                <Label htmlFor="q29-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>30.</strong> It may be possible to develop crops that
              require less water.
            </p>
            <RadioGroup name="question30" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q30-true" value="TRUE" />
                <Label htmlFor="q30-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-false" value="FALSE" />
                <Label htmlFor="q30-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q30-ng" value="NOT GIVEN" />
                <Label htmlFor="q30-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>31.</strong> Plants grow faster in sunlight than in shade.
            </p>
            <RadioGroup name="question31" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q31-true" value="TRUE" />
                <Label htmlFor="q31-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-false" value="FALSE" />
                <Label htmlFor="q31-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q31-ng" value="NOT GIVEN" />
                <Label htmlFor="q31-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>32.</strong> Phytochromes change their state at the same
              speed day and night.
            </p>
            <RadioGroup name="question32" className="flex gap-8">
              <div className="flex items-center">
                <RadioGroupItem id="q32-true" value="TRUE" />
                <Label htmlFor="q32-true" className="ml-2">
                  TRUE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-false" value="FALSE" />
                <Label htmlFor="q32-false" className="ml-2">
                  FALSE
                </Label>
              </div>
              <div className="flex items-center">
                <RadioGroupItem id="q32-ng" value="NOT GIVEN" />
                <Label htmlFor="q32-ng" className="ml-2">
                  NOT GIVEN
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 33-37 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 33-37</h3>
        <p className="mb-2">Reading Passage 3 has eight sections, A-H.</p>
        <p className="mb-2">
          Which section contains the following information?
        </p>
        <p className="mb-4">
          Write the correct letter, A-H, in boxes 33-37 on your answer sheet.
        </p>

        <div className="space-y-6">
          <div className="question-item">
            <p className="mb-3">
              <strong>33.</strong> mention of specialists who can make use of
              the research findings
            </p>
            <RadioGroup name="question33" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q33-${letter}`} value={letter} />
                  <Label htmlFor={`q33-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>34.</strong> a reference to a potential benefit of the
              research findings
            </p>
            <RadioGroup name="question34" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q34-${letter}`} value={letter} />
                  <Label htmlFor={`q34-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>35.</strong> scientific support for a traditional saying
            </p>
            <RadioGroup name="question35" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q35-${letter}`} value={letter} />
                  <Label htmlFor={`q35-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>36.</strong> a reference to people traditionally making
              plans based on plant behaviour
            </p>
            <RadioGroup name="question36" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q36-${letter}`} value={letter} />
                  <Label htmlFor={`q36-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>37.</strong> a reference to where the research has been
              reported
            </p>
            <RadioGroup name="question37" className="flex gap-4">
              {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
                <div key={letter} className="flex items-center">
                  <RadioGroupItem id={`q37-${letter}`} value={letter} />
                  <Label htmlFor={`q37-${letter}`} className="ml-2">
                    {letter}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Questions 38-40 */}
      <div className="question-set mb-8">
        <h3 className="font-bold mb-2">Questions 38-40</h3>
        <p className="mb-2">Complete the sentences below.</p>
        <p className="mb-2">
          Choose <strong>NO MORE THAN TWO WORDS</strong> from the passage for
          each answer.
        </p>
        <p className="mb-4">
          Write your answers in boxes 38-40 on your answer sheet.
        </p>

        <div className="space-y-4">
          <div className="question-item">
            <p className="mb-3">
              <strong>38.</strong> Daffodils are likely to flower early in
              response to{" "}
              <Input type="text" className="w-40 mx-1 inline-block" /> weather.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>39.</strong> If ash trees come into leaf before oak trees,
              the weather in{" "}
              <Input type="text" className="w-40 mx-1 inline-block" /> will
              probably be wet.
            </p>
          </div>

          <div className="question-item">
            <p className="mb-3">
              <strong>40.</strong> The research was carried out using a
              particular species of{" "}
              <Input type="text" className="w-40 mx-1 inline-block" />.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cambridge16ARTest3Questions;