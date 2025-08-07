import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {children}
    </div>
  );
};

export default DashboardLayout;
