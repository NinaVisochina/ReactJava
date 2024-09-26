// ProductListPage.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface IProductImage {
  id: number;
  name: string;
}

interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  images: IProductImage[];
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<IProduct[]>('http://localhost:8090/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Список продуктів</h1>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <div className="row">
          {products.map(product => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card">
                {/* Використовуємо зображення з розміром 32px */}
                {product.images.length > 0 && (
                  <img
                    src={`http://localhost:8090/uploading/300_${product.images[0].name}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <strong>Ціна: </strong> {product.price} грн
                  </p>
                  <Link to={`/products/${product.id}`} className="btn btn-primary">
                    Детальніше
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
