// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryCreatePage from './components/create/CategoryCreatePage';
import CategoryListPage from './components/category/CategoryListPage';
import CategoryEditPage from './components/edit/CategoryEditPage';
import ProductListPage from './components/product/ProductListPage';
import ProductDetailPage from './components/product/ProductDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4">
          Головна
        </Link>
        <Link to="/category" className="mr-4">
        Список категорій
        </Link>
        <Link to="/create" className="mr-4">
        Створити категорію
        </Link>
        <Link to="/products" className="mr-4">
          Список продуктів
        </Link>
      </nav>
      <Routes>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/category" element={<CategoryListPage />} />
        <Route path="/create" element={<CategoryCreatePage />} />
        <Route path="/edit/:id" element={<CategoryEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;


