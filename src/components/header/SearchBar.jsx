import { FiSearch } from "react-icons/fi";
import useSearch from "../../context/useSearch";

const SearchBar = ({ placeholder = "Search..." }) => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="relative w-full sm:w-1/2">
      <input
        type="text"
        placeholder={placeholder}
        className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <FiSearch className="absolute left-3 top-3 text-gray-500" />
    </div>
  );
};

export default SearchBar;
