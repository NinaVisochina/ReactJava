// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CategoryCreatePage from './components/create/CategoryCreatePage';
import CategoryListPage from './components/category/CategoryListPage';
import CategoryEditPage from './components/edit/CategoryEditPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-100">
        <Link to="/" className="mr-4">
          Головна
        </Link>
        <Link to="/create">Створити категорію</Link>
      </nav>
      <Routes>
        <Route path="/" element={<CategoryListPage />} />
        <Route path="/create" element={<CategoryCreatePage />} />
        <Route path="/edit/:id" element={<CategoryEditPage />} />
      </Routes>
    </Router>
  );
};

export default App;


