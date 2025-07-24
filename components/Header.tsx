import SearchInput from "./SearchInput";
import Link from "next/link";

function Header() {
  return (
    <header className="p-10 pb-0 flex flex-col items-center sticky top-0 z-50">
      {/* VectorCinema Brand */}
      <Link href="/" className="mb-6 group">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <span className="text-2xl font-bold text-white">🎬</span>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              VectorCinema
            </h1>
            <p className="text-xs text-gray-600 font-medium tracking-wider">
              AI-POWERED RECOMMENDATIONS
            </p>
          </div>
        </div>
      </Link>
      
      {/* Search Input */}
      <SearchInput />
    </header>
  );
}

export default Header;
