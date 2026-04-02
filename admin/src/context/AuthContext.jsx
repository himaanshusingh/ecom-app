import { createContext } from "react";

export const authDataContext = createContext();

export default function AuthContext({ children }) {
  const serverUrl = "http://localhost:3000";
  const value = { serverUrl };

  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}
