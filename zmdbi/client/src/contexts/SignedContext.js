import React from "react";
import { createContext, useState, useContext } from "react";

const SignedContext = createContext();
const SignedContextUpdate = createContext();
const UsernameContext = createContext();
const UsernameContextUpdate = createContext();
const UserIdContext = createContext();
const UserIdContextUpdate = createContext();

export function useSigned() {
  return useContext(SignedContext);
}

export function useSignedUpdate() {
  return useContext(SignedContextUpdate);
}

export function useUsername() {
  return useContext(UsernameContext);
}

export function useUsernameUpdate() {
  return useContext(UsernameContextUpdate);
}
export function useUserId() {
  return useContext(UserIdContext);
}

export function useUserIdUpdate() {
  return useContext(UserIdContextUpdate);
}

function SignedProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <SignedContext.Provider value={signed}>
      <SignedContextUpdate.Provider value={setSigned}>
        <UsernameContext.Provider value={username}>
          <UsernameContextUpdate.Provider value={setUsername}>
            <UserIdContext.Provider value={userId}>
              <UserIdContextUpdate.Provider value={setUserId}>
                {children}
              </UserIdContextUpdate.Provider>
            </UserIdContext.Provider>
          </UsernameContextUpdate.Provider>
        </UsernameContext.Provider>
      </SignedContextUpdate.Provider>
    </SignedContext.Provider>
  );
}

export default SignedProvider;
