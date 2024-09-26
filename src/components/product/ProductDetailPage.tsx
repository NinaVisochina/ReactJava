// ProductDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // імпортуємо стилі каруселі
import { Carousel } from 'react-responsive-carousel';

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

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Отримуємо id товару з параметрів URL
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.get<IProduct>(`http://localhost:8090/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (!product) {
    return <p>Продукт не знайдений</p>;
  }

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">{product.name}</h1>
      <div className="row">
        <div className="col-md-6">
          {/* Виводимо карусель з усіма зображеннями продукту */}
          {product.images.length > 0 ? (
            <Carousel showThumbs={false}>
              {product.images.map((image) => (
                <div key={image.id}>
                  <img
                    src={`http://localhost:8090/uploading/300_${image.name}`}
                    alt={product.name}
                    className="img-fluid"
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <p>Немає зображень для цього продукту</p>
          )}
        </div>
        <div className="col-md-6">
          <h2>Ціна: {product.price} грн</h2>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
