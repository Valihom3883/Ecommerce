import React from 'react';

const AddToCartWidget = ({ inventory }) => {
  return (
    <div>
      <p>In Stock: {inventory}</p>
      <button>Add to Cart</button>
    </div>
  );
};

export default AddToCartWidget;
