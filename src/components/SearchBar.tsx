import searchIcon from "../assets/search.svg";

// Описываем типы для пропсов: строку поиска и функцию её изменения
interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
    <div className="relative mt-2 w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <img src={searchIcon} alt="" />
      </div>

      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-[white] border-[var(--border-light)] border-[0.3px] rounded-full pl-11 pr-4 py-2.5 text-[15px] font-normal text-slate-900 placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
      />
    </div>
  );
};

export default SearchBar;
