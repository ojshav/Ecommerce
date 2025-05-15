import React, { useState, useEffect } from 'react';
import { PlusCircle, X, ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react';
import CommonNavbar from './CommonNavbar';
import SuperAdminLayout from './SuperAdminLayout';

interface IAttribute {
    id: string;
    name: string;
    value?: string;
}

interface IBrand {
    id: string;
    name: string;
}

interface ISize {
    id: string;
    name: string;
}

interface IColor {
    id: string;
    name: string;
    hex: string;
}

interface ICustomAttribute {
    id: string;
    name: string;
    type: 'text' | 'number' | 'dropdown' | 'multi-select';
    required: boolean;
    options?: string[];
}

interface ICategoryAttribute {
    id: string;
    name: string;
    value: string;
}

interface ICategory {
    id: string;
    name: string;
    description: string;
    productCount: number;
    parent?: string;
    status: 'active' | 'inactive';
}

const Attribute: React.FC = () => {
    // States
    const [activeTab, setActiveTab] = useState<'general' | 'custom' | 'category'>('general');
    const [brands, setBrands] = useState<IBrand[]>([{ id: '1', name: 'Codebook' }]);
    const [newBrand, setNewBrand] = useState<string>('');
    const [showAddBrand, setShowAddBrand] = useState<boolean>(false);
    const [newSize, setNewSize] = useState<string>('');
    const [showAddSize, setShowAddSize] = useState<boolean>(false);

    const [showAddColor, setShowAddColor] = useState(false);
    const [newColorName, setNewColorName] = useState('');
    const [newColorHex, setNewColorHex] = useState('#000000');


    const [colors, setColors] = useState<IColor[]>([
        { id: '1', name: 'Red', hex: '#FF0000' },
        { id: '2', name: 'Green', hex: '#008000' },
        { id: '3', name: 'Blue', hex: '#0000FF' },
        { id: '4', name: 'Black', hex: '#000000' },
        { id: '5', name: 'White', hex: '#FFFFFF' },
        { id: '6', name: 'Grey', hex: '#808080' },
        { id: '7', name: 'Yellow', hex: '#FFFF00' },
        { id: '8', name: 'Pink', hex: '#FFC0CB' },
        { id: '9', name: 'Purple', hex: '#800080' },
        { id: '10', name: 'Orange', hex: '#FFA500' },
        { id: '11', name: 'Brown', hex: '#A52A2A' },
        { id: '12', name: 'Navy', hex: '#000080' },
        { id: '13', name: 'Beige', hex: '#F5F5DC' },
        { id: '14', name: 'Maroon', hex: '#800000' },
        { id: '15', name: 'Cyan', hex: '#00FFFF' },
    ]);

    const [sizes, setSizes] = useState<ISize[]>([
        { id: '1', name: 'XS' },
        { id: '2', name: 'S' },
        { id: '3', name: 'M' },
        { id: '4', name: 'L' },
        { id: '5', name: 'XL' },
        { id: '6', name: 'XXL' },
        { id: '7', name: '3XL' },
    ]);

    const [customAttributes, setCustomAttributes] = useState<ICustomAttribute[]>([]);
    const [showAddCustomAttribute, setShowAddCustomAttribute] = useState<boolean>(false);
    const [newCustomAttribute, setNewCustomAttribute] = useState<{
        name: string;
        type: 'text' | 'number' | 'dropdown' | 'multi-select';
        required: boolean;
    }>({
        name: '',
        type: 'text',
        required: false,
    });

    const [categories, setCategories] = useState<ICategory[]>([
        { id: '1', name: "Men's", description: "Clothing and accessories for men", productCount: 12, status: 'active' },
        { id: '2', name: "Men's Shirts", description: "Formal and casual shirts for men", productCount: 8, parent: "Men's", status: 'active' },
        { id: '3', name: "Men's Pants", description: "Formal and casual pants for men", productCount: 4, parent: "Men's", status: 'active' },
        { id: '4', name: "Women's", description: "Clothing and accessories for women", productCount: 18, status: 'active' },
        { id: '5', name: "Women's Dresses", description: "All types of dresses for women", productCount: 12, parent: "Women's", status: 'active' },
        { id: '6', name: "Women's Tops", description: "Tops, blouses, and shirts for women", productCount: 6, parent: "Women's", status: 'active' },
        { id: '7', name: "Kids", description: "Clothing and accessories for kids", productCount: 8, status: 'active' },
        { id: '8', name: "Accessories", description: "", productCount: 15, status: 'active' },
    ]);

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categoryAttributes, setCategoryAttributes] = useState<ICategoryAttribute[]>([]);
    const [selectedAttribute, setSelectedAttribute] = useState<string | null>(null);
    const [attributeValue, setAttributeValue] = useState<string>('');

    const [showEditCategory, setShowEditCategory] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<{
        id: string;
        name: string;
        parent: string;
        description: string;
        status: 'active' | 'inactive';
    }>({
        id: '',
        name: '',
        parent: '',
        description: '',
        status: 'active'
    });

    // Add brand function
    const handleAddBrand = () => {
        if (newBrand.trim()) {
            const newBrandObj = {
                id: (brands.length + 1).toString(),
                name: newBrand
            };
            setBrands([...brands, newBrandObj]);
            setNewBrand('');
            setShowAddBrand(false);
        }
    };
    const handleAddSize = () => {
        if (newSize.trim()) {
            const newSizeObj = {
                id: (sizes.length + 1).toString(),
                name: newSize
            };
            setSizes([...sizes, newSizeObj]);
            setNewSize('');
            setShowAddSize(false);
        }
    };

    const handleAddColor = () => {
        if (newColorName.trim() && newColorHex.trim()) {
            const newColorObj = {
                id: (colors.length + 1).toString(),
                name: newColorName,
                hex: newColorHex
            };
            setColors([...colors, newColorObj]);
            setNewColorName('');
            setNewColorHex('#000000');
            setShowAddColor(false);
        }
    };


    // Add custom attribute function
    const handleAddCustomAttribute = () => {
        if (newCustomAttribute.name.trim()) {
            const newAttr = {
                id: (customAttributes.length + 1).toString(),
                name: newCustomAttribute.name,
                type: newCustomAttribute.type,
                required: newCustomAttribute.required,
                options: newCustomAttribute.type === 'dropdown' || newCustomAttribute.type === 'multi-select' ? [] : undefined
            };
            setCustomAttributes([...customAttributes, newAttr]);
            setNewCustomAttribute({
                name: '',
                type: 'text',
                required: false,
            });
            setShowAddCustomAttribute(false);
        }
    };

    // Add category attribute function
    const handleAddCategoryAttribute = () => {
        if (selectedAttribute && attributeValue && selectedCategory) {
            const newAttr = {
                id: (categoryAttributes.length + 1).toString(),
                name: selectedAttribute,
                value: attributeValue
            };
            setCategoryAttributes([...categoryAttributes, newAttr]);
            setSelectedAttribute(null);
            setAttributeValue('');
        }
    };

    // Save edited category
    const handleSaveCategory = () => {
        if (editCategory.id) {
            const updatedCategories = categories.map(cat =>
                cat.id === editCategory.id ? {
                    ...cat,
                    name: editCategory.name,
                    description: editCategory.description,
                    status: editCategory.status
                } : cat
            );
            setCategories(updatedCategories);
            setShowEditCategory(false);
        }
    };

    // Open edit category modal
    const handleEditCategory = (category: ICategory) => {
        setEditCategory({
            id: category.id,
            name: category.name,
            parent: category.parent || '',
            description: category.description,
            status: category.status
        });
        setShowEditCategory(true);
    };

    return (
      
 
        <div className="p-6">
             
            <h1 className="text-2xl font-bold mb-6">Product Attributes</h1>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex border-b mb-6">
                    <button
                        className={`px-4 py-2 mr-4 ${activeTab === 'general' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('general')}
                    >
                        General Attributes
                    </button>
                    <button
                        className={`px-4 py-2 mr-4 ${activeTab === 'custom' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('custom')}
                    >
                        Custom Attributes
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'category' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('category')}
                    >
                        Category-Specific Attributes
                    </button>
                </div>

                {/* General Attributes Tab */}
                {activeTab === 'general' && (
                    <div>
                        {/* Brand Section */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Brand *</h2>
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    placeholder="Search brands..."
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="flex items-center mb-3">
                                <span className="text-gray-700 mr-2">Codebook</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded">Default</span>
                            </div>

                            {showAddBrand ? (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={newBrand}
                                        onChange={(e) => setNewBrand(e.target.value)}
                                        placeholder="Enter brand name"
                                        className="w-full p-2 border rounded-md mb-2"
                                    />
                                    <div className="flex">
                                        <button
                                            className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                            onClick={handleAddBrand}
                                        >
                                            Add
                                        </button>
                                        <button
                                            className="bg-gray-300 px-4 py-1 rounded"
                                            onClick={() => {
                                                setShowAddBrand(false);
                                                setNewBrand('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    className="flex items-center text-blue-500"
                                    onClick={() => setShowAddBrand(true)}
                                >
                                    <PlusCircle className="w-4 h-4 mr-1" />
                                    Add New Brand
                                </button>
                            )}
                        </div>

                        {/* Colors Section */}
                        <div className="p-4 max-w-md mx-auto">
                            <h2 className="text-xl font-bold mb-4">Color Palette</h2>

                            {/* Display existing colors */}
                            <div className="flex flex-wrap gap-2">
                                {colors.map((color, index) => (
                                    <div key={index} className="flex flex-col items-center p-2 border rounded">
                                        <div
                                            className="w-12 h-12 mb-1 rounded"
                                            style={{ backgroundColor: color.hex }}
                                        ></div>
                                        <div className="text-center">
                                            <div className="font-medium">{color.name}</div>
                                            <div className="text-xs text-gray-600">{color.hex}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {showAddColor ? (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        value={newColorName}
                                        onChange={(e) => setNewColorName(e.target.value)}
                                        placeholder="Enter color name"
                                        className="w-full p-2 border rounded mb-2"
                                    />
                                    <input
                                        type="color"
                                        value={newColorHex}
                                        onChange={(e) => setNewColorHex(e.target.value)}
                                        className="w-full h-10 mb-2"
                                    />
                                    <div className="flex">
                                        <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2" onClick={handleAddColor}>Add</button>
                                        <button className="bg-gray-300 px-4 py-1 rounded" onClick={() => setShowAddColor(false)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <button className="flex items-center text-blue-500 mt-2" onClick={() => setShowAddColor(true)}>
                                    <PlusCircle className="w-4 h-4 mr-1" /> Add New Color
                                </button>
                            )}
                        </div>



                        {/* Sizes Section */}
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold mb-4">Sizes *</h2>
                            <div className="grid grid-cols-7 gap-2">
                                {sizes.map((size) => (
                                    <div
                                        key={size.id}
                                        className="border rounded p-2 text-center"
                                    >
                                        {size.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {showAddSize ? (
                            <div className="mt-4">
                                <input
                                    type="text"
                                    value={newSize}
                                    onChange={(e) => setNewSize(e.target.value)}
                                    placeholder="Enter size"
                                    className="w-full p-2 border rounded mb-2"
                                />
                                <div className="flex">
                                    <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2" onClick={handleAddSize}>Add</button>
                                    <button className="bg-gray-300 px-4 py-1 rounded" onClick={() => setShowAddSize(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <button className="flex items-center text-blue-500 mt-2" onClick={() => setShowAddSize(true)}>
                                <PlusCircle className="w-4 h-4 mr-1" /> Add New Size
                            </button>
                        )}


                        {/* Dimensions Section */}
                    </div>
                )}


                {/* Custom Attributes Tab */}
                {activeTab === 'custom' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Custom Attributes</h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
                                onClick={() => setShowAddCustomAttribute(true)}
                            >
                                <PlusCircle className="w-4 h-4 mr-1" />
                                Add New Attribute
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                            Add values for additional attributes specific to your product.
                        </p>

                        {customAttributes.length > 0 ? (
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="text-left p-2">Attribute</th>
                                        <th className="text-left p-2">Value</th>
                                        <th className="text-right p-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {customAttributes.map((attr) => (
                                        <tr key={attr.id} className="border-b">
                                            <td className="p-2">{attr.name}</td>
                                            <td className="p-2">
                                                {attr.type === 'text' && <input type="text" className="w-full p-1 border rounded" />}
                                                {attr.type === 'number' && <input type="number" className="w-full p-1 border rounded" />}
                                                {attr.type === 'dropdown' && (
                                                    <select className="w-full p-1 border rounded">
                                                        <option value="">Select...</option>
                                                    </select>
                                                )}
                                                {attr.type === 'multi-select' && (
                                                    <select multiple className="w-full p-1 border rounded">
                                                        <option value="">Select...</option>
                                                    </select>
                                                )}
                                            </td>
                                            <td className="p-2 text-right">
                                                <button className="text-blue-500 mr-2">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-500">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-center p-8 bg-gray-50 rounded">
                                <p>No custom attributes added yet.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Category-Specific Attributes Tab */}
                {activeTab === 'category' && (
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Category-Specific Attributes</h2>
                        </div>

                        <p className="text-sm text-gray-500 mb-4">
                            These attributes are specific to your selected category. Please provide accurate information.
                        </p>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="col-span-1">
                                <h3 className="font-medium mb-2">Categories</h3>
                                <div className="border rounded-md p-2 max-h-96 overflow-y-auto">
                                    {categories.map((category) => (
                                        <div key={category.id} className="mb-2">
                                            {!category.parent && (
                                                <div
                                                    className={`flex items-center justify-between p-1 cursor-pointer ${selectedCategory === category.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                                    onClick={() => setSelectedCategory(category.id)}
                                                >
                                                    <div className="flex items-center">
                                                        {category.parent ? <ChevronRight className="w-4 h-4 mr-1" /> : <ChevronDown className="w-4 h-4 mr-1" />}
                                                        <span>{category.name}</span>
                                                    </div>
                                                    <div className="flex">
                                                        <button
                                                            className="text-blue-500 mr-1"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleEditCategory(category);
                                                            }}
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Subcategories */}
                                            {categories
                                                .filter(subcat => subcat.parent === category.name)
                                                .map(subcat => (
                                                    <div
                                                        key={subcat.id}
                                                        className={`flex items-center justify-between p-1 pl-6 cursor-pointer ${selectedCategory === subcat.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                                        onClick={() => setSelectedCategory(subcat.id)}
                                                    >
                                                        <span>{subcat.name}</span>
                                                        <div className="flex">
                                                            <button
                                                                className="text-blue-500 mr-1"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditCategory(subcat);
                                                                }}
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="col-span-2">
                                <h3 className="font-medium mb-2">Category Attributes</h3>

                                {selectedCategory ? (
                                    <div>
                                        <div className="mb-4 grid grid-cols-3 gap-4">
                                            <div className="col-span-1">
                                                <label className="block text-sm font-medium mb-1">Select Attribute</label>
                                                <select
                                                    className="w-full p-2 border rounded-md"
                                                    value={selectedAttribute || ''}
                                                    onChange={(e) => setSelectedAttribute(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="fugbh">fugbh</option>
                                                    <option value="Connectivity">Connectivity</option>
                                                </select>
                                            </div>
                                            <div className="col-span-1">
                                                <label className="block text-sm font-medium mb-1">Value</label>
                                                <input
                                                    type="text"
                                                    className="w-full p-2 border rounded-md"
                                                    placeholder="Enter value"
                                                    value={attributeValue}
                                                    onChange={(e) => setAttributeValue(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-1 flex items-end">
                                                <button
                                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                                    onClick={handleAddCategoryAttribute}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>

                                        {categoryAttributes.length > 0 ? (
                                            <table className="w-full border-collapse">
                                                <thead>
                                                    <tr className="bg-gray-100">
                                                        <th className="text-left p-2">Attribute</th>
                                                        <th className="text-left p-2">Value</th>
                                                        <th className="text-right p-2">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {categoryAttributes.map((attr) => (
                                                        <tr key={attr.id} className="border-b">
                                                            <td className="p-2">{attr.name}</td>
                                                            <td className="p-2">{attr.value}</td>
                                                            <td className="p-2 text-right">
                                                                <button className="text-red-500">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <div className="text-center p-8 bg-gray-50 rounded">
                                                <p>No attributes added for this category yet.</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center p-8 bg-gray-50 rounded">
                                        <p>Please select a category to add attributes.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>


            {/* Add Custom Attribute Modal */}
            {showAddCustomAttribute && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Add New Custom Attribute</h3>
                            <button onClick={() => setShowAddCustomAttribute(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Attribute Name *</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder="Enter attribute name"
                                value={newCustomAttribute.name}
                                onChange={(e) => setNewCustomAttribute({ ...newCustomAttribute, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Attribute Type *</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={newCustomAttribute.type}
                                onChange={(e) => setNewCustomAttribute({
                                    ...newCustomAttribute,
                                    type: e.target.value as 'text' | 'number' | 'dropdown' | 'multi-select'
                                })}
                            >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="dropdown">Dropdown</option>
                                <option value="multi-select">Multi-select</option>
                            </select>
                        </div>

                        <div className="mb-4 flex items-center">
                            <input
                                type="checkbox"
                                id="required-field"
                                checked={newCustomAttribute.required}
                                onChange={(e) => setNewCustomAttribute({ ...newCustomAttribute, required: e.target.checked })}
                                className="mr-2"
                            />
                            <label htmlFor="required-field" className="text-sm">Required field</label>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded mr-2"
                                onClick={() => setShowAddCustomAttribute(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleAddCustomAttribute}
                            >
                                Add Attribute
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {showEditCategory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Edit Category</h3>
                            <button onClick={() => setShowEditCategory(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Category Name *</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={editCategory.name}
                                onChange={(e) => setEditCategory({ ...editCategory, name: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Parent Category</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={editCategory.parent}
                                onChange={(e) => setEditCategory({ ...editCategory, parent: e.target.value })}
                            >
                                <option value="">None</option>
                                <option value="Women's">Women's</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Instant Client">Instant Client</option>
                                <option value="celebrity_marketing_2">celebrity_marketing_2</option>
                                <option value="CB COLDDRINK Men's Regular Fit Printed">CB COLDDRINK Men's Regular...</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                className="w-full p-2 border rounded-md"
                                rows={4}
                                value={editCategory.description}
                                onChange={(e) => setEditCategory({ ...editCategory, description: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Status</label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={editCategory.status}
                                onChange={(e) => setEditCategory({
                                    ...editCategory,
                                    status: e.target.value as 'active' | 'inactive'
                                })}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded mr-2"
                                onClick={() => setShowEditCategory(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleSaveCategory}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
  
       
    );
};

export default Attribute;