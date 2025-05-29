import React, { useState, useEffect } from 'react';
import { PlusCircle, X, ChevronDown, ChevronUp, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ICategory {
    category_id: number;
    name: string;
    slug: string;
    description?: string;
    parent_id?: number;
    icon_url?: string;
    created_at: string;
    updated_at: string;
    subcategories?: ICategory[];
}

interface IHomepageCategory {
    id: number;
    category_id: number;
    display_order: number;
    is_active: boolean;
    category: ICategory;
    created_at: string;
    updated_at: string;
}

const HomepageSettings: React.FC = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<Record<number, boolean>>({});

    // Fetch categories and featured categories on component mount
    useEffect(() => {
        fetchCategories();
        fetchFeaturedCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) {
                toast.error('Authentication token not found. Please login again.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/superadmin/categories/main`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 401) {
                toast.error('Session expired. Please login again.');
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        } finally {
            setLoading(false);
        }
    };

    const fetchFeaturedCategories = async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                toast.error('Authentication token not found. Please login again.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/superadmin/homepage/categories`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch featured categories');
            }

            const data: IHomepageCategory[] = await response.json();
            setSelectedCategories(data.map(cat => cat.category_id));
        } catch (error) {
            console.error('Error fetching featured categories:', error);
            toast.error('Failed to fetch featured categories');
        }
    };

    const toggleCategoryExpand = (categoryId: number) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryId]: !prev[categoryId]
        }));
    };

    const handleCategorySelect = (categoryId: number) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handleSaveSettings = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) {
                toast.error('Authentication token not found. Please login again.');
                return;
            }

            const response = await fetch(`${API_BASE_URL}/api/superadmin/homepage/categories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category_ids: selectedCategories
                })
            });

            if (!response.ok) {
                throw new Error('Failed to save homepage settings');
            }

            toast.success('Homepage settings saved successfully');
        } catch (error) {
            console.error('Error saving homepage settings:', error);
            toast.error('Failed to save homepage settings');
        } finally {
            setLoading(false);
        }
    };

    const renderCategoryItem = (category: ICategory, level: number = 0) => {
        const isExpanded = expandedCategories[category.category_id] || false;
        const hasSubcategories = category.subcategories && category.subcategories.length > 0;
        const isSelected = selectedCategories.includes(category.category_id);

        return (
            <div key={category.category_id} className="mb-2">
                <div 
                    className={`flex items-center p-3 rounded-lg ${
                        isSelected ? 'bg-[#FF5733] bg-opacity-10' : 'hover:bg-gray-50'
                    }`}
                    style={{ paddingLeft: `${level * 2 + 1}rem` }}
                >
                    {hasSubcategories && (
                        <button
                            onClick={() => toggleCategoryExpand(category.category_id)}
                            className="p-1 rounded-full hover:bg-gray-200 mr-2"
                        >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                    )}
                    <div className="flex items-center flex-1">
                        {category.icon_url && (
                            <img
                                src={category.icon_url}
                                alt={category.name}
                                className="w-8 h-8 mr-3 rounded-full"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-medium">{category.name}</h3>
                            <p className="text-sm text-gray-500">{category.slug}</p>
                        </div>
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleCategorySelect(category.category_id)}
                                className="w-4 h-4 text-[#FF5733] border-gray-300 rounded focus:ring-[#FF5733]"
                            />
                            <span className="text-sm text-gray-600">Show on homepage</span>
                        </label>
                    </div>
                </div>

                {isExpanded && hasSubcategories && (
                    <div className="mt-2">
                        {category.subcategories?.map(subcategory =>
                            renderCategoryItem(subcategory, level + 1)
                        )}
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF5733]"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Homepage Settings</h1>
                <button
                    onClick={handleSaveSettings}
                    disabled={loading}
                    className="bg-[#FF5733] text-white px-4 py-2 rounded flex items-center hover:bg-[#FF4500] transition-colors disabled:opacity-50"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Featured Categories</h2>
                    <p className="text-sm text-gray-500">
                        Select the categories you want to display on the homepage. Selected categories and their subcategories will be visible to users.
                    </p>
                </div>

                <div className="border rounded-lg p-4">
                    {categories.length > 0 ? (
                        <div className="space-y-2">
                            {categories.map(category => renderCategoryItem(category))}
                        </div>
                    ) : (
                        <div className="text-center p-8 bg-gray-50 rounded">
                            <p className="text-gray-500">No categories found</p>
                        </div>
                    )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium mb-2">Selected Categories</h3>
                    {selectedCategories.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {selectedCategories.map(categoryId => {
                                const category = categories.find(c => c.category_id === categoryId);
                                return category ? (
                                    <div
                                        key={categoryId}
                                        className="bg-white px-3 py-1 rounded-full text-sm flex items-center"
                                    >
                                        {category.name}
                                        <button
                                            onClick={() => handleCategorySelect(categoryId)}
                                            className="ml-2 text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No categories selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomepageSettings; 