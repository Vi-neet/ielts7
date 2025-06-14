// Cambridge 19 General Reading Test 2 - Questions
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export const Cambridge19GRTest2Questions: React.FC = () => {
  return (
    <>
      <div className="reading-questions p-4 bg-white">
        <h2 className="text-lg font-bold mb-4">Section 1: Passage 1</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 1–7</h3>
          <div className="mb-4">
            <p>
              Look at the five descriptions of campsites, <strong>A-E</strong>.
            </p>
            <p>For which campsite are the following statements true?</p>
            <p>
              Write the correct letter, <strong>A-E</strong>, in{" "}
              <strong>boxes 1-7</strong> on your answer sheet.
            </p>
            <p className="mt-2 italic">
              <em>NB You may use any letter more than once.</em>
            </p>
          </div>

          <div className="space-y-6 mt-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>1</strong> The site is impossible to get to at certain
                times.
              </p>
              <RadioGroup name="question1" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q1-a" value="A" />
                  <Label htmlFor="q1-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q1-b" value="B" />
                  <Label htmlFor="q1-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q1-c" value="C" />
                  <Label htmlFor="q1-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q1-d" value="D" />
                  <Label htmlFor="q1-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q1-e" value="E" />
                  <Label htmlFor="q1-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>2</strong> It is in a convenient place for going by car
                to various tourist spots.
              </p>
              <RadioGroup name="question2" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q2-a" value="A" />
                  <Label htmlFor="q2-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q2-b" value="B" />
                  <Label htmlFor="q2-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q2-c" value="C" />
                  <Label htmlFor="q2-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q2-d" value="D" />
                  <Label htmlFor="q2-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q2-e" value="E" />
                  <Label htmlFor="q2-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>3</strong> You should camp somewhere inside the marked
                zone.
              </p>
              <RadioGroup name="question3" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q3-a" value="A" />
                  <Label htmlFor="q3-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q3-b" value="B" />
                  <Label htmlFor="q3-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q3-c" value="C" />
                  <Label htmlFor="q3-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q3-d" value="D" />
                  <Label htmlFor="q3-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q3-e" value="E" />
                  <Label htmlFor="q3-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>4</strong> Campers who enjoy a particular physical
                challenge come here.
              </p>
              <RadioGroup name="question4" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q4-a" value="A" />
                  <Label htmlFor="q4-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q4-b" value="B" />
                  <Label htmlFor="q4-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q4-c" value="C" />
                  <Label htmlFor="q4-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q4-d" value="D" />
                  <Label htmlFor="q4-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q4-e" value="E" />
                  <Label htmlFor="q4-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>5</strong> The difficult journey to the site is worth
                the effort.
              </p>
              <RadioGroup name="question5" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q5-a" value="A" />
                  <Label htmlFor="q5-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q5-b" value="B" />
                  <Label htmlFor="q5-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q5-c" value="C" />
                  <Label htmlFor="q5-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q5-d" value="D" />
                  <Label htmlFor="q5-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q5-e" value="E" />
                  <Label htmlFor="q5-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>6</strong> Few people have heard of this site.
              </p>
              <RadioGroup name="question6" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q6-a" value="A" />
                  <Label htmlFor="q6-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-b" value="B" />
                  <Label htmlFor="q6-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-c" value="C" />
                  <Label htmlFor="q6-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-d" value="D" />
                  <Label htmlFor="q6-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q6-e" value="E" />
                  <Label htmlFor="q6-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>7</strong> Some physical effort is needed to enjoy
                nearby coastal areas.
              </p>
              <RadioGroup name="question7" className="flex gap-4">
                <div className="flex items-center">
                  <RadioGroupItem id="q7-a" value="A" />
                  <Label htmlFor="q7-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-b" value="B" />
                  <Label htmlFor="q7-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-c" value="C" />
                  <Label htmlFor="q7-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-d" value="D" />
                  <Label htmlFor="q7-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q7-e" value="E" />
                  <Label htmlFor="q7-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-4">Section 1: Passage 2</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 8–14</h3>
          <div className="mb-4">
            <p>
              Do the following statements agree with the information given in
              the text?
            </p>
            <p>
              In <strong>boxes 8-14</strong> on your answer sheet, write
            </p>
          </div>

          <div className="mb-6 space-y-1">
            <p>
              <strong>TRUE</strong> if the statement agrees with the information
            </p>
            <p>
              <strong>FALSE</strong> if the statement contradicts the
              information
            </p>
            <p>
              <strong>NOT GIVEN</strong> if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>8</strong> The water penetration in some flats is being
                treated as an emergency.
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
                  <RadioGroupItem id="q8-ng" value="NG" />
                  <Label htmlFor="q8-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>9</strong> The southern wall will undergo a permanent
                repair this year.
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
                  <RadioGroupItem id="q9-ng" value="NG" />
                  <Label htmlFor="q9-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>10</strong> Some people have failed to pay attention to
                'wet paint' signs.
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
                  <RadioGroupItem id="q10-ng" value="NG" />
                  <Label htmlFor="q10-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>11</strong> Air fresheners have caused some damage in
                the past.
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
                  <RadioGroupItem id="q11-ng" value="NG" />
                  <Label htmlFor="q11-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>12</strong> Residents are responsible for removing their
                own rubbish from the building.
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
                  <RadioGroupItem id="q12-ng" value="NG" />
                  <Label htmlFor="q12-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>13</strong> Some residents have reported problems with
                noisy neighbours.
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
                  <RadioGroupItem id="q13-ng" value="NG" />
                  <Label htmlFor="q13-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>14</strong> DIY can take place outside the stated hours
                if your neighbour agrees.
              </p>
              <RadioGroup name="question14" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q14-true" value="TRUE" />
                  <Label htmlFor="q14-true" className="ml-2">
                    TRUE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q14-false" value="FALSE" />
                  <Label htmlFor="q14-false" className="ml-2">
                    FALSE
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q14-ng" value="NG" />
                  <Label htmlFor="q14-ng" className="ml-2">
                    NG
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-4">SECTION 2</h2>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 15-20</h3>
          <div className="mb-4">
            <p>Complete the flowchart below.</p>
            <p>
              Choose <strong>ONE WORD ONLY</strong> from the text for each
              answer.
            </p>
            <p>
              Write your answers in <strong>boxes 15-20</strong> on your answer
              sheet.
            </p>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="font-bold mb-3 text-center">
              A day in the life of a care worker
            </h3>
            <Separator className="my-4" />

            <div className="space-y-6 text-center">
              <p>
                It's an early start for the first client. You may have to help
                the client get up and dressed if they have a <strong>15</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
                that makes this challenging.
              </p>
              <p>⬇</p>
              <p>
                The next task may be cooking breakfast and it's nice to have
                some <strong>16</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> at this
                time.
              </p>
              <p>⬇</p>
              <p>
                It may be a good idea to do some housework after this, such as{" "}
                <strong>17</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> and
                washing up.
              </p>
              <p>⬇</p>
              <p>
                You may then visit a second client and help them get a{" "}
                <strong>18</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> lunch
                ready.
              </p>
              <p>⬇</p>
              <p>
                Lunch may be followed by some <strong>19</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
              <p>⬇</p>
              <p>
                Afterwards, a third client may need help with an activity that
                involves going out of their home, such as doing their{" "}
                <strong>20</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
              <p>⬇</p>
              <p>
                You may cook dinner with the final client of the day and also
                remind them about their medication.
              </p>
            </div>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 21-27</h3>
          <div className="mb-4">
            <p>Complete the sentences below.</p>
            <p>
              Choose <strong>ONE WORD ONLY</strong> from the text for each
              answer.
            </p>
            <p>
              Write your answers in <strong>boxes 21-27</strong> on your answer
              sheet.
            </p>
          </div>

          <div className="space-y-4 mt-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>21</strong> People who cut down the hours they work gain
                most from feeling better physically and experiencing an
                increased sense of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>22</strong> It is important that those who work at desks
                avoid <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                by checking their chair, work surface and screen are in the best
                position.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>23</strong> Having targets to work towards is useful but
                they should be{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>24</strong> When there are many different tasks to do,
                the ability to{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> them is
                vital.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>25</strong> People who give up all treats in their
                personal time may find their{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                decreases.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>26</strong> It is wise to use the full amount of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                allowance every year.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>27</strong> Making time to do things with close
                companions, relatives or{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> is a
                great way to relax.
              </p>
            </div>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-4">SECTION 3</h2>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 28-31</h3>
          <div className="mb-4">
            <p>
              Choose the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
              <strong>C</strong> or <strong>D</strong>.
            </p>
            <p>
              Write the correct letter in <strong>boxes 28-31</strong> on your
              answer sheet.
            </p>
          </div>

          <div className="space-y-6 mt-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>28</strong> In the first paragraph, what does the writer
                say about Amsterdam?
              </p>
              <RadioGroup name="question28" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q28-a" value="A" />
                  <Label htmlFor="q28-a" className="ml-2">
                    Its 'Henry' programme was recommended to Leeds experts.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-b" value="B" />
                  <Label htmlFor="q28-b" className="ml-2">
                    It was the first world city to reduce obesity levels in
                    children.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-c" value="C" />
                  <Label htmlFor="q28-c" className="ml-2">
                    It has experienced more severe childhood obesity levels than
                    Leeds.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q28-d" value="D" />
                  <Label htmlFor="q28-d" className="ml-2">
                    Its pattern of success in cutting childhood obesity is like
                    that of Leeds.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>29</strong> How did Susan Jebb respond to the fall in
                childhood obesity among poorer children in Leeds?
              </p>
              <RadioGroup name="question29" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q29-a" value="A" />
                  <Label htmlFor="q29-a" className="ml-2">
                    She said she had expected it.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-b" value="B" />
                  <Label htmlFor="q29-b" className="ml-2">
                    She said she was amazed by the figures.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-c" value="C" />
                  <Label htmlFor="q29-c" className="ml-2">
                    She wanted to review some of her team's data.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q29-d" value="D" />
                  <Label htmlFor="q29-d" className="ml-2">
                    She felt some results were more interesting than others.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>30</strong> According to the writer, the NCMP data
                indicate that
              </p>
              <RadioGroup name="question30" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q30-a" value="A" />
                  <Label htmlFor="q30-a" className="ml-2">
                    children should be weighed more frequently.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-b" value="B" />
                  <Label htmlFor="q30-b" className="ml-2">
                    most primary school children need to lose weight.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-c" value="C" />
                  <Label htmlFor="q30-c" className="ml-2">
                    children from wealthy families have less weight to lose than
                    others.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q30-d" value="D" />
                  <Label htmlFor="q30-d" className="ml-2">
                    the youngest children show the highest levels of weight
                    loss.
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>31</strong> What links the 15 places listed in the third
                paragraph?
              </p>
              <RadioGroup name="question31" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q31-a" value="A" />
                  <Label htmlFor="q31-a" className="ml-2">
                    They are not representative of the country overall.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-b" value="B" />
                  <Label htmlFor="q31-b" className="ml-2">
                    They all joined the 'Henry' programme at the same time.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-c" value="C" />
                  <Label htmlFor="q31-c" className="ml-2">
                    Their childhood obesity levels have remained the same since
                    2009.
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q31-d" value="D" />
                  <Label htmlFor="q31-d" className="ml-2">
                    They are battling childhood obesity in a different way from
                    Leeds.
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 32-35</h3>
          <div className="mb-4">
            <p>
              Look at the following statements{" "}
              <strong>(Questions 32-35)</strong> and the list of people below.
            </p>
            <p>
              Match each statement with the correct person, <strong>A</strong>,{" "}
              <strong>B</strong>, <strong>C</strong> or <strong>D</strong>.
            </p>
            <p>
              Write the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
              <strong>C</strong> or <strong>D</strong>, in{" "}
              <strong>boxes 32-35</strong> on your answer sheet.
            </p>
            <p className="mt-2 italic">
              <em>NB You may use any letter more than once.</em>
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h4 className="font-bold mb-2">List of People</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 border rounded">
                <strong>A</strong> Susan Jebb
              </div>
              <div className="bg-white p-2 border rounded">
                <strong>B</strong> Kim Roberts
              </div>
              <div className="bg-white p-2 border rounded">
                <strong>C</strong> Janice Burberry
              </div>
              <div className="bg-white p-2 border rounded">
                <strong>D</strong> Seema Kennedy
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>32</strong> The aim in Leeds was to take steps to stop
                weight gain among children before it became a real problem.
              </p>
              <RadioGroup name="question32" className="flex gap-4">
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
                <div className="flex items-center">
                  <RadioGroupItem id="q32-d" value="D" />
                  <Label htmlFor="q32-d" className="ml-2">
                    D
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33</strong> Childhood obesity levels in Leeds have
                fallen consistently over a period of time.
              </p>
              <RadioGroup name="question33" className="flex gap-4">
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
                <div className="flex items-center">
                  <RadioGroupItem id="q33-d" value="D" />
                  <Label htmlFor="q33-d" className="ml-2">
                    D
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>34</strong> Something that simplifies the struggle to
                get children to eat well is very helpful to parents.
              </p>
              <RadioGroup name="question34" className="flex gap-4">
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
                <strong>35</strong> Parents in general are realistic about their
                potential to make changes to their children's lifestyle.
              </p>
              <RadioGroup name="question35" className="flex gap-4">
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
          </div>
        </div>{" "}
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 36-39</h3>
          <div className="mb-4">
            <p>Complete the summary below.</p>
            <p>
              Choose <strong>ONE WORD ONLY</strong> from the text for each
              answer.
            </p>
            <p>
              Write your answers in <strong>boxes 36-39</strong> on your answer
              sheet.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border mb-6">
            <h4 className="font-bold mb-2">The 'Henry' programme</h4>

            <p className="mb-4">
              'Henry' was used in Leeds from 2009 in the fight against childhood
              obesity. The programme focuses on situations such as mealtimes and
              bedtimes, and it encourages parents to set firm{" "}
              <strong>36</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> during
              these periods.
            </p>
            <p className="mb-4">
              According to Kim Roberts, 'Henry' aims to help people become more{" "}
              <strong>37</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> as
              parents. In this way, they do not instruct children to do things,
              nor give them total freedom of choice as in a <strong>38</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> parenting
              style. Instead, they allow children to make some decisions for
              themselves. This might be a choice of vegetable at the dinner
              table or a decision about where a <strong>39</strong>{" "}
              <Input type="text" className="w-32 mx-1 inline-block" /> should be
              enjoyed in the evening.
            </p>
            <p>
              Lisa, a parent who joined the programme, felt enthusiastic about
              her children's responses to it and the effect it had overall on
              her family.
            </p>
          </div>
        </div>
        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Question 40</h3>
          <div className="mb-4">
            <p>
              Choose the correct letter, <strong>A</strong>, <strong>B</strong>,{" "}
              <strong>C</strong> or <strong>D</strong>.
            </p>
            <p>
              Write the correct letter in <strong>box 40</strong> on your answer
              sheet.
            </p>
          </div>

          <div className="space-y-6 mt-4">
            <div className="question-item">
              <p className="mb-3">
                <strong>40</strong> Which title is the most suitable for the
                text?
              </p>
              <RadioGroup name="question40" className="space-y-2">
                <div className="flex items-center">
                  <RadioGroupItem id="q40-a" value="A" />
                  <Label htmlFor="q40-a" className="ml-2">
                    A look at what 'Henry' has achieved in Leeds
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-b" value="B" />
                  <Label htmlFor="q40-b" className="ml-2">
                    'Henry's the best,' according to Leeds children
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-c" value="C" />
                  <Label htmlFor="q40-c" className="ml-2">
                    Leeds parents discuss how 'Henry' has helped them
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q40-d" value="D" />
                  <Label htmlFor="q40-d" className="ml-2">
                    It's all about saying 'no', according to 'Henry'
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

export default Cambridge19GRTest2Questions;
