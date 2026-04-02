import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { authDataContext } from "./AuthContext";

export const userDataContext = createContext();

export default function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, []);

  async function getCurrentUser() {
    try {
      let result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });
      setUser(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  const value = { user, setUser, getCurrentUser };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}
