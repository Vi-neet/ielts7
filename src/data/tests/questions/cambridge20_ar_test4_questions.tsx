import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

/**
 * Component that displays the questions for Cambridge 20 Academic Reading Test 4
 */
export const Cambridge20ARTest4Questions: React.FC = () => {
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
            <h4 className="font-bold mb-2">
              The life and work of Georgia O'Keeffe
            </h4>

            <div className="question-item mb-4">
              <p className="mb-2">
                studied art, then worked as a <strong>1.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> in
                various places in the USA
              </p>
              <p className="mb-2">
                created drawings using <strong>2.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> which
                were exhibited in New York City
              </p>
              <p className="mb-2">
                moved to New York and became famous for her paintings of the
                city's <strong>3.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                produced a series of innovative close-up paintings of{" "}
                <strong>4.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />
              </p>
              <p className="mb-2">
                went to New Mexico and was initially inspired to paint the many{" "}
                <strong>5.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> that
                could be found there
              </p>
              <p className="mb-2">
                continued to paint various features that together formed the
                dramatic <strong>6.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> of New
                Mexico for over forty years
              </p>
              <p className="mb-2">
                travelled widely by plane in later years, and painted pictures
                of clouds and <strong>7.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> seen
                from above
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
              <strong>TRUE</strong> – if the statement agrees with the
              information
            </p>
            <p className="mb-1">
              <strong>FALSE</strong> – if the statement contradicts the
              information
            </p>
            <p className="mb-1">
              <strong>NOT GIVEN</strong> – if there is no information on this
            </p>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>8.</strong> Georgia O'Keeffe's style was greatly
                influenced by the changing fashions in art over the seven
                decades of her career.
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
                <strong>9.</strong> When O'Keeffe finished high school, she had
                already made her mind up about the career that she wanted.
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
                <strong>10.</strong> Alfred Stieglitz first discovered
                O'Keeffe's work when she sent some abstract drawings to his
                gallery in New York City.
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
                <strong>11.</strong> O'Keeffe was the subject of Stieglitz's
                photographic work for many years.
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
                <strong>12.</strong> O'Keeffe's paintings of the patio of her
                house in Abiquiú were among the artist's favourite works.
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
                <strong>13.</strong> O'Keeffe produced a greater quantity of
                work during the 1950s to 1970s than at any other time in her
                life
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
          <h3 className="font-bold mb-2">Questions 14–17</h3>
          <p className="mb-2">Reading Passage 2 has six paragraphs, A–F.</p>
          <p className="mb-4">
            Which paragraph contains the following information?
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>14.</strong> how a type of plant functions as a natural
                protection for coastlines
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
                <strong>15.</strong> a prediction about how long it could take
                to stop noticing the effects of climate change
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
                <strong>16.</strong> a reference to the fact that a solution is
                particularly cost-effective
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

            <div className="question-item">
              <p className="mb-3">
                <strong>17.</strong> a mention of a technology used to locate
                areas most in need of intervention
              </p>
              <RadioGroup name="question17" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F"].map((letter) => (
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
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 18–22</h3>
          <p className="mb-2">Complete the sentences below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="space-y-4">
            <div className="question-item">
              <p className="mb-2">
                <strong>18.</strong> The stormwater-management programme in
                Miami Beach has involved the installation of efficient{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>19.</strong> The construction of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> was the
                first stage of a project to ensure the success of mangroves in
                Indonesia.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>20.</strong> As a response to rising floodwaters in the
                Mekong Delta, a not-for-profit organisation has been building
                houses that can{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>21.</strong> Rising sea levels in Bangladesh have made
                it necessary to introduce various{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> that
                are suitable for areas of high salt content.
              </p>
            </div>

            <div className="question-item">
              <p className="mb-2">
                <strong>22.</strong> A project in LA has increased the number of{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> on the
                city's streets.
              </p>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 23–26</h3>
          <p className="mb-2">
            Look at the following statements (Questions 23–26) and the list of
            people below.
          </p>
          <p className="mb-4">
            Match each statement with the correct person, A–E.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of People</h4>
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> Yanira Pineda
              </p>
              <p>
                <strong>B.</strong> Susanna Tol
              </p>
              <p>
                <strong>C.</strong> Elizabeth English
              </p>
              <p>
                <strong>D.</strong> Raisa Chowdhury
              </p>
              <p>
                <strong>E.</strong> Greg Spotts
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>23.</strong> It is essential to adopt strategies which
                involve and help residents of the region.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q23-d" value="D" />
                  <Label htmlFor="q23-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q23-e" value="E" />
                  <Label htmlFor="q23-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>24.</strong> Interventions which reduce heat are
                absolutely vital for our survival in this location.
              </p>
              <RadioGroup name="question24" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q24-a" value="A" />
                  <Label htmlFor="q24-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-b" value="B" />
                  <Label htmlFor="q24-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-c" value="C" />
                  <Label htmlFor="q24-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-d" value="D" />
                  <Label htmlFor="q24-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q24-e" value="E" />
                  <Label htmlFor="q24-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>25.</strong> More work will need to be done in future
                decades to deal with the impact of rising water levels.
              </p>
              <RadioGroup name="question25" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q25-a" value="A" />
                  <Label htmlFor="q25-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q25-b" value="B" />
                  <Label htmlFor="q25-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q25-c" value="C" />
                  <Label htmlFor="q25-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q25-d" value="D" />
                  <Label htmlFor="q25-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q25-e" value="E" />
                  <Label htmlFor="q25-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>26.</strong> The number of locations requiring action to
                adapt to flooding has grown in recent years.
              </p>
              <RadioGroup name="question26" className="flex gap-8">
                <div className="flex items-center">
                  <RadioGroupItem id="q26-a" value="A" />
                  <Label htmlFor="q26-a" className="ml-2">
                    A
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q26-b" value="B" />
                  <Label htmlFor="q26-b" className="ml-2">
                    B
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q26-c" value="C" />
                  <Label htmlFor="q26-c" className="ml-2">
                    C
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q26-d" value="D" />
                  <Label htmlFor="q26-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q26-e" value="E" />
                  <Label htmlFor="q26-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 mt-10">
          READING PASSAGE 3: Questions 27-40
        </h2>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 27–31</h3>
          <p className="mb-2">Reading Passage 3 has seven paragraphs, A–G.</p>
          <p className="mb-2">
            Which paragraph contains the following information?
          </p>
          <p className="mb-4">
            <strong>NB</strong> You may use any letter more than once.
          </p>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>27.</strong> an example of how one predator has been
                protected by the introduction of livestock guard dogs
              </p>
              <RadioGroup name="question27" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q27-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q27-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q27-${letter.toLowerCase()}`}
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
                <strong>28.</strong> an optimistic suggestion about the possible
                positive developments in the use of livestock guard dogs
              </p>
              <RadioGroup name="question28" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q28-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q28-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q28-${letter.toLowerCase()}`}
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
                <strong>29.</strong> a description of how the methods used by
                livestock guard dogs help to keep predators away
              </p>
              <RadioGroup name="question29" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q29-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q29-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q29-${letter.toLowerCase()}`}
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
                <strong>30.</strong> claims by different academics that the use
                of livestock guard dogs is a successful way of protecting
                farmers' herds
              </p>
              <RadioGroup name="question30" className="flex flex-wrap gap-4">
                {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                  <div
                    className="flex items-center"
                    key={`q30-${letter.toLowerCase()}`}
                  >
                    <RadioGroupItem
                      id={`q30-${letter.toLowerCase()}`}
                      value={letter}
                    />
                    <Label
                      htmlFor={`q30-${letter.toLowerCase()}`}
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
                <strong>31.</strong> a reference to how livestock guard dogs
                gain their skills
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
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 32–36</h3>
          <p className="mb-2">
            Look at the following statements (Questions 32–36) and the list of
            people below.
          </p>
          <p className="mb-4">
            Match each statement with the correct person, A–E.
          </p>

          <div className="mb-4">
            <h4 className="font-bold mb-2">List of People</h4>
            <div className="grid grid-cols-1 gap-2">
              <p>
                <strong>A.</strong> Dan Macon
              </p>
              <p>
                <strong>B.</strong> Silvia Ribeiro
              </p>
              <p>
                <strong>C.</strong> Linda van Bommel
              </p>
              <p>
                <strong>D.</strong> Julie Young
              </p>
              <p>
                <strong>E.</strong> Bethany Smith
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="question-item">
              <p className="mb-3">
                <strong>32.</strong> The use of guard dogs may save the lives of
                both livestock and wild animals.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q32-d" value="D" />
                  <Label htmlFor="q32-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q32-e" value="E" />
                  <Label htmlFor="q32-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>33.</strong> Claims of a change in behaviour from those
                using livestock guard dogs may not be totally accurate.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q33-d" value="D" />
                  <Label htmlFor="q33-d" className="ml-2">
                    D
                  </Label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem id="q33-e" value="E" />
                  <Label htmlFor="q33-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>34.</strong> There may be negative results if the use of
                livestock guard dogs is not sufficiently widespread.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q34-e" value="E" />
                  <Label htmlFor="q34-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>35.</strong> Livestock guard dogs are the best way of
                protecting farm animals, as long as the dogs are appropriately
                handled.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q35-e" value="E" />
                  <Label htmlFor="q35-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="question-item">
              <p className="mb-3">
                <strong>36.</strong> Teaching a livestock guard dog how to do
                its work needs a different focus from teaching a house guard
                dog.
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
                <div className="flex items-center">
                  <RadioGroupItem id="q36-e" value="E" />
                  <Label htmlFor="q36-e" className="ml-2">
                    E
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>

        <div className="question-set mb-8">
          <h3 className="font-bold mb-2">Questions 37–40</h3>
          <p className="mb-2">Complete the summary below.</p>
          <p className="mb-4">
            Choose <strong>ONE WORD ONLY</strong> from the passage for each
            answer.
          </p>

          <div className="mb-6">
            <h4 className="font-bold mb-2">
              Unintended ecological effects of using guard dogs
            </h4>
            <div className="question-item mb-4">
              <p className="mb-2">
                In Namibia, livestock guard dogs have been used to protect
                domestic animals from attacks by cheetahs. This has led to a
                rise in the deaths of other predators, particularly{" "}
                <strong>37.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />. In
                addition, it has been suggested that the dogs could have{" "}
                <strong>38.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" /> which
                may affect other species, and that they may reduce the amount of{" "}
                <strong>39.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />{" "}
                available to certain wild animals. On the other hand, these dogs
                may help birds by protecting their nests. These might otherwise
                be threatened by predators such as <strong>40.</strong>{" "}
                <Input type="text" className="w-32 mx-1 inline-block" />.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cambridge20ARTest4Questions;
