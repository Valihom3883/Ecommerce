import React from 'react';

const ProductDetail = ({ product }) => {
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.sku}</h1>
      <p>Price: ${product.price}</p>
    </div>
  );
};

export default ProductDetail;
