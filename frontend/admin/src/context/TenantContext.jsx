import React from 'react';

export const TenantContext = React.createContext();

export const useTenantContext = () => React.useContext(TenantContext);
