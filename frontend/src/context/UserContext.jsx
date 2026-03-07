import { useState, useEffect, createContext, useContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  let { serverUrl } = useContext(authDataContext);
  let [user, setUser] = useState("");

  useEffect(() => getCurrentUser(), []);

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

  let value = { user, setUser, getCurrentUser };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};

export default UserContext;
