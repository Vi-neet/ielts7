// Cambridge 18 General Reading Test 2 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Cambridge18GRTest2Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">SECTION 1</h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–8</h3>
          <p className="mb-2">
            Look at the seven reviews of sleeping bags, A–G.
          </p>
          <p className="mb-2">
            For which sleeping bag are the following statements true?
          </p>
          <p className="mb-2">
            Write the correct letter, A–G, in boxes 1–8 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            {" "}
            <div className="question-item">
              <p className="mb-3">
                <strong>1</strong> This sleeping bag is not very easy to pack
                up.
              </p>
              <RadioGroup name="question1" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q1-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q1-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q1-${letter.toLowerCase()}`}
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
                <strong>2</strong> People can use this sleeping bag in any
                season.
              </p>
              <RadioGroup name="question2" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q2-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q2-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q2-${letter.toLowerCase()}`}
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
                <strong>3</strong> This sleeping bag has been designed to ensure
                certain parts of the body are warm.
              </p>
              <RadioGroup name="question3" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q3-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q3-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q3-${letter.toLowerCase()}`}
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
                <strong>4</strong> This sleeping bag contains a useful storage
                area.
              </p>
              <RadioGroup name="question4" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q4-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q4-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q4-${letter.toLowerCase()}`}
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
                <strong>5</strong> People who do not want to spend much on a
                sleeping bag will find this one suits their needs.
              </p>
              <RadioGroup name="question5" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q5-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q5-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q5-${letter.toLowerCase()}`}
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
                <strong>6</strong> This sleeping bag can also keep the user warm
                during the daytime.
              </p>
              <RadioGroup name="question6" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q6-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q6-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q6-${letter.toLowerCase()}`}
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
                <strong>7</strong> People who wish to avoid carrying heavy
                weights should try this sleeping bag.
              </p>
              <RadioGroup name="question7" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q7-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q7-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q7-${letter.toLowerCase()}`}
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
                <strong>8</strong> This sleeping bag contains two different
                types of material.
              </p>
              <RadioGroup name="question8" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q8-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q8-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q8-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 9–14</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in the
            text?
          </p>
          <p className="mb-2">In boxes 9–14 on your answer sheet, write</p>
          <p className="mb-1">
            <strong>TRUE</strong> if the statement agrees with the information
          </p>
          <p className="mb-1">
            <strong>FALSE</strong> if the statement contradicts the information
          </p>
          <p className="mb-4">
            <strong>NOT GIVEN</strong> if there is no information on this
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>9</strong> Writers can submit an entry of fewer than
                5,000 words for the Life Writing Prize.
              </p>
              <RadioGroup name="question9" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q9-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q9-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q9-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>10</strong> Writers can choose to write about the life
                of a person they know.
              </p>
              <RadioGroup name="question10" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q10-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q10-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q10-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>11</strong> People who have entered an earlier Life
                Writing competition without achieving any success may enter
                again.
              </p>
              <RadioGroup name="question11" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q11-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q11-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q11-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>12</strong> Writers who are between 19 and 25 years old
                and in full-time education have won the prize in previous years.
              </p>
              <RadioGroup name="question12" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q12-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q12-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q12-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>13</strong> Only one prize is awarded at the end of the
                Life Writing competition.
              </p>
              <RadioGroup name="question13" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q13-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q13-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q13-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>14</strong> Previous winners of the Life Writing Prize
                have gone on to become successful published writers.
              </p>
              <RadioGroup name="question14" className="flex flex-wrap gap-4">
                {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                  <div
                    className="flex items-center"
                    key={`q14-${option.toLowerCase().replace(" ", "-")}`}
                  >
                    <RadioGroupItem
                      id={`q14-${option.toLowerCase().replace(" ", "-")}`}
                      value={option}
                    />
                    <Label
                      htmlFor={`q14-${option.toLowerCase().replace(" ", "-")}`}
                      className="ml-2"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="reading-questions p-4 bg-white mt-8">
        <h2 className="text-lg font-bold mb-4">SECTION 2</h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15–21</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 15–21 on your answer sheet.
          </p>

          <div className="notes-section p-4 border border-gray-300 rounded">
            <h4 className="font-semibold mb-4">Encouraging employee health</h4>

            <div className="space-y-4">
              <div className="note-item">
                <p>
                  <strong>Benefits</strong>
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>improved efficiency</li>
                  <li>
                    less{" "}
                    <span className="inline-flex items-center">
                      <strong>15</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question15"
                      />
                    </span>
                  </li>
                </ul>
              </div>

              <div className="note-item">
                <p>
                  <strong>Preventing problems</strong>
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>invite guests, e.g., a doctor, to give information</li>
                  <li>provide vaccinations</li>
                </ul>
              </div>

              <div className="note-item">
                <p>
                  <strong>Diet</strong>
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    make healthier options available to replace{" "}
                    <span className="inline-flex items-center">
                      <strong>16</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question16"
                      />
                    </span>
                  </li>
                  <li>have healthy food at meetings</li>
                  <li>
                    offer{" "}
                    <span className="inline-flex items-center">
                      <strong>17</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question17"
                      />
                    </span>{" "}
                    at no cost
                  </li>
                  <li>
                    provide a{" "}
                    <span className="inline-flex items-center">
                      <strong>18</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question18"
                      />
                    </span>{" "}
                    for staff use
                  </li>
                </ul>
              </div>

              <div className="note-item">
                <p>
                  <strong>Exercise</strong>
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>
                    provide somewhere for employees to leave their{" "}
                    <span className="inline-flex items-center">
                      <strong>19</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question19"
                      />
                    </span>
                  </li>
                  <li>
                    provide{" "}
                    <span className="inline-flex items-center">
                      <strong>20</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question20"
                      />
                    </span>{" "}
                    for workers who exercise
                  </li>
                </ul>
              </div>

              <div className="note-item">
                <p>
                  <strong>Mental health</strong>
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>give managers appropriate training</li>
                  <li>
                    find out how employees feel at work by using{" "}
                    <span className="inline-flex items-center">
                      <strong>21</strong>
                      <Input
                        type="text"
                        className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                        name="question21"
                      />
                    </span>
                  </li>
                  <li>
                    do not tolerate bullying or other inappropriate behaviour
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 22–27</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 22–27 on your answer sheet.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>22</strong> Chefs' uniforms and{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question22"
                  />
                </span>{" "}
                must be washed for every shift.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>23</strong> Kitchen staff need to change the{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question23"
                  />
                </span>{" "}
                when they start chopping another kind of food.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>24</strong> All staff must make sure their hands are
                clean after handling{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question24"
                  />
                </span>
                .
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>25</strong> Workers in the kitchen should not attempt to
                repair{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question25"
                  />
                </span>
                .
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>26</strong>{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question26"
                  />
                </span>{" "}
                are required to identify any chemicals kept in the kitchen.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>27</strong> It is forbidden for kitchen staff to have
                drinks from the{" "}
                <span className="inline-flex items-center">
                  <Input
                    type="text"
                    className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                    name="question27"
                  />
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      <div className="reading-questions p-4 bg-white mt-8">
        <h2 className="text-lg font-bold mb-4">SECTION 3</h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28–31</h3>
          <p className="mb-2">The text has five paragraphs, A–E.</p>
          <p className="mb-2">Which paragraph mentions the following?</p>
          <p className="mb-4">
            Write the correct letter, A–E, in boxes 28–31 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>28</strong> mention of Mawer's desire to oversee all the
                stages of her business
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q28-${letter}`}>
                    <RadioGroupItem id={`q28-${letter}`} value={letter} />
                    <Label htmlFor={`q28-${letter}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29</strong> reference to changing employment patterns
                among the general population
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q29-${letter}`}>
                    <RadioGroupItem id={`q29-${letter}`} value={letter} />
                    <Label htmlFor={`q29-${letter}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30</strong> the date when Clothkits was originally
                established as a product
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q30-${letter}`}>
                    <RadioGroupItem id={`q30-${letter}`} value={letter} />
                    <Label htmlFor={`q30-${letter}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31</strong> the benefits of sewing a garment and then
                wearing it
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E"].map((letter) => (
                  <div className="flex items-center" key={`q31-${letter}`}>
                    <RadioGroupItem id={`q31-${letter}`} value={letter} />
                    <Label htmlFor={`q31-${letter}`} className="ml-2">
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 32–35</h3>
          <p className="mb-2">Choose the correct letter, A, B, C or D.</p>
          <p className="mb-4">
            Write the correct letter in boxes 32–35 on your answer sheet.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>32</strong> In Paragraph A, the writer says that Kay
                Mawer was reminded about Clothkits by
              </p>
              <RadioGroup name="question32" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q32-a" value="A" className="mt-1" />
                  <Label htmlFor="q32-a" className="ml-2">
                    A. a shop she visited.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q32-b" value="B" className="mt-1" />
                  <Label htmlFor="q32-b" className="ml-2">
                    B. a purchase she made.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q32-c" value="C" className="mt-1" />
                  <Label htmlFor="q32-c" className="ml-2">
                    C. an outfit someone was wearing.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q32-d" value="D" className="mt-1" />
                  <Label htmlFor="q32-d" className="ml-2">
                    D. a conversation with someone she knew.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33</strong> What does the reader learn about Clothkits
                in the 1960s and 1970s?
              </p>
              <RadioGroup name="question33" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q33-a" value="A" className="mt-1" />
                  <Label htmlFor="q33-a" className="ml-2">
                    A. Its designs represented the attitudes of the time.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q33-b" value="B" className="mt-1" />
                  <Label htmlFor="q33-b" className="ml-2">
                    B. Its products were only affordable for the wealthy.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q33-c" value="C" className="mt-1" />
                  <Label htmlFor="q33-c" className="ml-2">
                    C. Its creator tried many times to launch her company.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q33-d" value="D" className="mt-1" />
                  <Label htmlFor="q33-d" className="ml-2">
                    D. Its management was spread across numerous countries.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>34</strong> Why did Clothkits close in 1991?
              </p>
              <RadioGroup name="question34" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q34-a" value="A" className="mt-1" />
                  <Label htmlFor="q34-a" className="ml-2">
                    A. There were unexpected staffing problems.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-b" value="B" className="mt-1" />
                  <Label htmlFor="q34-b" className="ml-2">
                    B. The funding for sewing activities was inadequate.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-c" value="C" className="mt-1" />
                  <Label htmlFor="q34-c" className="ml-2">
                    C. Freeman's was an unsuitable partner.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q34-d" value="D" className="mt-1" />
                  <Label htmlFor="q34-d" className="ml-2">
                    D. Records on Kennedy's database were lost.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>35</strong> What point does the writer make in Paragraph
                E?
              </p>
              <RadioGroup name="question35" className="space-y-2">
                <div className="flex items-start">
                  <RadioGroupItem id="q35-a" value="A" className="mt-1" />
                  <Label htmlFor="q35-a" className="ml-2">
                    A. Clothkits will reach more markets than in the past.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-b" value="B" className="mt-1" />
                  <Label htmlFor="q35-b" className="ml-2">
                    B. Clothkits will need bigger premises than in the past.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-c" value="C" className="mt-1" />
                  <Label htmlFor="q35-c" className="ml-2">
                    C. People are more concerned about throwing away items than
                    in the past.
                  </Label>
                </div>
                <div className="flex items-start">
                  <RadioGroupItem id="q35-d" value="D" className="mt-1" />
                  <Label htmlFor="q35-d" className="ml-2">
                    D. People do less sewing now than in the past.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 36–40</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 36–40 on your answer sheet.
          </p>

          <div className="summary-section p-4 border border-gray-300 rounded">
            <h4 className="font-semibold mb-4">The early days of Clothkits</h4>

            <p className="leading-relaxed">
              Clothkits was started by a designer named Anne Kennedy. Her
              clothing company specialised in selling{" "}
              <span className="inline-flex items-center">
                <strong>36</strong>
                <Input
                  type="text"
                  className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                  name="question36"
                />
              </span>{" "}
              with a pattern printed on it. This came with{" "}
              <span className="inline-flex items-center">
                <strong>37</strong>
                <Input
                  type="text"
                  className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                  name="question37"
                />
              </span>
              , which meant that buyers were able to make their own garments.
            </p>
            <p className="leading-relaxed mt-4">
              The very first garment Anne Kennedy made was a multi-coloured
              striped dress with a{" "}
              <span className="inline-flex items-center">
                <strong>38</strong>
                <Input
                  type="text"
                  className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                  name="question38"
                />
              </span>{" "}
              pattern. A{" "}
              <span className="inline-flex items-center">
                <strong>39</strong>
                <Input
                  type="text"
                  className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                  name="question39"
                />
              </span>{" "}
              article led to many orders for this from around the world. As the
              company grew, she increased her workforce, and also sold{" "}
              <span className="inline-flex items-center">
                <strong>40</strong>
                <Input
                  type="text"
                  className="mx-2 w-32 border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none"
                  name="question40"
                />
              </span>{" "}
              as part of her business. She exhibited her designs using her
              children as models.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cambridge18GRTest2Questions;
              