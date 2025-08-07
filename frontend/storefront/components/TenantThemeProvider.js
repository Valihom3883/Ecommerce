import React from 'react';

const TenantThemeProvider = ({ children }) => {
  // This would contain tenant-specific theme logic
  return <>{children}</>;
};

export default TenantThemeProvider;
