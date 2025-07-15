import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Component that displays the questions for Cambridge 20 Academic Reading Test 2
 */
export const Cambridge20ARTest2Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 1: Questions 1-13
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–6</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD AND/OR A NUMBER</strong> from the passage
            for each answer.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">Manatees</h4>

            <p className="font-bold mb-2">Appearance</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                look similar to dugongs, but with a differently shaped{" "}
                <strong>1.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
            </div>

            <p className="font-bold mb-2">Movement</p>
            <div className="question-item mb-4">
              <p className="mb-2">have fewer neck bones than most mammals</p>
              <p className="mb-2">
                need to use their <strong>2.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> to help
                to turn their bodies around in order to look sideways
              </p>
              <p className="mb-2">
                sense vibrations in the water by means of <strong>3.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> on
                their skin
              </p>
            </div>

            <p className="font-bold mb-2">Feeding</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                eat mainly aquatic vegetation, such as <strong>4.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                grasp and pull up plants with their <strong>5.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
            </div>

            <p className="font-bold mb-2">Breathing</p>
            <div className="question-item mb-4">
              <p className="mb-2">
                come to the surface for air every 2–4 minutes when awake and
                every 15–20 while sleeping
              </p>
              <p className="mb-2">
                may regulate the <strong>6.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of
                their bodies by using muscles of diaphragm to store air
                internally
              </p>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 7–13</h3>
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
                <strong>7.</strong> West Indian manatees can be found in a
                variety of different aquatic habitats.
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
                <strong>8.</strong> The Florida manatee lives in warmer waters
                than the Antillean manatee.
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
                <strong>9.</strong> The African manatee's range is limited to
                coastal waters between the West African countries of Mauritania
                and Angola.
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
                <strong>10.</strong> The extent of the loss of Amazonian
                manatees in the mid-twentieth century was only revealed many
                years later.
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
                <strong>11.</strong> It is predicted that West Indian manatee
                populations will fall in the coming decades.
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
                <strong>12.</strong> The risk to manatees from entanglement and
                plastic consumption increased significantly in the period
                2009–2020.
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
                <strong>13.</strong> There is some legislation in place which
                aims to reduce the likelihood of boat strikes on manatees in
                Florida.
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
          <h3 className="font-bold mb-2">Questions 14–16</h3>
          <p className="mb-2">Reading Passage 2 has six sections, A–F.</p>
          <p className="mb-4">
            Which section contains the following information?
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>14.</strong> mention of false assumptions about why
                people procrastinate
              </p>
              <RadioGroup name="question14" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>15.</strong> reference to the realisation that others
                also procrastinate
              </p>
              <RadioGroup name="question15" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
                <strong>16.</strong> neurological evidence of a link between
                procrastination and emotion
              </p>
              <RadioGroup name="question16" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 17–22</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">What makes us procrastinate?</h4>
            <div className="question-item mb-4">
              <p className="mb-2">
                Many people think that procrastination is the result of{" "}
                <strong>17.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
              <p className="mb-2">
                Others believe it to be the result of an inability to organise
                time efficiently.
              </p>
              <p className="mb-2">
                But scientific studies suggest that procrastination is actually
                due to poor mood management. The tasks we are most likely to put
                off are those that could damage our self-esteem or cause us to
                feel <strong>18.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> when we
                think about them. Research comparing chronic procrastinators
                with other people even found differences in the brain regions
                associated with regulating emotions and identifying{" "}
                <strong>19.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
              <p className="mb-2">
                Emotionally loaded and difficult tasks often cause us to
                procrastinate. Getting ready to take <strong>20.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> might
                be a typical example of one such task.
              </p>
              <p className="mb-2">
                People who are likely to procrastinate tend to be either{" "}
                <strong>21.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> or
                those with low self-esteem.
              </p>
              <p className="mb-2">
                Procrastination is only a short-term measure for managing
                emotions. It's often followed by a feeling of{" "}
                <strong>22.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />, which
                worsens our mood and leads to more procrastination.
              </p>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 23 and 24</h3>
          <p className="mb-4">
            Choose <strong>TWO</strong> letters, A–E.
          </p>
          <p className="mb-4">
            <strong>23 – 24</strong> Which TWO comparisons between employees who
            often procrastinate and those who do not are mentioned in the text?
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox id="q23-24-a" value="A" />
              <Label htmlFor="q23-24-a" className="ml-2">
                A Their salaries are lower.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q23-24-b" value="B" />
              <Label htmlFor="q23-24-b" className="ml-2">
                B The quality of their work is inferior.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q23-24-c" value="C" />
              <Label htmlFor="q23-24-c" className="ml-2">
                C They don't keep their jobs for as long.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q23-24-d" value="D" />
              <Label htmlFor="q23-24-d" className="ml-2">
                D They don't enjoy their working lives as much.
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q23-24-e" value="E" />
              <Label htmlFor="q23-24-e" className="ml-2">
                E They have poorer relationships with colleagues.
              </Label>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 25 and 26</h3>
          <p className="mb-4">
            Choose <strong>TWO</strong> letters, A–E.
          </p>
          <p className="mb-4">
            <strong>25 – 26</strong> Which TWO recommendations for getting out
            of a cycle of procrastination does the writer give?
          </p>

          <div className="space-y-3">
            <div className="flex items-center">
              <Checkbox id="q25-26-a" value="A" />
              <Label htmlFor="q25-26-a" className="ml-2">
                A not judging ourselves harshly
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q25-26-b" value="B" />
              <Label htmlFor="q25-26-b" className="ml-2">
                B setting ourselves manageable aims
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q25-26-c" value="C" />
              <Label htmlFor="q25-26-c" className="ml-2">
                C rewarding ourselves for tasks achieved
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q25-26-d" value="D" />
              <Label htmlFor="q25-26-d" className="ml-2">
                D prioritising tasks according to their importance
              </Label>
            </div>
            <div className="flex items-center">
              <Checkbox id="q25-26-e" value="E" />
              <Label htmlFor="q25-26-e" className="ml-2">
                E avoiding things that stop us concentrating on our tasks
              </Label>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 3: Questions 27-40
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–32</h3>
          <p className="mb-2">
            Do the following statements agree with the claims of the writer in
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
                <strong>27.</strong> When DeJesus first used ABS, he shared
                decision-making about strikes with it.
              </p>
              <RadioGroup name="question27" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q27-yes" value="YES" />
                  <Label htmlFor="q27-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q27-no" value="NO" />
                  <Label htmlFor="q27-no" className="ml-2">
                    NO
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
                <strong>28.</strong> MLB considered it necessary to amend the
                size of the strike zone when criticisms were received from
                players.
              </p>
              <RadioGroup name="question28" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q28-yes" value="YES" />
                  <Label htmlFor="q28-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-no" value="NO" />
                  <Label htmlFor="q28-no" className="ml-2">
                    NO
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
                <strong>29.</strong> MLB is keen to justify the money spent on
                improving the accuracy of ABS's calculations.
              </p>
              <RadioGroup name="question29" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q29-yes" value="YES" />
                  <Label htmlFor="q29-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-no" value="NO" />
                  <Label htmlFor="q29-no" className="ml-2">
                    NO
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
                <strong>30.</strong> The hundred-mile-an-hour fastball led to a
                more exciting style of play.
              </p>
              <RadioGroup name="question30" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q30-yes" value="YES" />
                  <Label htmlFor="q30-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-no" value="NO" />
                  <Label htmlFor="q30-no" className="ml-2">
                    NO
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
                <strong>31.</strong> The differing proposals for alterations to
                the baseball bat led to fierce debate on Sword's team.
              </p>
              <RadioGroup name="question31" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q31-yes" value="YES" />
                  <Label htmlFor="q31-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-no" value="NO" />
                  <Label htmlFor="q31-no" className="ml-2">
                    NO
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
                <strong>32.</strong> ABS makes changes to the shape of the
                strike zone feasible.
              </p>
              <RadioGroup name="question32" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q32-yes" value="YES" />
                  <Label htmlFor="q32-yes" className="ml-2">
                    YES
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q32-no" value="NO" />
                  <Label htmlFor="q32-no" className="ml-2">
                    NO
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

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 33–37</h3>
          <p className="mb-4">
            Complete the summary using the list of phrases, <strong>A–H</strong>
            , below.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of phrases:</h4>
            <div className="grid grid-cols-2 gap-2">
              <p>
                <strong>A.</strong> pitch boundary
              </p>
              <p>
                <strong>E.</strong> widespread approval
              </p>
              <p>
                <strong>B.</strong> numerous disputes
              </p>
              <p>
                <strong>F.</strong> former roles
              </p>
              <p>
                <strong>C.</strong> team tactics
              </p>
              <p>
                <strong>G.</strong> total silence
              </p>
              <p>
                <strong>D.</strong> subjective assessment
              </p>
              <p>
                <strong>H.</strong> perceived area
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold mb-2">Calls by the umpire</h4>
            <div className="question-item mb-4">
              <p className="mb-2">
                Even after ABS was developed, MLB still wanted human umpires to
                shout out decisions as they had in their <strong>33.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />. The
                umpire's job had, at one time, required a <strong>34.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> about
                whether a ball was a strike. A ball is considered a strike when
                the batter does not hit it and it crosses through a{" "}
                <strong>35.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                extending approximately from the batter's knee to his chest.
              </p>
              <p className="mb-2">
                In the past, <strong>36.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> over
                strike calls were not uncommon, but today everyone accepts the
                complete ban on pushing or shoving the umpire. One difference,
                however, is that during the first game DeJesus used ABS, strike
                calls were met with <strong>37.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 38–40</h3>
          <p className="mb-4">Choose the correct letter, A, B, C or D.</p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>38.</strong> What does the writer suggest about ABS in
                the fifth paragraph?
              </p>
              <RadioGroup name="question38" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q38-a" value="A" />
                  <Label htmlFor="q38-a" className="ml-2">
                    A. It is bound to make key decisions that are wrong.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-b" value="B" />
                  <Label htmlFor="q38-b" className="ml-2">
                    B. It may reduce some of the appeal of the game.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-c" value="C" />
                  <Label htmlFor="q38-c" className="ml-2">
                    C. It will lead to the disappearance of human umpires.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q38-d" value="D" />
                  <Label htmlFor="q38-d" className="ml-2">
                    D. It may increase calls for the rules of baseball to be
                    changed.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39.</strong> Morgan Sword says that the introduction of
                ABS
              </p>
              <RadioGroup name="question39" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q39-a" value="A" />
                  <Label htmlFor="q39-a" className="ml-2">
                    A. was regarded as an experiment without a guaranteed
                    outcome.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-b" value="B" />
                  <Label htmlFor="q39-b" className="ml-2">
                    B. was intended to keep up with developments in other
                    sports.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-c" value="C" />
                  <Label htmlFor="q39-c" className="ml-2">
                    C. was a response to changing attitudes about the role of
                    sport.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q39-d" value="D" />
                  <Label htmlFor="q39-d" className="ml-2">
                    D. was an attempt to ensure baseball retained a young
                    audience.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40.</strong> Why does the writer include the views of
                Noë and Russo?
              </p>
              <RadioGroup name="question40" className="flex-col gap-3">
                <div className="flex items-start">
                  <RadioGroupItem id="q40-a" value="A" />
                  <Label htmlFor="q40-a" className="ml-2">
                    A. to show that attitudes to technology vary widely
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-b" value="B" />
                  <Label htmlFor="q40-b" className="ml-2">
                    B. to argue that people have unrealistic expectations of
                    sport
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-c" value="C" />
                  <Label htmlFor="q40-c" className="ml-2">
                    C. to indicate that accuracy is not the same thing as
                    enjoyment
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q40-d" value="D" />
                  <Label htmlFor="q40-d" className="ml-2">
                    D. to suggest that the number of baseball fans needs to
                    increase
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

export default Cambridge20ARTest2Questions;
