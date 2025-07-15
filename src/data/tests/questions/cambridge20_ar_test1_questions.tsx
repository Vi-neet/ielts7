import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 20 Academic Reading Test 1
 */
export const Cambridge20ARTest1Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 1: Questions 1-13
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1-6</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>
          <p className="mb-4">In boxes 1–6 on your answer sheet, write</p>

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
                <strong>1.</strong> There are other parrots that share the
                kakapo's inability to fly.
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
                <strong>2.</strong> Adult kakapo produce chicks every year.
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
                <strong>3.</strong> Adult male kakapo bring food back to nesting
                females.
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
                <strong>4.</strong> The Polynesian rat was a greater threat to
                the kakapo than Polynesian settlers.
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
                <strong>5.</strong> Kakapo were transferred from Rakiura Island
                to other locations because they were at risk from feral cats.
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
                <strong>6.</strong> One Recovery Plan initiative that helped
                increase the kakapo population size was caring for struggling
                young birds.
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
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 7–13</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD AND/OR A NUMBER</strong> from the passage
            for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 7–13 on your answer sheet.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">New Zealand's kākāpō</h4>

            <p className="font-bold mb-2">A type of parrot:</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                diet consists of fern fronds, various parts of a tree and{" "}
                <strong>7.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                nests are created in <strong>8.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> where
                eggs are laid.
              </p>
            </div>

            <p className="font-bold mb-2">Arrival of Polynesian settlers</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                the <strong>9.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of the
                kākāpō were used to make clothes.
              </p>
            </div>

            <p className="font-bold mb-2">Arrival of European colonisers</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                <strong>10.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> were an
                animal which they introduced that ate the kākāpō's food sources.
              </p>
            </div>

            <p className="font-bold mb-2">Protecting kākāpō</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                Richard Henry, a conservationist, tried to protect the kākāpō.
              </p>
              <p className="mb-2">
                a definite sighting of female kākāpō on Rakiura Island was
                reported in the year <strong>11.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                the Recovery Plan included an increase in <strong>12.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                a current goal of the Recovery Plan is to maintain the
                involvement of <strong>13.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> in
                kākāpō protection.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 2: Questions 14-26
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 14–18</h3>
          <p className="mb-2">Reading Passage 2 has seven sections, A–G.</p>
          <p className="mb-4">
            Which section contains the following information?
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>14.</strong> reference to the research problems that
                arise from there being only a few surviving large elms
              </p>
              <RadioGroup name="question14" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
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

            <div className="question-item">
              <p className="mb-3">
                <strong>15.</strong> details of a difference of opinion about
                the value of reintroducing elms to Britain
              </p>
              <RadioGroup name="question15" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q15-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q15-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q15-${letter.toLowerCase()}`}
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
                <strong>16.</strong> reference to how Dutch elm disease was
                brought into Britain
              </p>
              <RadioGroup name="question16" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q16-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q16-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q16-${letter.toLowerCase()}`}
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
                <strong>17.</strong> a description of the conditions that have
                enabled a location in Britain to escape Dutch elm disease
              </p>
              <RadioGroup name="question17" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q17-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q17-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q17-${letter.toLowerCase()}`}
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
                <strong>18.</strong> reference to the stage at which young elms
                become vulnerable to Dutch elm disease
              </p>
              <RadioGroup name="question18" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q18-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q18-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q18-${letter.toLowerCase()}`}
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
          <h3 className="font-bold mb-2">Questions 19–23</h3>
          <p className="mb-2">
            Look at the following statements (Questions 19–23) and the list of
            people below.
          </p>
          <p className="mb-4">
            Match each statement with the correct person, A, B, or C.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of People</h4>
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> Matt Elliot
              </p>
              <p>
                <strong>B.</strong> Karen Russell
              </p>
              <p>
                <strong>C.</strong> Peter Bourne
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>19.</strong> If a tree gets infected with Dutch elm
                disease, the damage rapidly becomes visible.
              </p>
              <RadioGroup name="question19" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q19-a" value="A" />
                  <Label htmlFor="q19-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q19-b" value="B" />
                  <Label htmlFor="q19-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q19-c" value="C" />
                  <Label htmlFor="q19-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>20.</strong> It may be better to wait and see if the
                mature elms that have survived continue to flourish.
              </p>
              <RadioGroup name="question20" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q20-a" value="A" />
                  <Label htmlFor="q20-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q20-b" value="B" />
                  <Label htmlFor="q20-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q20-c" value="C" />
                  <Label htmlFor="q20-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>21.</strong> There must be an explanation for the
                survival of some mature elms.
              </p>
              <RadioGroup name="question21" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q21-a" value="A" />
                  <Label htmlFor="q21-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q21-b" value="B" />
                  <Label htmlFor="q21-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q21-c" value="C" />
                  <Label htmlFor="q21-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>22.</strong> We need to be aware that insects carrying
                Dutch elm disease are not very far away.
              </p>
              <RadioGroup name="question22" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q22-a" value="A" />
                  <Label htmlFor="q22-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q22-b" value="B" />
                  <Label htmlFor="q22-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q22-c" value="C" />
                  <Label htmlFor="q22-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>23.</strong> You understand the effect Dutch elm disease
                has had when you see evidence of how prominent the tree once
                was.
              </p>
              <RadioGroup name="question23" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q23-a" value="A" />
                  <Label htmlFor="q23-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q23-b" value="B" />
                  <Label htmlFor="q23-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q23-c" value="C" />
                  <Label htmlFor="q23-c" className="ml-2">
                    C
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 24–26</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">Uses of a popular tree</h4>
            <div className="question-item mb-4">
              <p className="mb-2">
                For hundreds of years, the only tree that was more popular in
                Britain than elm was <strong>24.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
                Starting in the Bronze Age, many tools were made from elm and
                people also used it to make weapons. In the 18th century, it was
                grown to provide wood for boxes and <strong>25.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />. Due to
                its strength, elm was often used for mining equipment and the
                Cutty Sark's <strong>26.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> was
                also constructed from elm.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 3: Questions 27-40
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–30</h3>
          <p className="mb-4">Choose the correct letter, A, B, C or D.</p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>27.</strong> In the first paragraph, the writer
                introduces the topic of the text by
              </p>
              <RadioGroup name="question27" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q27-a" value="A" />
                  <Label htmlFor="q27-a" className="ml-2">
                    A. defining some commonly used terms.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q27-b" value="B" />
                  <Label htmlFor="q27-b" className="ml-2">
                    B. questioning a widely held assumption.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q27-c" value="C" />
                  <Label htmlFor="q27-c" className="ml-2">
                    C. mentioning a challenge faced by everyone.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q27-d" value="D" />
                  <Label htmlFor="q27-d" className="ml-2">
                    D. specifying a situation which makes us most anxious.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>28.</strong> What point does the writer make about
                firefighters in the second paragraph?
              </p>
              <RadioGroup name="question28" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q28-a" value="A" />
                  <Label htmlFor="q28-a" className="ml-2">
                    A. The regular changes of stress levels in their working
                    lives make them ideal study subjects.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-b" value="B" />
                  <Label htmlFor="q28-b" className="ml-2">
                    B. The strategies they use to handle stress are of
                    particular interest to researchers.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-c" value="C" />
                  <Label htmlFor="q28-c" className="ml-2">
                    C. The stressful nature of their job is typical of many
                    public service professions.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q28-d" value="D" />
                  <Label htmlFor="q28-d" className="ml-2">
                    D. Their personalities make them especially well-suited to
                    working under stress.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29.</strong> What is the writer doing in the fourth
                paragraph?
              </p>
              <RadioGroup name="question29" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q29-a" value="A" />
                  <Label htmlFor="q29-a" className="ml-2">
                    A. explaining their findings
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-b" value="B" />
                  <Label htmlFor="q29-b" className="ml-2">
                    B. justifying their approach
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-c" value="C" />
                  <Label htmlFor="q29-c" className="ml-2">
                    C. setting out their objectives
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q29-d" value="D" />
                  <Label htmlFor="q29-d" className="ml-2">
                    D. describing their methodology
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30.</strong> In the seventh paragraph, the writer
                describes a mechanism in the brain which
              </p>
              <RadioGroup name="question30" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q30-a" value="A" />
                  <Label htmlFor="q30-a" className="ml-2">
                    A. enables people to respond more quickly to stressful
                    situations.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-b" value="B" />
                  <Label htmlFor="q30-b" className="ml-2">
                    B. results in increased ability to control our levels of
                    anxiety.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-c" value="C" />
                  <Label htmlFor="q30-c" className="ml-2">
                    C. produces heightened sensitivity to indications of
                    external threats.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q30-d" value="D" />
                  <Label htmlFor="q30-d" className="ml-2">
                    D. is activated when there is a need to communicate a sense
                    of danger.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 31–35</h3>
          <p className="mb-4">
            Complete each sentence with the correct ending, A–G, below.
          </p>

          <div className="mb-4">
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> made them feel optimistic.
              </p>
              <p>
                <strong>B.</strong> took relatively little notice of bad news.
              </p>
              <p>
                <strong>C.</strong> responded to negative and positive
                information in the same way.
              </p>
              <p>
                <strong>D.</strong> were feeling under stress.
              </p>
              <p>
                <strong>E.</strong> put them in a stressful situation.
              </p>
              <p>
                <strong>F.</strong> behaved in a similar manner, regardless of
                the circumstances.
              </p>
              <p>
                <strong>G.</strong> thought it more likely that they would
                experience something bad.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>31.</strong> At times when they were relaxed, the
                firefighters usually
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
                <strong>32.</strong> The researchers noted that when the
                firefighters were stressed, they
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
                <strong>33.</strong> When the firefighters were told good news,
                they always
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
                <strong>34.</strong> The students' cortisol levels and heart
                rates were affected when the researchers
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
                <strong>35.</strong> In both experiments, negative information
                was processed better when the subjects
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
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 36–40</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in
            Reading Passage 3?
          </p>
          <p className="mb-4">Write:</p>

          <div className="mb-4">
            <p className="mb-1">
              <strong>YES</strong> if the statement agrees with the claims of
              the writer
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
                <strong>36.</strong> The tone of the content we post on social
                media tends to reflect the nature of the posts in our feeds.
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
                <strong>37.</strong> Phones have a greater impact on our stress
                levels than other electronic media devices.
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
                <strong>38.</strong> The more we read about a stressful public
                event on social media, the less able we are to take the
                information in.
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
                <strong>39.</strong> Stress created by social media posts can
                lead us to take unnecessary precautions.
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
                <strong>40.</strong> Our tendency to be affected by other
                people's moods can be used in a positive way.
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
    </>
  );
};

export default Cambridge20ARTest1Questions;
