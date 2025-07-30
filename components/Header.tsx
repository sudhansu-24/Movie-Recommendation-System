import SearchInput from "./SearchInput";
import Link from "next/link";

function Header() {
  return (
    <header className="p-6 pb-4 flex flex-col items-center fixed top-0 left-0 right-0 z-50 bg-dark-secondary/95 backdrop-blur-sm border-b border-dark-border shadow-lg">
      {/* VectorCinema Brand */}
      <Link href="/" className="mb-4 group">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
            <span className="text-xl font-bold text-white">🎬</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
              VectorCinema
            </h1>
            <p className="text-xs text-dark-muted font-medium tracking-wider">
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
