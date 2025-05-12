import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = {
  Clothing: {
    Men: ['Upperwear', 'Lowerwear'],
    Women: ['Upperwear', 'Lowerwear'],
    Kids: ['Upperwear', 'Lowerwear'],
  },
  Electronics: {
    Mobiles: ['Smartphones', 'Feature Phones'],
    Laptops: ['Gaming', 'Business'],
  },
};

type Category = keyof typeof categories;
type SubCategory<C extends Category> = keyof typeof categories[C];
type ProductType<C extends Category, S extends SubCategory<C>> = (typeof categories[C])[S][number];

const AddProduct: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [product, setProduct] = useState({
    name: '',
    stock: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setStep((prev) => prev + 1);

  const handleSave = () => {
    console.log({
      category: selectedCategory,
      subCategory: selectedSubCategory,
      type: selectedType,
      ...product,
    });
    navigate('/business/products');
  };

  return (
    <div className="max-w-xl mx-auto mt-8 space-y-6">
      <h2 className="text-xl font-semibold">Add New Product</h2>

      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select a Category</h3>
          {Object.keys(categories).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat as Category);
                handleNext();
              }}
              className="w-full px-4 py-2 border rounded hover:bg-gray-100 text-left"
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {step === 2 && selectedCategory && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select a Subcategory</h3>
          {Object.keys(categories[selectedCategory]).map((subCat) => (
            <button
              key={subCat}
              onClick={() => {
                setSelectedSubCategory(subCat);
                handleNext();
              }}
              className="w-full px-4 py-2 border rounded hover:bg-gray-100 text-left"
            >
              {subCat}
            </button>
          ))}
          <button onClick={handleBack} className="text-sm text-blue-600">← Back</button>
        </div>
      )}

      {step === 3 && selectedCategory && selectedSubCategory && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Select a Type</h3>
          {categories[selectedCategory][selectedSubCategory as keyof typeof categories[Category]]
            .map((type) => (
              <button
                key={type}
                onClick={() => {
                  setSelectedType(type);
                  handleNext();
                }}
                className="w-full px-4 py-2 border rounded hover:bg-gray-100 text-left"
              >
                {type}
              </button>
            ))}
          <button onClick={handleBack} className="text-sm text-blue-600">← Back</button>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Enter Product Details</h3>
          <input
            type="text"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="number"
            placeholder="Available Stock"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Product Description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex justify-between">
            <button onClick={handleBack} className="text-sm text-blue-600">← Back</button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Save Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

