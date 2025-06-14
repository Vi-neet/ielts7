import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

/**
 * Component that displays the questions for Cambridge 19 Academic Reading Test 1
 */
export const Cambridge19ARTest1Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 1: Questions 1-13
        </h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1-7</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in
            Reading Passage 1?
          </p>
          <p className="mb-2">In boxes 1-7 on your answer sheet, write</p>
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
            <div className="question-item">
              <p className="mb-2">
                <strong>1</strong> People had expected Andy Murray to become the
                world's top tennis player for at least five years before 2016.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q1-true" />
                  <Label htmlFor="q1-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q1-false" />
                  <Label htmlFor="q1-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q1-ng" />
                  <Label htmlFor="q1-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>2</strong> The change that Andy Murray made to his
                rackets attracted a lot of attention.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q2-true" />
                  <Label htmlFor="q2-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q2-false" />
                  <Label htmlFor="q2-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q2-ng" />
                  <Label htmlFor="q2-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>3</strong> Most of the world's top players take a
                professional racket stringer on tour with them.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q3-true" />
                  <Label htmlFor="q3-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q3-false" />
                  <Label htmlFor="q3-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q3-ng" />
                  <Label htmlFor="q3-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>4</strong> Mike and Bob Bryan use rackets that are light
                in comparison to the majority of rackets.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q4-true" />
                  <Label htmlFor="q4-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q4-false" />
                  <Label htmlFor="q4-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q4-ng" />
                  <Label htmlFor="q4-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>5</strong> Werner Fischer played with a spaghetti-strung
                racket that he designed himself.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q5-true" />
                  <Label htmlFor="q5-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q5-false" />
                  <Label htmlFor="q5-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q5-ng" />
                  <Label htmlFor="q5-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>6</strong> The weather can affect how professional
                players adjust the strings on their rackets.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q6-true" />
                  <Label htmlFor="q6-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q6-false" />
                  <Label htmlFor="q6-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q6-ng" />
                  <Label htmlFor="q6-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>7</strong> It was believed that the change Pete Sampras
                made to his rackets contributed to his strong serve.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="TRUE" id="q7-true" />
                  <Label htmlFor="q7-true">TRUE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="FALSE" id="q7-false" />
                  <Label htmlFor="q7-false">FALSE</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q7-ng" />
                  <Label htmlFor="q7-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8-13</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 8-13 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-4">
              The tennis racket and how it has changed
            </h4>
            <ul className="list-disc ml-8 space-y-3">
              <li>
                Mike and Bob Bryan made changes to the types of{" "}
                <strong>8</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> used on
                their racket frames.
              </li>
              <li>
                Players were not allowed to use the spaghetti-strung racket
                because of the amount of <strong>9</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> it
                created.
              </li>
              <li>
                Changes to rackets can be regarded as being as important as
                players' diets or the <strong>10</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> they
                do.
              </li>
              <li>
                All rackets used to have natural strings made from the{" "}
                <strong>11</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> of
                animals.
              </li>
              <li>
                Pete Sampras had metal <strong>12</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> put
                into the frames of his rackets.
              </li>
              <li>
                Gonçalo Oliveira changed the <strong>13</strong>{" "}
                <Input type="text" className="w-24 inline-block mx-1" /> on his
                racket handles.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 2: Questions 14-26
        </h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 14-19</h3>
          <p className="mb-2">Reading Passage 2 has seven paragraphs, A-G.</p>
          <p className="mb-2">
            Which paragraph contains the following information?
          </p>
          <p className="mb-2">
            Write the correct letter, A-G, in boxes 14-19 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>14</strong> a reference to a denial of involvement in
                piracy
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>15</strong> details of how a campaign to eradicate
                piracy was carried out
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>16</strong> a mention of the circumstances in which
                states in the ancient world would make use of pirates
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>17</strong> a reference to how people today commonly
                view pirates
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>18</strong> an explanation of how some people were
                encouraged not to return to piracy
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>19</strong> a mention of the need for many sailing
                vessels to stay relatively close to land
              </p>
              <Input type="text" className="w-16" placeholder="A-G" />
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 20 and 21</h3>
          <p className="mb-2">
            Choose <strong>TWO</strong> letters, <strong>A-E</strong>.
          </p>
          <p className="mb-4">
            Write the correct letters in boxes 20 and 21 on your answer sheet.
          </p>
          <p className="mb-4">
            Which <strong>TWO</strong> of the following statements does the
            writer make about inhabitants of the Mediterranean region in the
            ancient world?
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="q20-21-a" />
              <Label htmlFor="q20-21-a" className="flex-1">
                A They often used stolen vessels to carry out pirate attacks.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q20-21-b" />
              <Label htmlFor="q20-21-b" className="flex-1">
                B They managed to escape capture by the authorities because they
                knew the area so well.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q20-21-c" />
              <Label htmlFor="q20-21-c" className="flex-1">
                C They paid for information about the routes merchant ships
                would take.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q20-21-d" />
              <Label htmlFor="q20-21-d" className="flex-1">
                D They depended more on the sea for their livelihood than on
                farming.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q20-21-e" />
              <Label htmlFor="q20-21-e" className="flex-1">
                E They stored many of the goods taken in pirate attacks in coves
                along the coastline.
              </Label>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 22 and 23</h3>
          <p className="mb-2">
            Choose <strong>TWO</strong> letters, <strong>A–E</strong>.
          </p>
          <p className="mb-4">
            Write the correct letters in boxes 22 and 23 on your answer sheet.
          </p>
          <p className="mb-4">
            Which <strong>TWO</strong> of the following statements does the
            writer make about piracy and ancient Greece?
          </p>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <Checkbox id="q22-23-a" />
              <Label htmlFor="q22-23-a" className="flex-1">
                A The state estimated that very few people were involved in
                piracy.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q22-23-b" />
              <Label htmlFor="q22-23-b" className="flex-1">
                B Attitudes towards piracy changed shortly after the Iliad and
                the Odyssey were written.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q22-23-c" />
              <Label htmlFor="q22-23-c" className="flex-1">
                C Important officials were known to occasionally take part in
                piracy.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q22-23-d" />
              <Label htmlFor="q22-23-d" className="flex-1">
                D Every citizen regarded pirate attacks on cities as
                unacceptable.
              </Label>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="q22-23-e" />
              <Label htmlFor="q22-23-e" className="flex-1">
                E A favourable view of piracy is evident in certain ancient
                Greek texts.
              </Label>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 24–26</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 24–26 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">Ancient Rome and piracy</h4>
            <p className="mb-4">
              Piracy was an issue ancient Rome had to deal with, but it also
              brought some benefits for Rome. For example, pirates supplied
              slaves that were important for Rome's industries. However, attacks
              on vessels transporting <strong>24</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> to Rome
              resulted in calls for <strong>25</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> for the
              pirates responsible. Nevertheless, piracy continued, with some
              pirates demanding a <strong>26</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> for the
              return of the Roman officials they captured.
            </p>
          </div>
        </div>
      </div>

      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 3: Questions 27-40
        </h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–30</h3>
          <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
          <p className="mb-4">
            Write the correct letter in boxes 27–30 on your answer sheet.
          </p>

          <div className="space-y-6">
            {" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> What point does the writer make about
                misinformation in the first paragraph?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q27-a" className="mt-1" />
                  <Label htmlFor="q27-a" className="flex-1">
                    A Misinformation is a relatively recent phenomenon.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q27-b" className="mt-1" />
                  <Label htmlFor="q27-b" className="flex-1">
                    B Some people find it easy to identify misinformation.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q27-c" className="mt-1" />
                  <Label htmlFor="q27-c" className="flex-1">
                    C Misinformation changes as it is passed from one person to
                    another.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q27-d" className="mt-1" />
                  <Label htmlFor="q27-d" className="flex-1">
                    D There may be a number of reasons for the spread of
                    misinformation.
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>28</strong> What does the writer say about the role of
                technology?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q28-a" className="mt-1" />
                  <Label htmlFor="q28-a" className="flex-1">
                    A It may at some point provide us with a solution to
                    misinformation.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q28-b" className="mt-1" />
                  <Label htmlFor="q28-b" className="flex-1">
                    B It could fundamentally alter the way in which people
                    regard information.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q28-c" className="mt-1" />
                  <Label htmlFor="q28-c" className="flex-1">
                    C It has changed the way in which organisations use
                    misinformation.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q28-d" className="mt-1" />
                  <Label htmlFor="q28-d" className="flex-1">
                    D It has made it easier for people to check whether
                    information is accurate.
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>29</strong> What is the writer doing in the fourth
                paragraph?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q29-a" className="mt-1" />
                  <Label htmlFor="q29-a" className="flex-1">
                    A comparing the different opinions people have of
                    misinformation
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q29-b" className="mt-1" />
                  <Label htmlFor="q29-b" className="flex-1">
                    B explaining how the effects of misinformation have changed
                    over time
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q29-c" className="mt-1" />
                  <Label htmlFor="q29-c" className="flex-1">
                    C outlining which issues connected with misinformation are
                    significant today
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q29-d" className="mt-1" />
                  <Label htmlFor="q29-d" className="flex-1">
                    D describing the attitude of policy makers towards
                    misinformation in the media
                  </Label>
                </div>
              </RadioGroup>
            </div>{" "}
            <div className="question-item">
              <p className="mb-2">
                <strong>30</strong> What point does the writer make about
                regulation in the USA?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q30-a" className="mt-1" />
                  <Label htmlFor="q30-a" className="flex-1">
                    A The guidelines issued by the FDA need to be simplified.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q30-b" className="mt-1" />
                  <Label htmlFor="q30-b" className="flex-1">
                    B Regulation does not affect people's opinions of new
                    prescription drugs.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q30-c" className="mt-1" />
                  <Label htmlFor="q30-c" className="flex-1">
                    C The USA has more regulatory bodies than most other
                    countries.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q30-d" className="mt-1" />
                  <Label htmlFor="q30-d" className="flex-1">
                    D Regulation fails to prevent misinformation from appearing
                    in the media.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 31–36</h3>
          <p className="mb-2">
            Complete the summary using the list of phrases, A–J, below.
          </p>
          <p className="mb-4">
            Write the correct letter, A–J, in boxes 31–36 on your answer sheet.
          </p>

          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">
              What happens when people encounter misinformation?
            </h4>
            <p className="mb-4">
              Although people have <strong>31</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />{" "}
              to misinformation, there is debate about precisely how and when we
              label something as true or untrue. The philosophers Descartes and
              Spinoza had <strong>32</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />{" "}
              about how people engage with information. While Descartes believed
              that people accept or reject information after considering whether
              it is true or not, Spinoza argued that people accepted all
              information they encountered (and by default misinformation) and
              did not verify or reject it until afterwards. Moreover, Spinoza
              believed that a distinct <strong>33</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />{" "}
              is involved in these stages. Recent research has provided{" "}
              <strong>34</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />{" "}
              for Spinoza's theory and it would appear that people accept all
              encountered information as if it were true, even if this is for an
              extremely <strong>35</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />
              , and do not label the information as true or false until later.
              This is consistent with the fact that the resources for scepticism
              and the resources for perceiving and encoding are in{" "}
              <strong>36</strong>{" "}
              <Input
                type="text"
                className="w-16 mx-1 inline-block"
                placeholder="A-J"
              />{" "}
              in the brain.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <strong>A</strong> constant conflict
              </div>
              <div>
                <strong>B</strong> additional evidence
              </div>
              <div>
                <strong>C</strong> different locations
              </div>
              <div>
                <strong>D</strong> experimental subjects
              </div>
              <div>
                <strong>E</strong> short period
              </div>
              <div>
                <strong>F</strong> extreme distrust
              </div>
              <div>
                <strong>G</strong> frequent exposure
              </div>
              <div>
                <strong>H</strong> mental operation
              </div>
              <div>
                <strong>I</strong> dubious reason
              </div>
              <div>
                <strong>J</strong> different ideas
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 37–40</h3>
          <p className="mb-2">
            Do the following statements agree with the views of the writer in
            Reading Passage 3?
          </p>
          <p className="mb-2">In boxes 37–40 on your answer sheet, write</p>
          <div className="mb-4">
            <p className="mb-1">
              <strong>YES</strong> if the statement agrees with the views of the
              writer
            </p>
            <p className="mb-1">
              <strong>NO</strong> if the statement contradicts the views of the
              writer
            </p>
            <p className="mb-1">
              <strong>NOT GIVEN</strong> if it is impossible to say what the
              writer thinks about this
            </p>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>37</strong> Campaigns designed to correct misinformation
                will fail to achieve their purpose if people are unable to
                understand them.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q37-yes" />
                  <Label htmlFor="q37-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q37-no" />
                  <Label htmlFor="q37-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q37-ng" />
                  <Label htmlFor="q37-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>38</strong> Attempts to teach elementary school students
                about misinformation have been opposed.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q38-yes" />
                  <Label htmlFor="q38-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q38-no" />
                  <Label htmlFor="q38-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q38-ng" />
                  <Label htmlFor="q38-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>39</strong> It may be possible to overcome the problem
                of misinformation in a relatively short period.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q39-yes" />
                  <Label htmlFor="q39-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q39-no" />
                  <Label htmlFor="q39-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q39-ng" />
                  <Label htmlFor="q39-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>40</strong> The need to keep up with new information is
                hugely exaggerated in today's world.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q40-yes" />
                  <Label htmlFor="q40-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q40-no" />
                  <Label htmlFor="q40-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q40-ng" />
                  <Label htmlFor="q40-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
