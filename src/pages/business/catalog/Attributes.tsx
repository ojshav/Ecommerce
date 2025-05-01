import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

// Mock attribute data
const ATTRIBUTES = [
  {
    id: 1,
    name: 'Size',
    type: 'Select',
    family: 'Default',
    usedInVariant: true,
    options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 2,
    name: 'Color',
    type: 'Color',
    family: 'Default',
    usedInVariant: true,
    options: ['Red', 'Blue', 'Green', 'Black', 'White']
  },
  {
    id: 3,
    name: 'Material',
    type: 'Select',
    family: 'Default',
    usedInVariant: false,
    options: ['Cotton', 'Polyester', 'Wool', 'Silk', 'Leather']
  },
  {
    id: 4,
    name: 'Brand',
    type: 'Text',
    family: 'Default',
    usedInVariant: false,
    options: []
  },
  {
    id: 5,
    name: 'Weight',
    type: 'Number',
    family: 'Default',
    usedInVariant: false,
    options: []
  }
];

// Attribute families
const ATTRIBUTE_FAMILIES = [
  {
    id: 1,
    name: 'Default',
    attributes: ['Size', 'Color', 'Material', 'Brand', 'Weight']
  },
  {
    id: 2,
    name: 'Electronics',
    attributes: ['Brand', 'Weight', 'Dimensions']
  },
  {
    id: 3,
    name: 'Clothing',
    attributes: ['Size', 'Color', 'Material', 'Style']
  }
];

// Attribute type options
const ATTRIBUTE_TYPES = [
  { value: 'Text', label: 'Text' },
  { value: 'Number', label: 'Number' },
  { value: 'Boolean', label: 'Boolean (Yes/No)' },
  { value: 'Select', label: 'Select (Dropdown)' },
  { value: 'Multiselect', label: 'Multi-select' },
  { value: 'Color', label: 'Color' },
  { value: 'Size', label: 'Size' }
];

type Attribute = {
  id: number;
  name: string;
  type: string;
  family: string;
  usedInVariant: boolean;
  options: string[];
};

type AttributeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attribute: Partial<Attribute>) => void;
  attribute: Partial<Attribute> | null;
};

