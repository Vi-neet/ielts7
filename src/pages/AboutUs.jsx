import { useState, useEffect } from "react";
import { Users, GraduationCap, Star, Trophy } from "lucide-react";

const AboutUs = () => {
  const [counts, setCounts] = useState({
    students: 0,
    success: 0,
    experience: 0,
    satisfaction: 0,
  });

  useEffect(() => {
    const targetCounts = {
      students: 7000,
      success: 95,
      experience: 10,
      satisfaction: 98,
    };

    const duration = 2000; // 2 seconds for the animation
    const steps = 50; // Number of steps in the animation
    const interval = duration / steps;

    const incrementCounts = (step) => {
      setCounts({
        students: Math.floor((targetCounts.students / steps) * step),
        success: Math.floor((targetCounts.success / steps) * step),
        experience: Math.floor((targetCounts.experience / steps) * step),
        satisfaction: Math.floor((targetCounts.satisfaction / steps) * step),
      });
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        incrementCounts(currentStep);
      } else {
        clearInterval(timer);
        // Set final values
        setCounts(targetCounts);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Our Story Section */}
      <section className="py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              Achieving an IELTS Band 7+ demonstrates a high level of English
              proficiency, often required for immigration, academics, or
              professional purposes. It reflects strong skills in listening,
              reading, writing, and speaking, enabling clear communication and
              comprehension of complex ideas. To reach this level, consistent
              practice, expanding vocabulary, taking mock tests, and seeking
              expert guidance are crucial.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We help aspirants with tailored preparation, ensuring success. A
              Band 7+ opens doors to global opportunities, symbolizing not just
              language mastery but also readiness for challenges in an
              English-speaking environment.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="/meenu-narula.webp"
              alt="IELTS Training"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {counts.students}+
            </div>
            <div className="text-gray-600">Students Trained</div>
          </div>
          <div className="text-center p-6">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {counts.success}%
            </div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-6">
            <GraduationCap className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {counts.experience}+
            </div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div className="text-center p-6">
            <Star className="w-12 h-12 mx-auto mb-4 text-blue-600" />
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {counts.satisfaction}%
            </div>
            <div className="text-gray-600">Student Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          What Our Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Note: Replace this with actual Google Reviews API integration */}
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              I had an amazing experience with them, they helped me get Canadian
              visitor’s visa for my family. I literally didn’t have to manage
              all the stuff required for visa procedure, they handled all the
              things efficiently and got me the visa for my parents. I recommend
              others to get their visa work done from them.
            </p>
            <div className="font-medium">Majot Singh</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Getting my desired band score in the first attempt seemed like an
              impossible task but ma’am made it possible for me. I’ll always be
              grateful for her unwavering support and guidance.
            </p>
            <div className="font-medium">Shreya Gupta</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              I am thrilled to share that I achieved a remarkable score in my
              IELTS exam, and I owe a significant part of this success to Meenu
              Ma’am . Her exceptional teaching skills, personalised guidance,
              and unwavering support played a pivotal role in my achievement.
            </p>
            <div className="font-medium">Jaskaran Singh</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              It was a good teaching experience and kind of one on one session
              with mam. By simply following mam’s instructions i have scored
              overall band score of 7.5 in my first attempt.
            </p>
            <div className="font-medium">Mandeep Singh</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Thank you IELTS 7+ house for your guidance and help throughout the
              visitor visa process for my sister. It was re application after
              she got refusal Meenu Ma’ams guidance and confidence during the
              entire process made it dream come true for me and my family. Where
              all the consultants denied and were not confident for my sister’s
              visitor visa with Meenu Ma’ams help we got it. Thank you IELTS 7+
              house and Meenu Ma’am.
            </p>
            <div className="font-medium">KRITIKA SAWHNEY</div>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              Thank you meenu mam for your guidance , support and interactive
              speaking sessions. With your continuous push towards smart
              learning helps me alot today in giving my speaking exam .
            </p>
            <div className="font-medium">Harpreet Kaur</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
