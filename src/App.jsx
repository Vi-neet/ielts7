import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Hero from "./components/Hero";
import TestType from "./components/TestType";
import Navbar from "./components/Navbar";
import EvaluationPage from "./pages/EvaluationPage";
import TestPage from "./pages/TestPage";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import WatchAndLearn from "./pages/WatchAndLearn";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Default route redirect */}
          {/* <Route
            path="/"
            element={<Navigate to="/free/general_reading" replace />}
          /> */}
          
          {/* Test type routes under Hero */}
          <Route path="/" element={<Hero />}>
            <Route path="/:type" element={<TestType />} />
          </Route>
          
          {/* Other routes */}
          <Route path="/test-page" element={<TestPage />} />
          <Route path="/evaluation" element={<EvaluationPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/watchNlearn" element={<WatchAndLearn />} />
          
          {/* Catch-all redirect */}
          {/* <Route path="*" element={<Navigate to="/free/general_reading" replace />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;