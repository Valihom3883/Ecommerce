const ProductService = {
  fetch: async (id, tenantId) => {
    console.log(`Fetching product ${id} for tenant ${tenantId}`);
    return {
      id,
      tenant_id: tenantId,
      sku: 'EXAMPLE-SKU',
      price: 99.99,
      inventory_count: 10,
    };
  },
};

export default ProductService;
