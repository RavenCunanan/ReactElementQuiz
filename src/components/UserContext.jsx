import React, { createContext, useState } from "react";

// The UserContext
export const UserContext = createContext();

// The UserProvider component
export function UserProvider({ children }) {
  const [name, setName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}
