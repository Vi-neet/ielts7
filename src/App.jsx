import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Hero from "./components/Hero";
import {TestType,TestLayout} from "./components/TestType";
// import TestLayout from "./components/TestLayout";
import Navbar from "./components/Navbar";
import EvaluationPage from "./pages/EvaluationPage";

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
          <Route path="/" element={<Layout />}>
            <Route index element={<TestLayout />} />
            <Route path=":plan" element={<TestLayout />}>
              <Route path=":type" element={<TestType />} />
            </Route>
          </Route>
          <Route path="evaluation" element={<EvaluationPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
