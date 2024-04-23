import { Link } from "react-router-dom";

interface DropdownProps {
  toggleDropdown: () => void;
  dropdownRef: any;
  showDropdown: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  toggleDropdown,
  dropdownRef,
  showDropdown,
}) => {
  return (
    <>
      <li className="inline-block">
        <div className="container mx-auto flex justify-center items-center">
          <div className="relative group" ref={dropdownRef}>
            <button
              className="text-white focus:outline-none"
              onClick={toggleDropdown}
            >
              <div className="flex items-center">
                <span>Lists</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {showDropdown && (
              <div className="absolute mt-4 w-42 bg-white text-gray-500 border-gray-300 border-l-2 border-r-2 border-b-2">
                <ul>
                  <Link
                    to="/rankings"
                    className="transition duration-300"
                    onClick={toggleDropdown}
                  >
                    <li className="px-3 py-2 hover:bg-[#77625C] hover:text-white cursor-pointer">
                      Rankings
                    </li>
                  </Link>

                  <Link
                    to="/bookmarks"
                    className="transition duration-300"
                    onClick={toggleDropdown}
                  >
                    <li className="px-3 py-2 hover:bg-[#77625C] hover:text-white cursor-pointer">
                      Bookmarks
                    </li>
                  </Link>

                  <Link
                    to="/recommendations"
                    className="transition duration-300"
                    onClick={toggleDropdown}
                  >
                    <li className="px-3 py-2 hover:bg-[#77625C] hover:text-white cursor-pointer">
                      Recommendations
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default Dropdown;
