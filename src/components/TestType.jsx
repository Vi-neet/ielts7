// src/components/Test/TestType.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const firebaseConfig = {
  apiKey: "AIzaSyCZYhTYOL0iBmueYBPL_JrMxJZ5oZCV9_Y",
  authDomain: "ielts7-48b25.firebaseapp.com",
  databaseURL: "https://ielts7-48b25-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ielts7-48b25",
  storageBucket: "ielts7-48b25.firebasestorage.app",
  messagingSenderId: "473076954049",
  appId: "1:473076954049:web:086f7fa5af71a045c57540",
  measurementId: "G-9C0BGHDPFG",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TestType = () => {
  const { type, plan } = useParams();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const getCardStyles = () => {
    switch (type) {
      case "general_reading":
        return {
          border: "border-red-500",
          hover: "hover:bg-red-50",
          shadow: "hover:shadow-red-100"
        };
      case "listening":
        return {
          border: "border-blue-500",
          hover: "hover:bg-blue-50",
          shadow: "hover:shadow-blue-100"
        };
      case "academic_reading":
        return {
          border: "border-amber-800",
          hover: "hover:bg-amber-50",
          shadow: "hover:shadow-amber-100"
        };
      default:
        return {
          border: "border-gray-200",
          hover: "hover:bg-gray-50",
          shadow: "hover:shadow-gray-100"
        };
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const years = ["19", "18", "17", "16", "15", "14", "13"];
        const allTests = [];
        const allowedTests = ["test_1", "test_2", "test_3", "test_4"];

        for (const year of years) {
          let collectionName;
          switch (type) {
            case "general_reading":
              collectionName = `cambridge_${year}_general_reading`;
              break;
            case "listening":
              collectionName = `cambridge_${year}_listening`;
              break;
            case "academic_reading":
              collectionName = `cambridge_${year}_academic_reading`;
              break;
            default:
              throw new Error("Invalid test type");
          }

          const querySnapshot = await getDocs(collection(db, collectionName));
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            // Filter to only include test_1 through test_4
            Object.entries(data)
              .filter(([testKey]) => allowedTests.includes(testKey))
              .forEach(([testKey, content]) => {
                // Only add if it's a test, not questions or answers
                if (allowedTests.includes(testKey)) {
                  allTests.push({
                    year,
                    testNumber: testKey,
                    content,
                    title: `Cambridge ${year} ${type.replace("_", " ")} - ${testKey.replace("_", " ")}`,
                  });
                }
              });
          });
        }

        // Sort tests by year (descending) and test number
        const sortedTests = allTests.sort((a, b) => {
          if (a.year !== b.year) {
            return b.year - a.year; // Sort by year descending
          }
          // Sort by test number
          return a.testNumber.localeCompare(b.testNumber);
        });

        setTests(sortedTests);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTests();
  }, [type]);

  const renderContent = (test) => {
    if (type === "listening") {
      return (
        <>
          <audio controls className="w-full mb-4">
            <source src={test.content} type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
          <div className="mt-4 text-gray-600">
            Listening {test.testNumber.replace("_", " ")}
          </div>
        </>
      );
    }

    return (
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: test.content }} />
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

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
            onClick={() => setSelectedTest(test)}
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
              {type === "listening" ? "Click to play audio" : "Click to view content"}
            </p>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedTest} onOpenChange={() => setSelectedTest(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedTest?.title}</DialogTitle>
          </DialogHeader>
          {selectedTest && renderContent(selectedTest)}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestType;