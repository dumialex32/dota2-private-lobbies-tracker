import React, { createContext, ReactNode, useState } from "react";

export const LobbyContext = createContext(() => {});

const LobbyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [refetchKey, setRefetchKey] = useState<number>(0);
  const triggerRefetch = () => {
    setRefetchKey((refetchKey) => refetchKey + 1);
  };
  return (
    <LobbyContext.Provider value={triggerRefetch}>
      {children}
    </LobbyContext.Provider>
  );
};

export default LobbyProvider;
