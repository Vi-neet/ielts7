import { useParams, useLocation, Link, Outlet } from "react-router-dom";

const TestLayout = () => {
  const { plan } = useParams();
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h2 className="text-2xl font-bold text-center mb-8 font-playfair text-[#cc0d09]">
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
      </div> */}
      {plan && (
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
      )}
      <Outlet />
    </div>
  );
};

export default TestLayout;
