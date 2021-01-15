import React from "react";
import { createContext, useState, useContext } from "react";

const SearchContext = React.createContext();
const SearchContextUpdate = React.createContext();
const SearchRedirectContext = React.createContext();
const SearchRedirectContextUpdate = React.createContext();

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchUpdate() {
  return useContext(SearchContextUpdate);
}
export function useSearchRedirect() {
  return useContext(SearchRedirectContext);
}
export function useSearchRedirectUpdate() {
  return useContext(SearchRedirectContextUpdate);
}

function SearchProvider({ children }) {
  const [searchString, setSearchString] = useState("");
  const [searchRedirect, setSearchRedirect] = useState(false);
  return (
    <SearchContext.Provider value={searchString}>
      <SearchContextUpdate.Provider value={setSearchString}>
        <SearchRedirectContext.Provider value={searchRedirect}>
          <SearchRedirectContextUpdate.Provider value={setSearchRedirect}>
            {children}
          </SearchRedirectContextUpdate.Provider>
        </SearchRedirectContext.Provider>
      </SearchContextUpdate.Provider>
    </SearchContext.Provider>
  );
}

export default SearchProvider;
