import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "wouter";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onSearch, placeholder = "Search recipes, cuisines, or ingredients...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      onSearch(value);
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-bar"
      />
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
    </div>
  );
}
