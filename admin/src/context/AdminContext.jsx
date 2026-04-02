import { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const adminDataContext = createContext();

export default function AdminContext({ children }) {
  const [adminData, setAdminData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  async function getAdmin() {
    try {
      let result = await axios.get(serverUrl + "/api/user/getadmin", {
        withCredentials: true,
      });
      console.log(result.data);
      setAdminData(result.data);
    } catch (error) {
      setAdminData(null);
      console.log(error);
    }
  }

  useEffect(() => {
    getAdmin();
  }, []);

  const value = { adminData, setAdminData, getAdmin };

  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  );
}
