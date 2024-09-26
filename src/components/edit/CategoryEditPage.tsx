// CategoryEditPage.tsx
import React, { useEffect, useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { ICategoryCreate } from '../create/types';
import { Button, Form, Input, Modal, Row, Upload, UploadFile } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import { RcFile, UploadChangeParam } from 'antd/es/upload';
import { PlusOutlined } from '@ant-design/icons';

const CategoryEditPage: React.FC = () => {
  const [form] = useForm<ICategoryCreate>();
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    // Завантажуємо дані категорії для попереднього заповнення форми
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/category/${id}`);
        const category = response.data;
        form.setFieldsValue({
          name: category.name,
          description: category.description,
          image: null, // Зображення потрібно встановлювати окремо
        });
        setPreviewImage(`http://localhost:8090/uploads/${category.image}`);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCategory();
  }, [id, form]);

  const onSubmitForm = async (values: ICategoryCreate) => {
    const url = `http://localhost:8090/api/category/${id}`;
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    if (values.image) {
      formData.append('image', values.image as RcFile);
    }

    try {
      await axios.put(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (e) {
      console.log('Error', e);
    }
  };

  return (
    <>
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-24">
          <p className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Редагування категорії
          </p>
          <Form form={form} onFinish={onSubmitForm} layout={'vertical'}>
            <Form.Item
              label={'Назва'}
              name="name"
              rules={[{ required: true, message: 'Вкажіть назву категорії' }]}>
              <Input autoComplete={'name'} />
            </Form.Item>

            <Form.Item
              label="Оберіть нове фото (опціонально)"
              valuePropName="image"
              name="image"
              getValueFromEvent={(e: UploadChangeParam) => {
                const image = e?.fileList[0] as any;
                return image?.originFileObj;
              }}>
              <Upload
                listType="picture-card"
                beforeUpload={() => false}
                accept="image/png, image/jpeg, image/webp"
                maxCount={1}
                onPreview={(file: UploadFile) => {
                  if (!file.url && !file.preview) {
                    file.preview = URL.createObjectURL(file.originFileObj as RcFile);
                  }
                  setPreviewImage(file.url || (file.preview as string));
                  setPreviewOpen(true);
                  setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
                }}>
                <PlusOutlined />
              </Upload>
            </Form.Item>

            <Form.Item
              label={'Опис'}
              name="description"
              rules={[{ required: true, message: 'Вкажіть опис категорії' }]}>
              <TextArea autoComplete={'description'} rows={3} />
            </Form.Item>

            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Зберегти
              </Button>
              <Button htmlType="button" onClick={() => navigate('/')}>
                Скасувати
              </Button>
            </Row>
          </Form>
        </div>
      </div>

      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default CategoryEditPage;