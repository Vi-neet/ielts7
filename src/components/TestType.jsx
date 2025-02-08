import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const TestType = () => {
  const { type, plan } = useParams();
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(tests)
  const getCardStyles = () => {
    switch (type) {
      case "general_reading":
        return {
          border: "border-red-500",
          hover: "hover:bg-red-50",
          shadow: "hover:shadow-red-100",
        };
      case "listening":
        return {
          border: "border-blue-500",
          hover: "hover:bg-blue-50",
          shadow: "hover:shadow-blue-100",
        };
      case "academic_reading":
        return {
          border: "border-amber-800",
          hover: "hover:bg-amber-50",
          shadow: "hover:shadow-amber-100",
        };
      default:
        return {
          border: "border-gray-200",
          hover: "hover:bg-gray-50",
          shadow: "hover:shadow-gray-100",
        };
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const years = ["19", "18", "17", "16", "15", "14", "13"];
        const allTests = [];

        for (const year of years) {
          const collectionName = `cambridge_${year}_${type}`;
          const querySnapshot = await getDocs(collection(db, collectionName));
          
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            
            // Process each test and its corresponding question
            for (let i = 1; i <= 4; i++) {
              const testKey = `test_${i}`;
              const questionKey = `question_${i}`;
              
              if (data[testKey] && data[questionKey]) {
                allTests.push({
                  id: doc.id, // Capture the Firestore document ID
                  year,
                  testNumber: testKey,
                  title: `Cambridge ${year} ${type.replace("_", " ")} - Test ${i}`,
                  test: data[testKey],
                  questions: data[questionKey],
                });
              }
            }
            
          });
        }

        // Sort tests by year (descending) and test number
        const sortedTests = allTests.sort((a, b) => {
          if (a.year !== b.year) {
            return b.year - a.year;
          }
          return a.testNumber.localeCompare(b.testNumber);
        });

        setTests(sortedTests);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching tests:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTests();
  }, [type]);


  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  const styles = getCardStyles();

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {type.replace("_", " ")} - {plan} Tests
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test, index) => (
          <div
            key={index}
            onClick={() => navigate("/test-page", { 
              state: { 
                id: test.id, // Firestore document ID
                test: test.test,
                questions: test.questions,
                type,
                title: test.title,
                testNumber: parseInt(test.testNumber.replace("test_", ""), 10) // Extracting the number from testNumber
              }
            })}
            
            className={`
              bg-white p-6 rounded-lg cursor-pointer
              transform transition-all duration-200
              border-2 ${styles.border}
              ${styles.hover}
              hover:scale-105
              shadow-lg ${styles.shadow}
            `}
          >
            <h2 className="text-lg font-semibold mb-3">{test.title}</h2>
            <p className="text-gray-600">
              {type === "listening"
                ? "Click to play audio"
                : "Click to view content"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestType;