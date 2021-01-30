import React from "react";
import { createContext, useState, useContext } from "react";

const DiscoverContext = createContext();
const DiscoverContextUpdate = createContext();

export function useDiscover() {
  return useContext(DiscoverContext);
}

export function useDiscoverUpdate() {
  return useContext(DiscoverContextUpdate);
}

function DiscoverProvider({ children }) {
  const [discoverResults, setDiscoverResults] = useState(null);

  return (
    <DiscoverContext.Provider value={discoverResults}>
      <DiscoverContextUpdate.Provider value={setDiscoverResults}>
        {children}
      </DiscoverContextUpdate.Provider>
    </DiscoverContext.Provider>
  );
}

export default DiscoverProvider;
