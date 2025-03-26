import { useState, useEffect } from "react";

const WatchAndLearn = () => {
  const [activeTab, setActiveTab] = useState("videos");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState(null);

  // Generate unique animation keyframes for floating elements
  const generateKeyframes = () => {
    let styles = "";
    for (let i = 0; i < 12; i++) {
      const x1 = Math.random() * 20 - 10;
      const y1 = Math.random() * 20 - 10;
      const x2 = Math.random() * 20 - 10;
      const y2 = Math.random() * 20 - 10;

      styles += `
        @keyframes float-${i} {
          0% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
          50% { transform: translate(calc(-50% + ${x2}px), calc(-50% + ${y2}px)) rotate(${
        Math.random() * 360
      }deg); }
          100% { transform: translate(calc(-50% + ${x1}px), calc(-50% + ${y1}px)) rotate(${
        Math.random() * 360
      }deg); }
        }
        
        @keyframes pulse-${i} {
          0% { opacity: ${0.1 + Math.random() * 0.2}; }
          100% { opacity: ${0.2 + Math.random() * 0.3}; }
        }
      `;
    }
    return styles;
  };

  useEffect(() => {
    setIsVisible(true);

    // Add keyframes to document
    const style = document.createElement("style");
    style.textContent = generateKeyframes();
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const videos = [
    {
      id: 1,
      title: "IELTS || Essential Tips for Success!",
      description: "Learn the fundamentals of scoring high in the IELTS exam",
      videoId: "XZkDb4rLSp0",
    },
    {
      id: 2,
      title: "Mastering Speaking Skills",
      description:
        "Essential tips and techniques for Ielts Speaking excellence",
      videoId: "3aBQYrkKZUE",
    },
    {
      id: 3,
      title: "Mastering Ielts Writing",
      description: "Learn the essentials of Ielts Writing and score high",
      videoId: "UAVsXoCnZMc",
    },
    {
      id: 4,
      title: "A FREE listening test",
      description: "Practice your listening skills with this free test",
      videoId: "nx8req42cj8",
    },
  ];

  const essays = [
    {
      id: 1,
      title: "IELTS Bar Chart Sample Answer",
      content:
        "he chart illustrates the amount of money spent on five consumer goods (cars, computers, books, perfume and cameras) in France and the UK in 2010. Units are measured in pounds sterling.Overall, the UK spent more money on consumer goods than France in the period gi...",
      fullContent: `The chart illustrates the amount of money spent on five consumer goods (cars, computers, books, perfume and cameras) in France and the UK in 2010. Units are measured in pounds sterling.<br/><br/>

Overall, the UK spent more money on consumer goods than France in the period given. Both the British and the French spent most of their money on cars whereas the least amount of money was spent on perfume in the UK compared to cameras in France. Furthermore, the most significant difference in expenditure between the two countries was on cameras.<br/><br/>

In terms of cars, people in the UK spent about £450,000 on this as opposed to the French at £400,000. Similarly, the British expenditure was higher on books than the French (around £400,000 and £300,000 respectively). In the UK, expenditure on cameras (just over £350,000) was over double that of France, which was only £150,000.<br/>

<br/>On the other hand, the amount of money paid out on the remaining goods was higher in France. Above £350,000 was spent by the French on computers which was slightly more than the British who spent exactly £350,000. Neither of the countries spent much on perfume which accounted for £200,000 of expenditure in France but under £150,000 in the UK.`,
      image: "/essay-1.png",
    },
    {
      id: 2,
      title: "IELTS Table Model Answer 2",
      content:
        "The table illustrates the proportion of consumer expenditure in Ireland, Italy, Spain, Sweden and Turkey on three types of consumer goods in 200...",
      fullContent: `The table illustrates the proportion of consumer expenditure in Ireland, Italy, Spain, Sweden and Turkey on three types of consumer goods in 2002.<br/><br/>

Overall, the category of consumer goods that all countries spent most on was food, drinks and tobacco, which was three times higher than on the other types of goods. The lowest spending could be seen in the category of leisure and education in all five countries. The outlay of Turkey was generally higher than the other four countries.<br/><br/>

In terms of food, drinks and tobacco, Turkey spent the most at 32.14%. The expenditure of Ireland was also high (28.91%) compared to Sweden which spent the least (15.77%). Spain and Italy spent 18.80% and 16.36% respectively. On the other hand, the lowest expenditure was on leisure and education which accounted for under 5% in all countries. Turkey spent most on these items at just 4.35% of their national expenditure which is around double that of Spain (1.98%).<br/><br/>

Clothing and footwear was the third category of consumer goods and outlays for those items were between 9% in Italy and 5.40% in Sweden.  The national spending in this area for the remaining countries averaged around 6.5%.`,
      image: "/essay-2.png",
    },
    {
      id: 3,
      title: "Pie Chart Sample Answer",
      content:
        "The two pie charts illustrate the proportion of five sources of energy production (co...",
      fullContent: `The two pie charts illustrate the proportion of five sources of energy production (coal, gas, nuclear, petrol and other sources) in France in two years (1995 and 2005). <br/><br/>

Overall, in both years coal and gas accounted for over half of all energy production, while the least was other energy sources. There was only a very minimal increase in production from gas and coal, whereas nuclear and other sources almost doubled. Petrol was the only energy source to decrease over the period.<br/><br/>

Energy produced by coal comprised of 29.80% in 1995 and by 2005, it increased by about 1% to 30.9%. Likewise, the amount of energy generated by gas went up by approximately 1% from 29.63% in the first year to 30.1% by the final year. The use of nuclear power rose significantly from 6.40% in 1995 to 10.10% in 2005. Other sources of energy production accounted for 4.90% but then climbed to 9.10%.<br/><br/>

Petrol, on the other hand, produced 29.27% of all energy in 1995 but 10 years later only 19.55% of energy came from this source. `,
      image: "/essay-3.png",
    },
    {
      id: 4,
      title: "Essay 4",
      content:
        "Nowadays young people lack an understanding of how to manage their finances after they finish high school...",
      fullContent: `Nowadays young people lack an understanding of how to manage their finances after they finish high school. Explain why they do not know how to manage money and how this can be changed. 
<br/><br/>
Below is an IELTS cause / solution model essay.

Many young people are leaving school without a basic and vital understanding of how personal finances ought to be managed in the adult world. This lack of knowledge is due to a lack of life experience and limited education which can be solved in two simple ways.
<br/><br/>

One main reason why so many young people are unable to manage their own finances upon finishing high school is that they have been living with their parents for free. As a result, they have never needed to earn a salary or save their money in order to pay bills. Another cause is that schools do not factor personal financial management into their curriculum. Schools focus instead on classic subjects, such as maths, geography, history and languages, which means important life skills are not being taught. Both teachers and parents are failing to prepare young people for the real world.
<br/><br/>

There are two options for solving young people's inability to manage personal finances, Firstly, parents should spend time with their children teaching them how money is earned, budgeted and used for either savings or expenses. One simple step could be for parents to start by teaching young children how to manage their pocket money and, as their child grows up, expand into more serious household expenses, Secondly, schools should incorporate life skills into their curriculum for final year students. In this way, children will be able to leam in a supportive environment how their finances need to be budgeted and managed to avoid debt problems later in life.
<br/><br/>

In conclusion, young people lack financial management skills due to the negligence of parents and schools, which can only be solved if both take more responsibility for equipping school leavers with the right skills.`,
    },
    {
      id: 5,
      title: "ADVANTAGE DISADVANTAGE ESSAY",
      content:
        "Some people think that it is beneficial for children to do paid work, while others think that it can; be harmful for children.Do you think the advantages outweigh the disadvantages?",
      fullContent: `
Some people think that it is beneficial for children to do paid work, while others think that it can; be harmful for children.
Do you think the advantages outweigh the disadvantages?<br/><br/>


Although paid work is thought by some to be a good experience for children, other people think that it can be detrimental. In my opinion, I consider that paid work can bring about more advantages for children compared to any problems it might bring.
<br/><br/>

Despite the drawbacks below, I believe the benefits gained by children doing work experience are extremely useful for their future. One benefit is that children can develop an understanding of the value of money. This is a crucial lesson to learn as it teaches them not to waste money by realising the amount of work needed to earn it.Another positive aspect is that children take their first steps in leaming how to save and manage money. Take many older children, for instance, who have a part time job in order to save up for something they would otherwise be unable to afford. Leaming money management is an essential skill later in life when they earn salaries and have bills, to pay.
<br/><br/>

Admittedly, there are some issues involved when children do paid work. One problem is that it might expose them to exploitation through slave labour. For example, in some developing countries children are made to work full time but due to their age are not protected by law. However, this situation is rare, only happening in certain countries. Another negative aspect is that the time children spend working could prevent them from focusing on their school work. Having a good education is the key to a successful future so if work interferes with their agademic performance this can be a problem.
<br/><br/>

In conclusion, the critical lessons that children can learn when they work for money will stand them in good stead when they are adults and clearly outweigh any disadvantages. <br/><br/>
`,
    },
    {
      id: 6,
      title: "DISCUSSION ESSAY",
      content:
        "Some people think that children should be taught to be competitive in school. Others, however, say that cooperation and team working skills are more important. Discuss both sides and give your opinion",
      fullContent: `

Some people think that children should be taught to be competitive in school. Others, however, say that cooperation and team working skills are more important. Discuss both sides and give your opinion.
<br/><br/>

Although it is sometimes thought that schools ought to teach children to compete, other people believe that the focus should be on cooperation. In my opinion, I consider that competition helps children learn the most important skills for their future life.
<br/><br/>

On the one hand, some people think that children who learn to compete against each other often do better in school and I agree. In other words, the competition between students motivates them to excel in their studies or tasks which consequently produces better academic performance and resuits. For example, students generally apply themselves and work harder when they are in direct competition with their classmates. Furthermore, being driven to achieve the best is vital in order to succeed later in life when, as adults, they must compete against others in the job market.
<br/><br/>

On the other hand, it is often believed that it is better if the emphasis at school is on cooperating with others. As people we do not live, work or socialise apart from others, so leaming how to work alongside other people ought to be taught from childhood. Without these skills, children would lack the ability to communicate with each other or know how to deal with confrontations and conflicts in a constructive way. Another reason why team skills are useful for children is that they learn how to negotiate with others to complete a task. This is an essential skill to learn for their future life.
<br/><br/>

In conclusion, while people may vary in their opinions, I think that children stand a better chance to succeed both in school and later in life if they are encouraged to compete against each other.`,
    },
    {
      id: 7,
      title: "AGREE DISAGREE ESSAY ",
      content:
        "Nowadays, more people are choosing to socialise online rather than face to face. Is this a pesitive or negative development?",
      fullContent: `

Nowadays, more people are choosing to socialise online rather than face to face. Is this a pesitive or negative development?
<br/><br/>

IELTS Model Essay: Positive or Negative Development?<br/><br/>


An increasing number of people meet and talk to their friends online instead of in person, In my opinion, this is a negative development which can lead to isolation, potentially harmful situations and also problems later on in life.
<br/><br/>

One serious problem that can arise from people socialising online is that it can lead to isolation. Before the internet, people ivould frequently go out to meet friends, for example in cafes, bars or restaurants, whereas now people prefer to stay at home alone, chatting online. As a result, people are starting to spend the majority of their time alone at home in their room without meeting others. Isolation of this kind is nơi heathy anu can sometimes lead to depression and other issues.
<br/><br/>

Another issue is that meeting people online can be risky. In other words, people can assume fake identities online as well as hide their true characteristics. This is particularly conceming for teenagers who are impressionable and can easily be led into dangerous situations. Furthermore, as this interaction is online, parents have no way of monitoring it and protecting their children.
<br/><br/>

Finally, socialising online can end in difficulties years later as conversations and shared photos that had been forgotten reappear. This situation is currently critical for many people, again especially for teenagers who do not think carefully before posting online. That is to say, information which is put online can remain there forever and while people may share intimate communications with close friends, these words can then resurface later on leading to much embarrassment.
<br/><br/>

I conclusion , although it has become more popular for people to socialise through Ee mternet, it has brought about too many problems for this to be considered a positive trend.`,
    },
    {
      id: 8,
      title: "DOUBLE QUESTION ESSAY ",
      content:
        "In some parts of the world it is becoming popular to research the history of one's own family. Why might people want to do this? Is it a positive or negative development?",
      fullContent: `

In some parts of the world it is becoming popular to research the history of one's own family. Why might people want to do this? Is it a positive or negative development?
<br/><br/>

Exploring one's family background and history is becoming increasingly popular in numerous countries around the world. In my opinion, through research and knowing more about one's family, people can see common trends passed through generations and useful information which can only be seen as beneficial for people's future.
<br/><br/>

One main reason is that some people look into their family history in order to discover any common trends with family members of a previous generation. This can be especially so with people who have particular skills, gifts or interests in uncommon fields. In other words, assome gifts and skills are hereditary, it can be interesting for people to learn how midly others in their family shared these talents from previous generations.
<br/><br/>

Another reason for the popularity of finding out about one's family history is often due to general curiosity of one's geographical origins. That is to say, some families moved abroad, away from their own country, generations ago which resulted in them losing their original culture and adopting the culture of the country they moved to. Therefore, through research, people can learn more about their country of origin and understand more about the culture that their family originally came from.
<br/><br/>

Finally, the trend of researching family history is certainly beneficial and can help people find their place in the world. Some people feel a lack of direction in life or are dislocated from others but by learning more about their past family history, it can help them relate to the world and feel more comfortable about who they are.Take, for example, a person who feels nervous about making a certain choice in life, they may feel comforted by knowing that others in their family made the same choice many generations ago.
<br/><br/>

In conclusion, it can be advantageous for people to learn more about the family's background and origins. It would be useful for children to learn about their own family history, if this was incorporated into the school curriculum.`,
    },
    {
      id: 9,
      title: "WRITING TASK 1(Formal letter)",
      content: `You should spend about 20 minutes on this task.

You were hurt in a small accident in a store last week. Write a letter to the store manager. In your letter:
* introduce yourself
* describe what happened
* say what action you would like the manager to take
`,
      fullContent: `

You should spend about 20 minutes on this task.

You were hurt in a small accident in a store last week. Write a letter to the store manager. In your letter:<br/><br/>

* introduce yourself<br/>
* describe what happened<br/>
* say what action you would like the manager to take<br/>

Write at least 150 words.<br/>
You do NOT need to write any addresses.

Begin your letter as follows<br/>

Dear Sir or Madam,<br/>

SAMPLE ANSWER<br/>

Dear Sir or Madam,<br/>

I am writing to bring to your attention an incident that occurred in your supermarket last weekend. I would also like to make some suggestions so that such a thing does not happen again.

My name is Harry  and I have been a loyal customer at your Walmart  on Grange Road ever since I moved into the area eight years ago. Although your store is slightly further from my home than the IGA, I have always made the trip because of your quality fresh produce and excellent customer service.

On this occasion, however, I suffered an unfortunate accident due, I believe, to the negligence of the shop floor staff. As I was walking to the checkout with my groceries, I slipped on some spilled water and fell over, spraining my wrist in the process.

Though I understand the store gets very busy, I feel that this fall could have been avoided if the staff had been quicker to act. I would therefore like to suggest that you review your policies around spillages, and, in particular, ensure that staff members stand guard next to any spilled liquids until they have been cleaned up.

I hope you will take this into account in order to avoid further mishaps.

Yours faithfully ,
Harry Singh`,
    },
    {
      id: 10,
      title: "WRITING TASK 1(informal letter)",
      content:
        "You should spend about 20 minutes on this task.You made plans to have dinner with a friend, but you were unable to go as promised. Write an apology letter to your friend and say",
      fullContent: `

You should spend about 20 minutes on this task.<br/>

You made plans to have dinner with a friend, but you were unable to go as promised. Write an apology letter to your friend and say<br/>

• why couldn't you make it<br/>
• how you tried to reach him/her<br/>
• how you will make up for it another time.<br/>

Write at least 150 words.<br/>
You do NOT need to write any addresses.

Hi Jill,<br/>

Hope you're well. I'm just writing to apologise again for standing you up last week!<br/>

As I mentioned in my text, I got called into an urgent meeting at work that I couldn't get out of. I was watching the clock as it got closer and closer to our dinner reservation time, and I should've just popped out to give you a call. I wish I had now.The boss was having a big rant though, so I felt like I couldn't leave without creating a scene.

I sent you that text quickly from inside the meeting, which is why it was so short and probably sounded a bit rude. I should've called you, I know, but I hope you can understand the sticky spot I was in, especially as l'm so new in the company. I feel awful!

Anyway, l'd love to make it up to you if you're not too mad still. How about we go out for dinner and see that new Bond movie next Thursday? I've got the whole day off, so there's no chance of getting stuck in a meeting!

So sorry again and hope we can catch up next week. Let me know if that suits you.

Warm wishes,
Harry`,
    },
    {
      id: 11,
      title: "WRITING TASK 1 (Semiformal latter)",
      content: `Write a letter to your boss apologising for the recent meeting you missed at work.
•Apologise for missing the meeting. 
•Explain what happened. 
•Say what you will do to compensate. 
`,
      fullContent: `WRITING TASK 1 (Semiformal latter)

Write a letter to your boss apologising for the recent meeting you missed at work.<br/>
•Apologise for missing the meeting.<br/>
•Explain what happened.<br/>
•Say what you will do to compensate.<br/>

Model Answer for an IELTS <br/>

Dear Mr Patel,<br/>

I am writing to apologise for the meeting I missed on October 20th about development plans for the company.

I am sincerely sorry for not being able to attend this meeting. I am aware of the importance of the meeting but, unfortunately, my absence was unavoidable.

The reason for not attending this meeting was that I had a car accident on the way to work that day. Although the accident was not serious, I was taken to hospital for a check up and not alloyed to leave until I had been given the all clear from a doctor.

I understand how crucial this meeting was and, therefore, I have asked one of my colleagues, Sandra Brown, to review the meeting with me after work today. We will go over all development plans and also people's roles and responsibilities. By the end of today, I will be up to speed with all plans.

I hope you will forgive my absence and be assured of my commitment to this company and its future .

Yours sincerely,
Rich Broth

`,
    },
    {
      id: 12,
      title: "Map Comparison Model Answer",
      content:
        "The three maps illustrate how Meadowside village and Fonton, which is a nearby town, have developed from 1962 to the present...",
      fullContent: `

The three maps illustrate how Meadowside village and Fonton, which is a nearby town, have developed from 1962 to the present.<br/>

Overall, both Fonton and Meadowside village increased in size over the years until they eventually merged together, at which point Meadowside became a suburb. Furthermore, there have been significant changes to infrastructure, housing and facilities over the period given.
<br/><br/>
In 1962, both Meadowside and Fonton were completely separate with no roads or rail connecting them. While Fonton had a railway line running to the north, Meadowside, located to the west of Fonton, only had a small road from the west.
<br/><br/>
By 1985, Meadowside had expanded and the small road had become a main road. A further main road had been built to connect the village to Fonton. Within Meadowside, a superstore, leisure complex and housing estate had been developed. By this time, Fonton had also grown in size.
<br/><br/>
Currently, Meadowside is known as Meadowside Suburbs after joining with Fonton.
<br/><br/>
Between both places, a hotel, station and business park have been built on either side of the railway line`,
    },
  ];

  const handleBackToEssays = () => {
    setSelectedEssay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .nav-button {
          position: relative;
          z-index: 1;
        }

        .nav-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 9999px;
          padding: 2px;
          background: linear-gradient(
            to right,
            #cc0d09,
            #d56e1f,
            #8B4513,
            #cc0d09
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 300% 300%;
          animation: gradientBorder 8s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .nav-button:hover::before {
          opacity: 1;
        }

        .nav-button.active::before {
          opacity: 0;
        }
      `}</style>

      {/* Hero Section - Full Width */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] min-h-[50vh] w-full">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/10"></div>
          {/* Animated geometric patterns */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  width: Math.random() * 200 + 100 + "px",
                  height: Math.random() * 200 + 100 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  transform: `translate(-50%, -50%) rotate(${
                    Math.random() * 360
                  }deg)`,
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  animation: `float-${i} ${
                    Math.random() * 20 + 10
                  }s infinite ease-in-out`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `pulse-${i} ${
                      Math.random() * 4 + 2
                    }s infinite ease-in-out alternate`,
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`py-20 text-center transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold text-white mb-6">
                Free Learning
                <span className="block mt-2 text-7xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Resources
                </span>
              </h1>
              <div className="absolute -left-4 -top-4 w-20 h-20 border-2 border-white/20 rounded-lg transform rotate-12"></div>
              <div className="absolute -right-4 -bottom-4 w-20 h-20 border-2 border-white/20 rounded-lg transform -rotate-12"></div>
            </div>
            <p className="text-white/90 text-xl max-w-2xl mx-auto mt-6">
              Access our comprehensive collection of educational videos and
              sample essays to enhance your academic writing skills.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Navigation Tabs - Only show when no essay is selected */}
        {!selectedEssay && (
          <div className="flex justify-center mb-12">
            <div className="relative group p-1 rounded-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative flex space-x-4 bg-white rounded-full shadow-md p-1">
                <button
                  onClick={() => setActiveTab("videos")}
                  className={`nav-button px-8 py-3 rounded-full transition-all ${
                    activeTab === "videos"
                      ? "bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] text-white active"
                      : "text-gray-600 hover:text-[#d56e1f]"
                  }`}
                >
                  Videos
                </button>
                <button
                  onClick={() => setActiveTab("essays")}
                  className={`nav-button px-8 py-3 rounded-full transition-all ${
                    activeTab === "essays"
                      ? "bg-gradient-to-r from-[#cc0d09] via-[#d56e1f] to-[#8B4513] text-white active"
                      : "text-gray-600 hover:text-[#d56e1f]"
                  }`}
                >
                  Essays
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {!selectedEssay ? (
          <>
            {activeTab === "videos" ? (
              <div className="space-y-16">
                {videos.map((video, index) => (
                  <div
                    key={video.id}
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } items-center gap-8 md:gap-16`}
                  >
                    <div className="w-full md:w-1/2 relative">
                      <div className="aspect-video w-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          className="w-full h-full rounded-lg shadow-lg video-container"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 text-center md:text-left">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {video.title}
                      </h2>
                      <p className="text-gray-600 mb-6">{video.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {essays.map((essay) => (
                  <div
                    key={essay.id}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {essay.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{essay.content}</p>
                    <button
                      onClick={() => setSelectedEssay(essay)}
                      className="text-[#d56e1f] font-medium hover:text-[#cc0d09] transition-colors"
                    >
                      Read More →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          // Full Essay View
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <button
              onClick={handleBackToEssays}
              className="text-blue-500 hover:underline mb-6 flex items-center"
            >
              ← Back to Essays
            </button>

            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {selectedEssay.title}
            </h1>

            <div className="mb-8">
              <img
                src={selectedEssay.image}
                alt={selectedEssay.title}
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: selectedEssay.fullContent }}
            >
              {/* <p>{selectedEssay.fullContent}</p> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchAndLearn;
