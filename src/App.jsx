import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Hero from "./components/Hero";
import TestType from "./components/TestType";
import TestLayout from "./components/TestLayout";
import Navbar from "./components/Navbar";
import EvaluationPage from "./pages/EvaluationPage";
import TestPage from "./components/TestPage";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import WatchAndLearn from "./pages/WatchAndLearn";
const Layout = () => {
  return (
    <div>
      <Hero />
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/free/general_reading" replace />}
          />
          <Route path="/" element={<Layout />}>
            <Route index element={<TestLayout />} />
            <Route path=":plan" element={<TestLayout />}>
              <Route path=":type" element={<TestType />} />
            </Route>
            <Route path="/test-page" element={<TestPage />} />
          </Route>
          <Route path="evaluation" element={<EvaluationPage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="watchNlearn" element={<WatchAndLearn />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
