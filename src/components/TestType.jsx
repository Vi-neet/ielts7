import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { useParams, useLocation,Link,Outlet } from "react-router-dom";
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


const TestLayout = () => {
  const { plan } = useParams();
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8 font-playfair text-[#cc0d09]">
        Tests
      </h2>
      <div className="flex justify-center gap-4 mb-8">
        <Link
          to="/free"
          className={`px-6 py-2 rounded-full font-inter ${
            location.pathname.includes("/free")
              ? "bg-[#cc0d09] text-white"
              : "bg-gray-200 hover:bg-[#d56e1f] hover:text-white"
          }`}
        >
          Free
        </Link>
        <Link
          to="/paid"
          className={`px-6 py-2 rounded-full font-inter ${
            location.pathname.includes("/paid")
              ? "bg-[#cc0d09] text-white"
              : "bg-gray-200 hover:bg-[#d56e1f] hover:text-white"
          }`}
        >
          Paid
        </Link>
      </div>

        <div className="flex justify-center gap-4 mb-8">
          <Link
            to={`/${plan}/general_reading`}
            className={`px-4 py-2 rounded-md font-inter ${
              location.pathname.includes("general_reading")
                ? "bg-[#cc0d09] text-white"
                : "bg-gray-100 hover:bg-[#d56e1f] hover:text-white"
            }`}
          >
            General Reading
          </Link>
          <Link
            to={`/${plan}/listening`}
            className={`px-4 py-2 rounded-md font-inter ${
              location.pathname.includes("listening")
                ? "bg-[#cc0d09] text-white"
                : "bg-gray-100 hover:bg-[#d56e1f] hover:text-white"
            }`}
          >
            Listening
          </Link>
          <Link
            to={`/${plan}/academic_reading`}
            className={`px-4 py-2 rounded-md font-inter ${
              location.pathname.includes("academic_reading")
                ? "bg-[#cc0d09] text-white"
                : "bg-gray-100 hover:bg-[#d56e1f] hover:text-white"
            }`}
          >
            Academic Reading
          </Link>
        </div>
      
      <Outlet />
    </div>
  );
};


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
            Object.entries(data).forEach(([testKey, content]) => {
              allTests.push({
                year,
                testNumber: testKey,
                content,
                title: `Cambridge ${year} ${type.replace("_", " ")} - ${testKey}`,
              });
            });
          });
        }

        setTests(allTests);
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
            Listening Section {test.testNumber}
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


export {TestType, TestLayout};