"use client";

import React, { createContext, useContext, useState } from "react";

interface AdminLayoutContextType {
  isMobileNavOpen: boolean;
  setIsMobileNavOpen: (open: boolean) => void;
  toggleMobileNav: () => void;
}

const AdminLayoutContext = createContext<AdminLayoutContextType>({
  isMobileNavOpen: false,
  setIsMobileNavOpen: () => {},
  toggleMobileNav: () => {},
});

export const AdminLayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen((prev) => !prev);
  };

  return (
    <AdminLayoutContext.Provider
      value={{
        isMobileNavOpen,
        setIsMobileNavOpen,
        toggleMobileNav,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};

export const useAdminLayout = () => useContext(AdminLayoutContext);
