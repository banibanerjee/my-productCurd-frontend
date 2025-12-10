import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSingleProductStore } from '../Store/ProductStore';
import useCartStore from '../Store/CartStore';
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading, error, fetchProductById } = useSingleProductStore();
  const { addToCart } = useCartStore();
  const [mainImage, setMainImage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  useEffect(() => {
    if (product) setMainImage(product.mainImage);
  }, [product]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 20 }}>
      <h2>{product.title}</h2>

      {/* Image preview section */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
        <img
          src={mainImage}
          alt={product.title}
          style={{ width: 400, height: 400, objectFit: 'cover', border: '1px solid #ddd' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {product.subImages?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                cursor: 'pointer',
                border: mainImage === img ? '2px solid blue' : '1px solid #ccc',
              }}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Price and description */}
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <p>
          Price: <del>₹{product.price}</del> &nbsp;
          <strong style={{ color: 'green' }}>₹{product.offerPrice}</strong>
        </p>

        <div style={{ maxWidth: 600, border: '1px solid #ccc', padding: 20, marginTop: 10, borderRadius: 4 }}>
          <h4>Description</h4>
          <p>{product.details}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ marginTop: 30, display: 'flex', gap: 20 }}>
        <button
          style={buttonStyle}
          onClick={() => {
            addToCart(product);
            navigate("/cart");
          }}
        >
          Add to Cart
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: '#28a745' }}
          onClick={() => navigate("/checkout")}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: '12px 20px',
  fontSize: 16,
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
};

export default ProductDetail;
