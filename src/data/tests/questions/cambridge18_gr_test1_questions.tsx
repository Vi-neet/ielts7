// Cambridge 18 General Reading Test 1 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const Cambridge18GRTest1Questions: React.FC = () => {
  return (
    <>      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">SECTION 1</h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–7</h3>
          <p className="mb-2">
            Do the following statements agree with the information given in the text?
          </p>
          <p className="mb-2">In boxes 1–7 on your answer sheet, write</p>
          <div className="mb-4 space-y-1">
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>1</strong> Dry cleaners are generally responsible for items left with them, even if there's a sign saying the opposite.
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
                  <RadioGroupItem id="q1-ng" value="NG" />
                  <Label htmlFor="q1-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>2</strong> If the dry cleaner loses an item belonging to you, they should give you enough money to buy a completely new one.
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
                  <RadioGroupItem id="q2-ng" value="NG" />
                  <Label htmlFor="q2-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>3</strong> If you have the receipt for a damaged item, the company should refund the amount you originally paid for it.
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
                  <RadioGroupItem id="q3-ng" value="NG" />
                  <Label htmlFor="q3-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>4</strong> It may be possible to get support for your complaint from a dry cleaners' trade association.
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
                  <RadioGroupItem id="q4-ng" value="NG" />
                  <Label htmlFor="q4-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>5</strong> If you're offered too little compensation, you can request a free report from an independent organisation.
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
                  <RadioGroupItem id="q5-ng" value="NG" />
                  <Label htmlFor="q5-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>6</strong> Most people who take a case about a dry-cleaning company to court are satisfied with the outcome.
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
                  <RadioGroupItem id="q6-ng" value="NG" />
                  <Label htmlFor="q6-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>7</strong> If an item was lost or damaged nine months ago, you can still take the dry cleaner to court.
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
                  <RadioGroupItem id="q7-ng" value="NG" />
                  <Label htmlFor="q7-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8–14</h3>
          <p className="mb-2">
            The text has six paragraphs, A–F.
          </p>
          <p className="mb-2">
            Which paragraph mentions the following?
          </p>
          <p className="mb-4">
            Write the correct letter, A–F, in boxes 8–14 on your answer sheet.
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>8</strong> Members of this group share ideas for the books they would like to read.
              </p>
              <RadioGroup name="question8" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
            </div>            <div className="question-item">
              <p className="mb-2">
                <strong>9</strong> It isn't possible for any new members to join this group at present.
              </p>
              <RadioGroup name="question9" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q9-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q9-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q9-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>10</strong> You can get feedback on your own work from other members of this group.
              </p>
              <RadioGroup name="question10" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q10-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q10-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q10-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>11</strong> This group focuses on stories belonging to just one genre.
              </p>
              <RadioGroup name="question11" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q11-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q11-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q11-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>12</strong> Work produced by members of this group will be available to the public.
              </p>
              <RadioGroup name="question12" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q12-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q12-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q12-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>13</strong> This group doesn't read or write either poetry or fiction.
              </p>
              <RadioGroup name="question13" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q13-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q13-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q13-${letter.toLowerCase()}`}
                      className="ml-2"
                    >
                      {letter}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>14</strong> This group would suit someone who thinks they could write a book.
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
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4">SECTION 2</h2>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15–22</h3>
          <p className="mb-2">Complete the notes below.</p>
          <p className="mb-2">
            Choose <strong>NO MORE THAN TWO WORDS</strong> from
            the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 15–22 on your answer sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-bold mb-2">Lifting equipment</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>must be manufactured well, e.g., have a <strong>15</strong> <Input type="text" className="w-32 mx-1 inline-block" /> on it</li>
              <li>may need to undergo <strong>16</strong> <Input type="text" className="w-32 mx-1 inline-block" /> before use</li>
              <li>may need a regular check by an <strong>17</strong> <Input type="text" className="w-32 mx-1 inline-block" /></li>
            </ul>

            <h3 className="font-bold mb-2">Lift plans</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>relevant to cranes</li>
              <li>used to establish and carry out <strong>18</strong> <Input type="text" className="w-32 mx-1 inline-block" /> for any risks</li>
              <li>a <strong>19</strong> <Input type="text" className="w-32 mx-1 inline-block" /> can be consulted during a 'Tool Box Talk'</li>
            </ul>

            <h3 className="font-bold mb-2">Preventing accidents with heavy loads</h3>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>use objects such as <strong>20</strong> <Input type="text" className="w-32 mx-1 inline-block" /> to make sure the load doesn't pass over anyone's head</li>
              <li>appoint a <strong>21</strong> <Input type="text" className="w-32 mx-1 inline-block" /> to give verbal directions to the crane driver</li>
            </ul>

            <h3 className="font-bold mb-2">Secondary lifting equipment (chains, slings, etc.)</h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>more likely to cause <strong>22</strong> <Input type="text" className="w-32 mx-1 inline-block" /></li>
            </ul>
          </div>
        </div>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 23–27</h3>
          <p className="mb-2">Complete the table below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes 23–27 on your answer sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-bold mb-2 text-center">Strategies for dealing with customer complaints</h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-100">Strategy</th>
                  <th className="border border-gray-300 p-2 bg-gray-100">Your approach</th>
                  <th className="border border-gray-300 p-2 bg-gray-100">The customer...</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Stay calm</td>
                  <td className="border border-gray-300 p-2">
                    Remember it is not a direct attack on you.<br/>
                    Do not try to <Input type="text" className="w-20 inline-block mx-1" /> <strong>(23)</strong> the argument.
                  </td>
                  <td className="border border-gray-300 p-2">
                    usually had <Input type="text" className="w-20 inline-block mx-1" /> <strong>(24)</strong> that were not fulfilled.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Listen well</td>
                  <td className="border border-gray-300 p-2">Use short phrases in reply.</td>
                  <td className="border border-gray-300 p-2">
                    cannot recognise a <Input type="text" className="w-20 inline-block mx-1" /> <strong>(25)</strong> until calm
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Get the facts</td>
                  <td className="border border-gray-300 p-2">Ask questions and begin a proper conversation.</td>
                  <td className="border border-gray-300 p-2">will start to trust you.</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">Suggest action</td>
                  <td className="border border-gray-300 p-2">
                    Be sure of your company's <Input type="text" className="w-20 inline-block mx-1" /> <strong>(26)</strong> on complaints.
                  </td>
                  <td className="border border-gray-300 p-2">
                    may well make a verbal <Input type="text" className="w-20 inline-block mx-1" /> <strong>(27)</strong> in future.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4">SECTION 3</h2>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28–33</h3>
          <p className="mb-2">
            The text has six sections, <strong>A–F</strong>.
          </p>
          <p className="mb-2">
            Choose the correct heading for each section from the list of headings below.
          </p>
          <p className="mb-4">
            Write the correct number, <strong>i–viii</strong>, in boxes{" "}
            <strong>28–33</strong> on your answer sheet.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">List of Headings</h4>
            <div className="grid grid-cols-1 gap-1">
              <p><strong>i</strong> An enterprise arising from success in other countries</p>
              <p><strong>ii</strong> The hope that storks will inspire a range of emotions and actions</p>
              <p><strong>iii</strong> Support from some organisations but not from others</p>
              <p><strong>iv</strong> Finding new types of habitat</p>
              <p><strong>v</strong> Opposition from the general public</p>
              <p><strong>vi</strong> A sign of hope in difficult times</p>
              <p><strong>vii</strong> Creatures which represent both joy and opposition</p>
              <p><strong>viii</strong> Storks causing delight and the revival of public events</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>28</strong> Section A
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q28-${number}`}
                    >
                      <RadioGroupItem
                        id={`q28-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q28-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>29</strong> Section B
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q29-${number}`}
                    >
                      <RadioGroupItem
                        id={`q29-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q29-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>30</strong> Section C
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q30-${number}`}
                    >
                      <RadioGroupItem
                        id={`q30-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q30-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>31</strong> Section D
              </p>
              <RadioGroup name="question31" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q31-${number}`}
                    >
                      <RadioGroupItem
                        id={`q31-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q31-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>32</strong> Section E
              </p>
              <RadioGroup name="question32" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q32-${number}`}
                    >
                      <RadioGroupItem
                        id={`q32-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q32-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>33</strong> Section F
              </p>
              <RadioGroup name="question33" className="flex flex-wrap gap-4">
                {["i", "ii", "iii", "iv", "v", "vi", "vii", "viii"].map(
                  (number) => (
                    <div
                      className="flex items-center"
                      key={`q33-${number}`}
                    >
                      <RadioGroupItem
                        id={`q33-${number}`}
                        value={number}
                      />
                      <Label
                        htmlFor={`q33-${number}`}
                        className="ml-2"
                      >
                        {number}
                      </Label>
                    </div>
                  )
                )}
              </RadioGroup>
            </div>
          </div>
        </div>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 34–37</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-2">
            Choose <strong>ONE WORD ONLY</strong> from the text for each answer.
          </p>
          <p className="mb-4">
            Write your answers in boxes <strong>34–37</strong> on your answer
            sheet.
          </p>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h3 className="font-bold mb-2">
              Project to reintroduce white storks at Knepp Estate
            </h3>
            <p className="mb-4">
              Last spring, two white storks were observed nesting at Knepp Estate, putting 
              <strong>34</strong> <Input type="text" className="w-32 mx-1 inline-block" /> together high up in a large oak tree. 
              The female laid three eggs, which unfortunately proved to be <strong>35</strong> <Input type="text" className="w-32 mx-1 inline-block" />. 
              However, this was not surprising for such young storks. Naturalists believe they are likely to breed successfully in the future.
            </p>
            <p className="mb-4">
              These two storks were bred in <strong>36</strong> <Input type="text" className="w-32 mx-1 inline-block" /> and, after arriving in the UK, 
              were kept for several years together with a few fully mature storks and some fellow juveniles before being released at Knepp. 
              It appears that other storks are developing a sense of <strong>37</strong> <Input type="text" className="w-32 mx-1 inline-block" /> to their new home. 
              One left Knepp for a year, only to fly back to be with the group again.
            </p>
          </div>
        </div>        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 38–40</h3>
          <p className="mb-2">Choose the correct letter, <strong>A</strong>, <strong>B</strong>, <strong>C</strong> or <strong>D</strong>.</p>
          <p className="mb-4">
            Write the correct letter in boxes <strong>38–40</strong> on your answer sheet.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>38</strong> In Section A, we learn that in the past people thought white storks
              </p>
              <RadioGroup name="question38" className="space-y-3">
                <div className="flex items-center">
                  <RadioGroupItem id="q38-a" value="A" />
                  <Label htmlFor="q38-a" className="ml-2">
                    A  represented the deep snow and cold days of winter.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-b" value="B" />
                  <Label htmlFor="q38-b" className="ml-2">
                    B  had the power to ensure that babies were born safely.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-c" value="C" />
                  <Label htmlFor="q38-c" className="ml-2">
                    C  were a speciality that only the very rich were allowed to eat.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q38-d" value="D" />
                  <Label htmlFor="q38-d" className="ml-2">
                    D  might be used to encourage people to get rid of the monarchy.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>39</strong> The Sussex Wildlife Trust committee was unwilling to support the storks because
              </p>
              <RadioGroup name="question39" className="space-y-3">
                <div className="flex items-center">
                  <RadioGroupItem id="q39-a" value="A" />
                  <Label htmlFor="q39-a" className="ml-2">
                    A  it thought there might not be any safe breeding places locally.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-b" value="B" />
                  <Label htmlFor="q39-b" className="ml-2">
                    B  it worried whether they would survive in Britain long enough.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-c" value="C" />
                  <Label htmlFor="q39-c" className="ml-2">
                    C  it was unsure that they were actually a native species.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q39-d" value="D" />
                  <Label htmlFor="q39-d" className="ml-2">
                    D  it had too many other worthy projects to support.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>40</strong> What has been one effect of stork reintroductions in Europe?
              </p>
              <RadioGroup name="question40" className="space-y-3">
                <div className="flex items-center">
                  <RadioGroupItem id="q40-a" value="A" />
                  <Label htmlFor="q40-a" className="ml-2">
                    A  A variety of measures have been taken to create nesting sites.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-b" value="B" />
                  <Label htmlFor="q40-b" className="ml-2">
                    B  Changes have been made to the routes of some major roads.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-c" value="C" />
                  <Label htmlFor="q40-c" className="ml-2">
                    C  Special shelters have been made to protect the birds in bad weather.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-d" value="D" />
                  <Label htmlFor="q40-d" className="ml-2">
                    D  Some people have strengthened their roofs to support the birds' weight.
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

export default Cambridge18GRTest1Questions;
