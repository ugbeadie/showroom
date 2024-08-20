import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

type Product = {
  category: string;
};

type FetchResponse = {
  products: Product[];
};

const Sidebar = () => {
  const {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirts",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/product");
        const data: FetchResponse = await res.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("error fetching categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeyWordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilter = () => {
    setQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <div className="w-64 p-5 h-screen">
      <h1 className="text-2xl font-bold mb-10 mt-4">ShowRoom</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 sm:mb-0"
          placeholder="search product"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex justify-center items-center mt-2">
          <input
            type="text"
            className="border-2 mr-2 px-5 py-2 mb-3 w-full"
            placeholder="min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="text"
            className="border-2 mr-2 px-5 py-2 mb-3 w-full"
            placeholder="max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>

        {/* CATEGORIES SECTION */}
        <div className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Categories</h2>
        </div>
        <section>
          {categories.map((category, index) => (
            <label key={index} className="block mb-2">
              <input
                type="radio"
                name="category"
                value={category}
                className="mr-2 w-4 h-4"
                onChange={() => handleRadioChange(category)}
                checked={selectedCategory === category}
              />
              {category.toUpperCase()}
            </label>
          ))}
        </section>

        {/* KEYWORDS SECTION */}
        <div className="mb-5 mt-4">
          <h2 className="text-xl font-semibold mb-3">Keywords</h2>

          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeyWordClick(keyword)}
                className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleResetFilter}
          className="w-full mb-16 py-2 bg-black text-white rounded mt-5"
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;
