export async function getServerSideProps(context) {
  const product = await ProductService.fetch(
    context.params.id,
    context.req.headers['x-tenant-id']
  );
  return { props: { product } };
}

export default function ProductPage({ product }) {
  return (
    <TenantThemeProvider>
      <ProductDetail product={product} />
      <AddToCartWidget inventory={product.inventory_count} />
      <CheckoutFlow />
    </TenantThemeProvider>
  );
}
