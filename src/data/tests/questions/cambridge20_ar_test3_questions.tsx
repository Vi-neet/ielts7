import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Component that displays the questions for Cambridge 20 Academic Reading Test 3
 */
export const Cambridge20ARTest3Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 1: Questions 1-13
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–7</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">The history of frozen food</h4>

            <p className="font-bold mb-2">2,000 years ago, South America</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · People conserved the nutritional value of <strong>1.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />, using
                a method of freezing then drying.
              </p>
            </div>

            <p className="font-bold mb-2">1851, USA</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · <strong>2.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> was
                kept cool by ice during transportation in specially adapted
                trains.
              </p>
            </div>

            <p className="font-bold mb-2">1880, Australia</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · Two kinds of <strong>3.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> were
                the first frozen food shipped to England.
              </p>
            </div>

            <p className="font-bold mb-2">1917 onwards, USA</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · Clarence Birdseye introduced innovations including:
              </p>
              <p className="mb-2">
                quick-freezing methods, so that <strong>4.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> did not
                spoil the food.
              </p>
              <p className="mb-2">
                packaging products with <strong>5.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />, so the
                product was visible.
              </p>
            </div>

            <p className="font-bold mb-2">Early 1940s, USA</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · Frozen food became popular because of a shortage of{" "}
                <strong>6.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <p className="font-bold mb-2">1950s, USA</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                · A large number of homes now had a <strong>7.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8–13</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>

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
                <strong>8.</strong> The ice transportation business made some
                Boston ship owners very wealthy in the early 1800s.
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
                <strong>9.</strong> A disadvantage of the freezing process
                invented in Australia was that it affected the taste of food.
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
                <strong>10.</strong> Clarence Birdseye travelled to Labrador in
                order to learn how the Inuit people froze fish.
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
                <strong>11.</strong> Swanson Foods invested a great deal of
                money in the promotion of the TV Dinner.
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
                <strong>12.</strong> Swanson Foods developed a new style of
                container for the launch of the TV Dinner.
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
                <strong>13.</strong> The US frozen food industry is currently
                the largest in the world.
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
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 2: Questions 14-26
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 14–19</h3>
          <p className="mb-4">
            Choose the correct heading for each section from the list of
            headings below.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of Headings:</h4>
            <div className="grid grid-cols-1 gap-1">
              <p>
                <strong>i.</strong> Tried and tested solutions
              </p>
              <p>
                <strong>ii.</strong> Cooperation beneath the waves
              </p>
              <p>
                <strong>iii.</strong> Working to lessen the problems
              </p>
              <p>
                <strong>iv.</strong> Disagreement about the accuracy of a
                certain phrase
              </p>
              <p>
                <strong>v.</strong> Two clear educational goals
              </p>
              <p>
                <strong>vi.</strong> Promoting hope
              </p>
              <p>
                <strong>vii.</strong> A warning of further trouble ahead
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>14.</strong> Paragraph A ______
              </p>
              <RadioGroup name="question14" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q14-${option}`}>
                    <RadioGroupItem id={`q14-${option}`} value={option} />
                    <Label htmlFor={`q14-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>15.</strong> Paragraph B ______
              </p>
              <RadioGroup name="question15" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q15-${option}`}>
                    <RadioGroupItem id={`q15-${option}`} value={option} />
                    <Label htmlFor={`q15-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>16.</strong> Paragraph C ______
              </p>
              <RadioGroup name="question16" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q16-${option}`}>
                    <RadioGroupItem id={`q16-${option}`} value={option} />
                    <Label htmlFor={`q16-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>17.</strong> Paragraph D ______
              </p>
              <RadioGroup name="question17" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q17-${option}`}>
                    <RadioGroupItem id={`q17-${option}`} value={option} />
                    <Label htmlFor={`q17-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>18.</strong> Paragraph E ______
              </p>
              <RadioGroup name="question18" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q18-${option}`}>
                    <RadioGroupItem id={`q18-${option}`} value={option} />
                    <Label htmlFor={`q18-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>19.</strong> Paragraph F ______
              </p>
              <RadioGroup name="question19" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii"].map((option) => (
                  <div className="flex items-center" key={`q19-${option}`}>
                    <RadioGroupItem id={`q19-${option}`} value={option} />
                    <Label htmlFor={`q19-${option}`} className="ml-2">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 20 and 21</h3>
          <p className="mb-4">
            Choose <strong>TWO</strong> letters, A–E.
          </p>
          <p className="mb-4">
            Which TWO of these causes of damage to coral reefs are mentioned by
            the writer of the text?
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox id="q20-21-a" value="A" />
              <Label htmlFor="q20-21-a" className="ml-2">
                A a rising number of extreme storms
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q20-21-b" value="B" />
              <Label htmlFor="q20-21-b" className="ml-2">
                B the removal of too many fish from the sea
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q20-21-c" value="C" />
              <Label htmlFor="q20-21-c" className="ml-2">
                C the contamination of the sea from waste
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q20-21-d" value="D" />
              <Label htmlFor="q20-21-d" className="ml-2">
                D increased disease among marine species
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q20-21-e" value="E" />
              <Label htmlFor="q20-21-e" className="ml-2">
                E alterations in the usual flow of water in the seas
              </Label>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 22 and 23</h3>
          <p className="mb-4">
            Choose <strong>TWO</strong> letters, A–E.
          </p>
          <p className="mb-4">
            Which TWO of the following statements are true of the researchers at
            London Zoo?
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox id="q22-23-a" value="A" />
              <Label htmlFor="q22-23-a" className="ml-2">
                A They are hoping to expand the numbers of different corals
                being bred in laboratories.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q22-23-b" value="B" />
              <Label htmlFor="q22-23-b" className="ml-2">
                B They want to identify corals that can cope well with the
                changed sea conditions.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q22-23-c" value="C" />
              <Label htmlFor="q22-23-c" className="ml-2">
                C They are looking at ways of creating artificial reefs that
                corals could grow on.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q22-23-d" value="D" />
              <Label htmlFor="q22-23-d" className="ml-2">
                D They are trying out methods that would speed up reproduction
                in some corals.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q22-23-e" value="E" />
              <Label htmlFor="q22-23-e" className="ml-2">
                E They are investigating materials that might protect reefs from
                higher temperatures.
              </Label>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 24-26</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>24.</strong> Corals have a number of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> which
                they use to collect their food.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>25.</strong> Algae gain{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> from
                being inside the coral.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>26.</strong> Increases in the warmth of the sea water
                can remove the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> from
                coral.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 3: Questions 27-40
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–33</h3>
          <p className="mb-2">
            Match each statement with the correct expert, A, B or C.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of Experts</h4>
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> Martin Rees
              </p>
              <p>
                <strong>B.</strong> Daniel Wolpert
              </p>
              <p>
                <strong>C.</strong> Kathleen Richardson
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>27.</strong> For our own safety, humans will need to
                restrict the abilities of robots.
              </p>
              <RadioGroup name="question27" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q27-a" value="A" />
                  <Label htmlFor="q27-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q27-b" value="B" />
                  <Label htmlFor="q27-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q27-c" value="C" />
                  <Label htmlFor="q27-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>28.</strong> The risk of robots harming us is less
                serious than humans believe it to be.
              </p>
              <RadioGroup name="question28" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q28-a" value="A" />
                  <Label htmlFor="q28-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-b" value="B" />
                  <Label htmlFor="q28-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-c" value="C" />
                  <Label htmlFor="q28-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29.</strong> It will take many decades for robot
                intelligence to be as imaginative as human intelligence.
              </p>
              <RadioGroup name="question29" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q29-a" value="A" />
                  <Label htmlFor="q29-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-b" value="B" />
                  <Label htmlFor="q29-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-c" value="C" />
                  <Label htmlFor="q29-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30.</strong> We may have to start considering whether we
                are treating robots fairly.
              </p>
              <RadioGroup name="question30" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q30-a" value="A" />
                  <Label htmlFor="q30-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-b" value="B" />
                  <Label htmlFor="q30-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-c" value="C" />
                  <Label htmlFor="q30-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31.</strong> Robots are probably of more help to us on
                Earth than in space.
              </p>
              <RadioGroup name="question31" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q31-a" value="A" />
                  <Label htmlFor="q31-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-b" value="B" />
                  <Label htmlFor="q31-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-c" value="C" />
                  <Label htmlFor="q31-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>32.</strong> The ideas in high-quality science fiction
                may prove to be just as accurate as those found in the work of
                mediocre scientists.
              </p>
              <RadioGroup name="question32" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q32-a" value="A" />
                  <Label htmlFor="q32-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q32-b" value="B" />
                  <Label htmlFor="q32-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q32-c" value="C" />
                  <Label htmlFor="q32-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33.</strong> There are those who look forward to robots
                developing greater intelligence.
              </p>
              <RadioGroup name="question33" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q33-a" value="A" />
                  <Label htmlFor="q33-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q33-b" value="B" />
                  <Label htmlFor="q33-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q33-c" value="C" />
                  <Label htmlFor="q33-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 34-36</h3>
          <p className="mb-4">
            Complete each sentence with the correct ending, <strong>A–D</strong>
            , below.
          </p>

          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> robots to explore outer space.
              </p>
              <p>
                <strong>B.</strong> advances made in machine intelligence so
                far.
              </p>
              <p>
                <strong>C.</strong> changes made to other planets for our own
                benefit.
              </p>
              <p>
                <strong>D.</strong> the harm already done by artificial
                intelligence.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>34.</strong> Richardson and Rees express similar views
                regarding the ethical aspect of
              </p>
              <RadioGroup name="question34" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q34-a" value="A" />
                  <Label htmlFor="q34-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q34-b" value="B" />
                  <Label htmlFor="q34-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q34-c" value="C" />
                  <Label htmlFor="q34-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q34-d" value="D" />
                  <Label htmlFor="q34-d" className="ml-2">
                    D
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>35.</strong> Rees and Wolpert share an opinion about the
                extent of
              </p>
              <RadioGroup name="question35" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q35-a" value="A" />
                  <Label htmlFor="q35-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q35-b" value="B" />
                  <Label htmlFor="q35-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q35-c" value="C" />
                  <Label htmlFor="q35-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q35-d" value="D" />
                  <Label htmlFor="q35-d" className="ml-2">
                    D
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>36.</strong> Wolpert disagrees with Richardson on the
                question of
              </p>
              <RadioGroup name="question36" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q36-a" value="A" />
                  <Label htmlFor="q36-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q36-b" value="B" />
                  <Label htmlFor="q36-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q36-c" value="C" />
                  <Label htmlFor="q36-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q36-d" value="D" />
                  <Label htmlFor="q36-d" className="ml-2">
                    D
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 37–40</h3>
          <p className="mb-4">Choose the correct letter, A, B, C or D.</p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>37.</strong> What point does Richardson make about fear
                of machines?
              </p>
              <RadioGroup name="question37" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q37-a" value="A" />
                  <Label htmlFor="q37-a" className="ml-2">
                    A. It has grown alongside the development of ever more
                    advanced robots.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-b" value="B" />
                  <Label htmlFor="q37-b" className="ml-2">
                    B. It is the result of our inclination to attribute human
                    characteristics to non-human entities.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-c" value="C" />
                  <Label htmlFor="q37-c" className="ml-2">
                    C. It has its origins in basic misunderstandings about how
                    inanimate objects function.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q37-d" value="D" />
                  <Label htmlFor="q37-d" className="ml-2">
                    D. It demonstrates a key difference between human
                    intelligence and machine intelligence.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>38.</strong> What potential advance does Rees see as a
                cause for concern?
              </p>
              <RadioGroup name="question38" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q38-a" value="A" />
                  <Label htmlFor="q38-a" className="ml-2">
                    A. robots outnumbering people
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-b" value="B" />
                  <Label htmlFor="q38-b" className="ml-2">
                    B. robots having abilities which humans do not
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-c" value="C" />
                  <Label htmlFor="q38-c" className="ml-2">
                    C. artificial intelligence developing independent thought
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-d" value="D" />
                  <Label htmlFor="q38-d" className="ml-2">
                    D. artificial intelligence taking over every aspect of our
                    lives
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39.</strong> What does Wolpert emphasize in his response
                to the question about science fiction?
              </p>
              <RadioGroup name="question39" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q39-a" value="A" />
                  <Label htmlFor="q39-a" className="ml-2">
                    A. how science fiction influences our attitudes to robots
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-b" value="B" />
                  <Label htmlFor="q39-b" className="ml-2">
                    B. how fundamental robots are to the science fiction genre
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-c" value="C" />
                  <Label htmlFor="q39-c" className="ml-2">
                    C. how the image of robots in science fiction has changed
                    over time
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-d" value="D" />
                  <Label htmlFor="q39-d" className="ml-2">
                    D. how reactions to similar portrayals of robots in science
                    fiction may vary
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40.</strong> What is Richardson doing in her comment
                about reality and fantasy?
              </p>
              <RadioGroup name="question40" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q40-a" value="A" />
                  <Label htmlFor="q40-a" className="ml-2">
                    A. warning people not to confuse one with the other
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-b" value="B" />
                  <Label htmlFor="q40-b" className="ml-2">
                    B. outlining ways in which one has impacted on the other
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-c" value="C" />
                  <Label htmlFor="q40-c" className="ml-2">
                    C. recommending a change of approach in how people view them
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-d" value="D" />
                  <Label htmlFor="q40-d" className="ml-2">
                    D. explaining why scientists have a different perspective on
                    them from other people
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

export default Cambridge20ARTest3Questions;
