import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 19 Academic Reading Test 3
 */
export const Cambridge19ARTest3Questions: React.FC = () => {
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
                <strong>1</strong> Archaeological research had taken place on
                the island of Obi before the arrival of Ceri Shipton and his
                colleagues.
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
                <strong>2</strong> At the Kelo sites, the researchers found the
                first clam shell axes ever to be discovered in the region.
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
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>3</strong> The size of Obi today is less than it was
                18,000 years ago.
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
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>4</strong> A change in the climate around 11,700 years
                ago had a greater impact on Obi than on the surrounding islands.
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
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>5</strong> The researchers believe there is a connection
                between warmer, wetter weather and a change in the material used
                to make axes.
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
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>6</strong> Shipton's team were surprised to find
                evidence of the Obi islanders' hunting practices.
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
            </div>
            <div className="question-item">
              <p className="mb-2">
                <strong>7</strong> It is thought that the Kelo shelters were
                occupied continuously until about 1,000 years ago.
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
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8-13</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 8-13 on your answer sheet.
          </p>{" "}
          <div className="border p-4 mb-6">
            <h4 className="font-bold mb-2">Archaeological findings on Obi</h4>

            <p className="mb-4">
              Excavations of rock shelters inside <strong>8</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> near the
              village of Kelo revealed:
            </p>

            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>
                axes from around 14,000 years ago, probably used to make canoes
              </li>
              <li>
                axes made out of <strong>9</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />, dating
                from around 11,700 years ago
              </li>
              <li>
                <strong>10</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of an
                animal: evidence of what ancient islanders ate
              </li>
              <li>evidence of travel between islands:</li>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>obsidian: a material that is not found naturally on Obi</li>
                <li>
                  <strong>11</strong>{" "}
                  <Input type="text" className="w-32 mx-1 inline-block" /> which
                  resembled ones found on other islands.
                </li>
              </ul>
            </ul>

            <p className="mb-2">
              It is thought that from 8,000 years ago, Obi islanders:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>may have switched from hunting to fishing</li>
              <li>
                had <strong>12</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> as well
                as items made out of metal
              </li>
              <li>
                probably took part in the production and sale of{" "}
                <strong>13</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
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
          <h3 className="font-bold mb-2">Questions 14–17</h3>
          <p className="mb-2">Reading Passage 2 has eight paragraphs, A–H.</p>
          <p className="mb-2">
            Which paragraph contains the following information?
          </p>
          <p className="mb-4">
            Write the correct letter, A–H, in boxes 14–17 on your answer sheet.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>14</strong> reference to the need to ensure that
                inhabitants of wetland regions continue to benefit from them
              </p>
              <Input type="text" className="w-16" placeholder="A-H" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>15</strong> the proportion of wetlands which have
                already been lost
              </p>
              <Input type="text" className="w-16" placeholder="A-H" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>16</strong> reference to the idea that people are
                beginning to appreciate the value of wetlands
              </p>
              <Input type="text" className="w-16" placeholder="A-H" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>17</strong> mention of the cultural significance of
                wetlands
              </p>
              <Input type="text" className="w-16" placeholder="A-H" />
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 18–22</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 18–22 on your answer sheet.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>18</strong> Peatlands which have been drained begin to
                release <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                instead of storing it.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>19</strong> Once peatland areas have been cleared,{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> are
                more likely to occur.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>20</strong> Clearing peatland forests to make way for
                oil palm plantations destroys the{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of the
                local environment.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>21</strong> Water is drained out of peatlands through
                the <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                which are created by logging companies.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>22</strong> Draining peatlands leads to{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />: a
                serious problem which can eventually result in coastal flooding
                and land loss.
              </p>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 23–26</h3>
          <p className="mb-2">
            Look at the following statements (Questions 23–26) and the list of
            experts below.
          </p>
          <p className="mb-2">
            Match each statement with the correct expert, A–D.
          </p>
          <p className="mb-4">
            Write the correct letter, A–D, in boxes 23–26 on your answer sheet.
          </p>

          <div className="border p-4 mb-4">
            <h4 className="font-bold mb-2">List of Experts</h4>
            <div className="space-y-1">
              <p>
                <strong>A</strong> Matthew McCartney
              </p>
              <p>
                <strong>B</strong> Pieter van Eijk
              </p>
              <p>
                <strong>C</strong> Marcel Silvius
              </p>
              <p>
                <strong>D</strong> Dave Tickner
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>23</strong> Communities living in wetland regions must
                be included in discussions about the future of these areas.
              </p>
              <Input type="text" className="w-16" placeholder="A-D" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>24</strong> Official policies towards wetlands vary from
                one nation to the next.
              </p>
              <Input type="text" className="w-16" placeholder="A-D" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>25</strong> People cause harm to wetlands without having
                any intention to do so.
              </p>
              <Input type="text" className="w-16" placeholder="A-D" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>26</strong> Initiatives to reverse environmental damage
                need not be complex.
              </p>
              <Input type="text" className="w-16" placeholder="A-D" />
            </div>
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
            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> What does the reader learn about the
                conversation in the first paragraph?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q27-a" className="mt-1" />
                  <Label htmlFor="q27-a" className="flex-1">
                    A The speakers are communicating in different languages.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q27-b" className="mt-1" />
                  <Label htmlFor="q27-b" className="flex-1">
                    B Neither of the speakers is familiar with their
                    environment.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q27-c" className="mt-1" />
                  <Label htmlFor="q27-c" className="flex-1">
                    C The topic of the conversation is difficult for both
                    speakers.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q27-d" className="mt-1" />
                  <Label htmlFor="q27-d" className="flex-1">
                    D Aspects of the conversation are challenging for both
                    speakers.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>28</strong> What assists the electronic translator
                during lectures at Karlsruhe Institute of Technology?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q28-a" className="mt-1" />
                  <Label htmlFor="q28-a" className="flex-1">
                    A the repeated content of lectures
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q28-b" className="mt-1" />
                  <Label htmlFor="q28-b" className="flex-1">
                    B the students' reading skills
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q28-c" className="mt-1" />
                  <Label htmlFor="q28-c" className="flex-1">
                    C the languages used
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q28-d" className="mt-1" />
                  <Label htmlFor="q28-d" className="flex-1">
                    D the lecturers' technical ability
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>29</strong> When referring to The Hitchhiker's Guide to
                the Galaxy, the writer suggests that
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q29-a" className="mt-1" />
                  <Label htmlFor="q29-a" className="flex-1">
                    A the Babel fish was considered undesirable at the time.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q29-b" className="mt-1" />
                  <Label htmlFor="q29-b" className="flex-1">
                    B this book was not seriously intending to predict the
                    future.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q29-c" className="mt-1" />
                  <Label htmlFor="q29-c" className="flex-1">
                    C artificial speech translation was not a surprising
                    development.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q29-d" className="mt-1" />
                  <Label htmlFor="q29-d" className="flex-1">
                    D some speech translation techniques are better than others.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>30</strong> What does the writer say about sharing
                earpieces?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q30-a" className="mt-1" />
                  <Label htmlFor="q30-a" className="flex-1">
                    A It is something people will get used to doing.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q30-b" className="mt-1" />
                  <Label htmlFor="q30-b" className="flex-1">
                    B The reluctance to do this is understandable.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q30-c" className="mt-1" />
                  <Label htmlFor="q30-c" className="flex-1">
                    C The equipment will be unnecessary in the future.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q30-d" className="mt-1" />
                  <Label htmlFor="q30-d" className="flex-1">
                    D It is something few people need to worry about.
                  </Label>
                </div>{" "}
              </RadioGroup>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 31–34</h3>
          <p className="mb-2">
            Complete each sentence with the correct ending, A–F, below.
          </p>
          <p className="mb-4">
            Write the correct letter, A–F, in boxes 31–34 on your answer sheet.
          </p>

          <div className="border p-4 mb-4">
            <div className="space-y-1">
              <p>
                <strong>A</strong> but there are concerns about this.
              </p>
              <p>
                <strong>B</strong> as systems do not need to conform to standard
                practices.
              </p>
              <p>
                <strong>C</strong> but they are far from perfect.
              </p>
              <p>
                <strong>D</strong> despite the noise issues.
              </p>
              <p>
                <strong>E</strong> because translation is immediate.
              </p>
              <p>
                <strong>F</strong> and have an awareness of good manners.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>31</strong> Speech translation methods are developing
                fast in Japan
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>32</strong> TV interviews that use translation voiceover
                methods are successful
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>33</strong> Future translation systems should address
                people appropriately
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>34</strong> Users may be able to maintain their local
                customs{" "}
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>
          </div>
        </div>
      </div>

      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">
          READING PASSAGE 3: Questions 27-40
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–30</h3>
          <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
          <p className="mb-4">
            Write the correct letter in boxes 27–30 on your answer sheet.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> What does the reader learn about the
                conversation in the first paragraph?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q27-a" className="mt-1" />
                  <Label htmlFor="q27-a" className="flex-1">
                    A The speakers are communicating in different languages.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q27-b" className="mt-1" />
                  <Label htmlFor="q27-b" className="flex-1">
                    B Neither of the speakers is familiar with their
                    environment.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q27-c" className="mt-1" />
                  <Label htmlFor="q27-c" className="flex-1">
                    C The topic of the conversation is difficult for both
                    speakers.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q27-d" className="mt-1" />
                  <Label htmlFor="q27-d" className="flex-1">
                    D Aspects of the conversation are challenging for both
                    speakers.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>28</strong> What assists the electronic translator
                during lectures at Karlsruhe Institute of Technology?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q28-a" className="mt-1" />
                  <Label htmlFor="q28-a" className="flex-1">
                    A the repeated content of lectures
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q28-b" className="mt-1" />
                  <Label htmlFor="q28-b" className="flex-1">
                    B the students' reading skills
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q28-c" className="mt-1" />
                  <Label htmlFor="q28-c" className="flex-1">
                    C the languages used
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q28-d" className="mt-1" />
                  <Label htmlFor="q28-d" className="flex-1">
                    D the lecturers' technical ability
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>29</strong> When referring to The Hitchhiker's Guide to
                the Galaxy, the writer suggests that
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q29-a" className="mt-1" />
                  <Label htmlFor="q29-a" className="flex-1">
                    A the Babel fish was considered undesirable at the time.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q29-b" className="mt-1" />
                  <Label htmlFor="q29-b" className="flex-1">
                    B this book was not seriously intending to predict the
                    future.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q29-c" className="mt-1" />
                  <Label htmlFor="q29-c" className="flex-1">
                    C artificial speech translation was not a surprising
                    development.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q29-d" className="mt-1" />
                  <Label htmlFor="q29-d" className="flex-1">
                    D some speech translation techniques are better than others.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>30</strong> What does the writer say about sharing
                earpieces?
              </p>
              <RadioGroup className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="A" id="q30-a" className="mt-1" />
                  <Label htmlFor="q30-a" className="flex-1">
                    A It is something people will get used to doing.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="B" id="q30-b" className="mt-1" />
                  <Label htmlFor="q30-b" className="flex-1">
                    B The reluctance to do this is understandable.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="C" id="q30-c" className="mt-1" />
                  <Label htmlFor="q30-c" className="flex-1">
                    C The equipment will be unnecessary in the future.
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="D" id="q30-d" className="mt-1" />
                  <Label htmlFor="q30-d" className="flex-1">
                    D It is something few people need to worry about.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 31–34</h3>
          <p className="mb-2">
            Complete each sentence with the correct ending, A–F, below.
          </p>
          <p className="mb-4">
            Write the correct letter, A–F, in boxes 31–34 on your answer sheet.
          </p>

          <div className="border p-4 mb-4">
            <div className="space-y-1">
              <p>
                <strong>A</strong> but there are concerns about this.
              </p>
              <p>
                <strong>B</strong> as systems do not need to conform to standard
                practices.
              </p>
              <p>
                <strong>C</strong> but they are far from perfect.
              </p>
              <p>
                <strong>D</strong> despite the noise issues.
              </p>
              <p>
                <strong>E</strong> because translation is immediate.
              </p>
              <p>
                <strong>F</strong> and have an awareness of good manners.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>31</strong> Speech translation methods are developing
                fast in Japan
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>32</strong> TV interviews that use translation voiceover
                methods are successful
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>33</strong> Future translation systems should address
                people appropriately
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>34</strong> Users may be able to maintain their local
                customs
              </p>
              <Input type="text" className="w-16" placeholder="A-F" />
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 35–40</h3>
          <p className="mb-2">
            Do the following statements agree with the views of the writer in
            Reading Passage 3?
          </p>
          <p className="mb-2">In boxes 35–40 on your answer sheet, write:</p>
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
                <strong>35</strong> Language translation systems will be seen as
                very useful throughout the academic and professional worlds.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q35-yes" />
                  <Label htmlFor="q35-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q35-no" />
                  <Label htmlFor="q35-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q35-ng" />
                  <Label htmlFor="q35-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>36</strong> The overall value of automated translation
                to family life is yet to be shown.
              </p>
              <RadioGroup className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="YES" id="q36-yes" />
                  <Label htmlFor="q36-yes">YES</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NO" id="q36-no" />
                  <Label htmlFor="q36-no">NO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="NOT GIVEN" id="q36-ng" />
                  <Label htmlFor="q36-ng">NOT GIVEN</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>37</strong> Automated translation could make life more
                difficult for immigrant families.
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
                <strong>38</strong> Visual aspects of language translation are
                being considered by scientists.
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
                <strong>39</strong> International scientists have found English
                easier to translate into other languages than Latin.
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
                <strong>40</strong> As far as language is concerned, there is a
                difference between people's social and practical needs.
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
