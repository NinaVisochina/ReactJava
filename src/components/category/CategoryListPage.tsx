// CategoryListPage.tsx
import React, { useEffect, useState } from 'react';
import { ICategory } from './types';
import axios from 'axios';
import { Button, List, Modal } from 'antd';
import { Link } from 'react-router-dom';

const CategoryListPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Завантаження списку категорій
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ICategory[]>('http://localhost:8090/api/category');
      //console.log("Hello", response.data);
      
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Функція для видалення категорії
  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8090/api/category/${id}`);
      setCategories(categories.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Підтвердження видалення
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: 'Ви впевнені, що хочете видалити цю категорію?',
      okText: 'Так',
      okType: 'danger',
      cancelText: 'Ні',
      onOk() {
        deleteCategory(id);
      },
    });
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-24">
        <p className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Список категорій
        </p>
        <List
          loading={loading}
          itemLayout="horizontal"
          dataSource={categories}
          renderItem={item => (
            <List.Item
              actions={[
                <Link to={`/edit/${item.id}`}>Редагувати</Link>,
                <Button type="link" danger onClick={() => confirmDelete(item.id)}>
                  Видалити
                </Button>,
              ]}>
              <List.Item.Meta
              avatar={<img src={"http://localhost:8090/uploading/600_"+item.image} alt={item.name} style={{ width: 50, height: 50 }} />}
                title={item.name}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default CategoryListPage;
  //return (
    //<div className="py-12">
      //<div className="mx-auto max-w-7xl px-6 lg:px-24">
        //<p className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        //  Список категорій
        //</p>
        //<List
        //  loading={loading}
         // itemLayout="horizontal"
         // dataSource={categories}
         // renderItem={item => (
          //  <List.Item
           //   actions={[
            //    <Button type="link" danger onClick={() => confirmDelete(item.id)}>
            //      Видалити
             //   </Button>,
            //  ]}
           // >
           //   <List.Item.Meta
           //     avatar={<img src={"http://localhost:8090/uploading/600_"+item.image} alt={item.name} style={{ width: 50, height: 50 }} />}
           //     title={item.name}
            //    description={item.description}
          //    />
          //  </List.Item>
         // )}
        ///>
     // </div>
   // </div>
 // );
//};

//export default CategoryListPage;