const AttributeModal: React.FC<AttributeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  attribute
}) => {
  const [formData, setFormData] = useState<Partial<Attribute>>(
    attribute || { name: '', type: 'Text', family: 'Default', usedInVariant: false, options: [] }
  );
  const [options, setOptions] = useState<string[]>(attribute?.options || []);
  const [newOption, setNewOption] = useState('');
  
  if (!isOpen) return null;
  
  const hasOptions = formData.type === 'Select' || formData.type === 'Multiselect' || 
                     formData.type === 'Color' || formData.type === 'Size';
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // If type changed to something that doesn't use options, reset options
    if (name === 'type' && 
        (value !== 'Select' && value !== 'Multiselect' && value !== 'Color' && value !== 'Size')) {
      setOptions([]);
    }
  };
  
  const addOption = () => {
    if (newOption.trim() !== '' && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };
  
  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      options
    });
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {attribute?.id ? 'Edit Attribute' : 'Add New Attribute'}
          </h3>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Attribute Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {ATTRIBUTE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="family" className="block text-sm font-medium text-gray-700 mb-1">
                Attribute Family <span className="text-red-500">*</span>
              </label>
              <select
                id="family"
                name="family"
                value={formData.family}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              >
                {ATTRIBUTE_FAMILIES.map(family => (
                  <option key={family.id} value={family.name}>
                    {family.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                id="usedInVariant"
                name="usedInVariant"
                type="checkbox"
                checked={formData.usedInVariant}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="usedInVariant" className="ml-2 block text-sm text-gray-700">
                Used for Product Variants
              </label>
            </div>
            
            {hasOptions && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newOption}
                      onChange={(e) => setNewOption(e.target.value)}
                      placeholder="Enter option value"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      onClick={addOption}
                      className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-2 border border-gray-200 rounded-md">
                    {options.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        No options added yet. Add some options above.
                      </div>
                    ) : (
                      <ul className="divide-y divide-gray-200">
                        {options.map((option, index) => (
                          <li key={index} className="flex items-center justify-between px-4 py-2">
                            <span className="text-sm">{option}</span>
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

type DeleteConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  attributeName: string;
};

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  attributeName
}) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Confirm Deletion
          </h3>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete the attribute <strong>"{attributeName}"</strong>? This action cannot be undone.
          </p>
          <p className="mt-2 text-sm text-yellow-600">
            Note: If this attribute is used in any product, those references will also be removed.
          </p>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for the Attributes Tab
const AttributesTab: React.FC<{
  attributes: Attribute[],
  onEdit: (attribute: Attribute) => void,
  onDelete: (id: number, name: string) => void
}> = ({ attributes, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter attributes based on search
  const filteredAttributes = searchTerm
    ? attributes.filter(attr => 
        attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attr.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : attributes;
  
  return (
    <div>
      {/* Search */}
      <div className="mb-4">
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search attributes..."
          />
        </div>
      </div>
      
      {/* Attributes Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Used in Variants
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Options
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttributes.map((attribute) => (
              <tr key={attribute.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{attribute.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{attribute.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {attribute.usedInVariant ? 'Yes' : 'No'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {attribute.options.length > 0 ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {attribute.options.length} options
                      </span>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <button
                      onClick={() => onEdit(attribute)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(attribute.id, attribute.name)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Empty State */}
        {filteredAttributes.length === 0 && (
          <div className="px-6 py-10 text-center">
            <p className="text-gray-500 text-lg">No attributes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Component for the Attribute Families Tab
const FamiliesTab: React.FC = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attributes
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ATTRIBUTE_FAMILIES.map((family) => (
              <tr key={family.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{family.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-500 flex flex-wrap gap-1">
                    {family.attributes.map((attr, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-3">
                    <Link 
                      to={`/business/catalog/attribute-families/${family.id}`} 
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </Link>
                    <Link 
                      to={`/business/catalog/attribute-families/${family.id}/edit`} 
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Attributes: React.FC = () => {
  const [attributes, setAttributes] = useState<Attribute[]>(ATTRIBUTES);
  const [activeTab, setActiveTab] = useState<'attributes' | 'families'>('attributes');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentAttribute, setCurrentAttribute] = useState<Partial<Attribute> | null>(null);
  const [attributeToDelete, setAttributeToDelete] = useState<{ id: number; name: string } | null>(null);
  
  // Open modal to add new attribute
  const handleAddAttribute = () => {
    setCurrentAttribute(null);
    setIsModalOpen(true);
  };
  
  // Open modal to edit attribute
  const handleEditAttribute = (attribute: Attribute) => {
    setCurrentAttribute(attribute);
    setIsModalOpen(true);
  };
  
  // Open modal to confirm deletion
  const handleDeleteClick = (id: number, name: string) => {
    setAttributeToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };
  
  // Handle attribute save (add/edit)
  const handleSaveAttribute = (attributeData: Partial<Attribute>) => {
    if (attributeData.id) {
      // Edit existing attribute
      setAttributes(prevAttributes => 
        prevAttributes.map(attr => 
          attr.id === attributeData.id ? { ...attr, ...attributeData } : attr
        )
      );
    } else {
      // Add new attribute
      const newAttribute: Attribute = {
        id: Math.max(...attributes.map(attr => attr.id)) + 1,
        name: attributeData.name || '',
        type: attributeData.type || 'Text',
        family: attributeData.family || 'Default',
        usedInVariant: attributeData.usedInVariant || false,
        options: attributeData.options || []
      };
      
      setAttributes([...attributes, newAttribute]);
    }
    
    setIsModalOpen(false);
  };
  
  // Handle attribute deletion
  const handleConfirmDelete = () => {
    if (attributeToDelete) {
      setAttributes(prevAttributes => 
        prevAttributes.filter(attr => attr.id !== attributeToDelete.id)
      );
      setIsDeleteModalOpen(false);
      setAttributeToDelete(null);
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Page Title and Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Attributes</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex space-x-1 border border-gray-300 rounded-md p-1 bg-gray-50">
            <button
              onClick={() => setActiveTab('attributes')}
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === 'attributes' 
                  ? 'bg-white shadow-sm text-gray-800' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Attributes
            </button>
            <button
              onClick={() => setActiveTab('families')}
              className={`px-3 py-1 text-sm font-medium rounded ${
                activeTab === 'families' 
                  ? 'bg-white shadow-sm text-gray-800' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Attribute Families
            </button>
          </div>
          
          {activeTab === 'attributes' ? (
            <button
              onClick={handleAddAttribute}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Attribute
            </button>
          ) : (
            <Link
              to="/business/catalog/attribute-families/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Attribute Family
            </Link>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4">
          {activeTab === 'attributes' ? (
            <AttributesTab 
              attributes={attributes}
              onEdit={handleEditAttribute}
              onDelete={handleDeleteClick}
            />
          ) : (
            <FamiliesTab />
          )}
        </div>
      </div>
      
      {/* Attribute Modal */}
      <AttributeModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAttribute}
        attribute={currentAttribute}
      />
      
      {/* Delete Confirmation Modal */}
      {attributeToDelete && (
        <DeleteConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          attributeName={attributeToDelete.name}
        />
      )}
    </div>
  );
};

export default Attributes; 