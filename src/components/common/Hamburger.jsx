import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hamburgerIcon from "../../asset/hamburger.svg";

const Hamburger = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="hamburger">
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="hamburgerIcon">
  <img src={hamburgerIcon} className="hamburgerSVG" />
</button>
{isDropdownOpen && (
  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-100">
    <button
      onClick={() => {
        navigate("/request-list");
        setIsDropdownOpen(false);
      }}
      className="w-full px-4 py-3 text-left hover:bg-gray-50"
    >
      <span className="text-gray-700">배출 대행</span>
    </button>
    <button
      onClick={() => {
        navigate("/guide");
        setIsDropdownOpen(false);
      }}
      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-t border-gray-100"
    >
      <span className="text-gray-700">클린하우스란?</span>
    </button>
  </div>
      )}
    </div>
  );
};

export default Hamburger;
