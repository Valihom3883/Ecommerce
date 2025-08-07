import { useTenantContext } from '../context/TenantContext';

const ProductManager = () => {
  const { tenant } = useTenantContext();

  return (
    <DashboardLayout>
      <DataGrid
        rows={tenant.products}
        columns={[
          { field: 'sku', headerName: 'SKU', width: 200 },
          { field: 'price', headerName: 'Price', type: 'number' },
          { field: 'inventory', headerName: 'Stock', type: 'number' }
        ]}
      />
      <ProductCreator tenantId={tenant.id} />
    </DashboardLayout>
  );
}
