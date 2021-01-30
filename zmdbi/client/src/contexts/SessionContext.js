import React from "react";
import { createContext, useState, useContext } from "react";

const SessionContext = createContext();
const SessionContextUpdate = createContext();

export function useSession() {
  return useContext(SessionContext);
}

export function useSessionUpdate() {
  return useContext(SessionContextUpdate);
}

function SessionProvider({ children }) {
  const [session, setSession] = useState("");

  return (
    <SessionContext.Provider value={session}>
      <SessionContextUpdate.Provider value={setSession}>
        {children}
      </SessionContextUpdate.Provider>
    </SessionContext.Provider>
  );
}

export default SessionProvider;
