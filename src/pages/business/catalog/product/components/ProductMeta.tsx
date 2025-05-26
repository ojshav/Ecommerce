import React, { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductMetaProps {
  productId: number;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  shortDescription: string;
  fullDescription: string;
  onMetaChange: (field: string, value: string) => void;
  errors?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    shortDescription?: string;
    fullDescription?: string;
  };
}

const ProductMeta: React.FC<ProductMetaProps> = ({
  productId,
  metaTitle,
  metaDescription,
  metaKeywords,
  shortDescription,
  fullDescription,
  onMetaChange,
  errors = {},
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [opError, setOpError] = useState<string | null>(null);
  const [opSuccess, setOpSuccess] = useState<string | null>(null);

  // Input styling
  const inputBaseClass = "block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const inputBorderClass = "border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500";
  const inputErrorBorderClass = "border-red-500 focus:ring-red-500";
  const getInputClass = (fieldName: keyof typeof errors) => 
    `${inputBaseClass} ${errors[fieldName] ? inputErrorBorderClass : inputBorderClass}`;


  // Auto-generation logic
  const generateMetaKeywords = (text: string): string => {
    if (!text) return '';
    const cleanText = text.toLowerCase().replace(/[^\w\s'-]/g, '').replace(/\s+/g, ' ');
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'is', 'it', 'this', 'that', 'of', 'com']);
    const words = cleanText.split(' ').filter(word => word.length > 2 && !commonWords.has(word));
    const wordFrequencies: Record<string, number> = {};
    words.forEach(word => { wordFrequencies[word] = (wordFrequencies[word] || 0) + 1; });
    return Object.entries(wordFrequencies)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word)
      .join(', ');
  };

  const handleDescriptionChangeAndAutoGenerate = (field: 'shortDescription' | 'fullDescription', value: string) => {
    onMetaChange(field, value); // Update parent first

    if (field === 'shortDescription' && !metaTitle) { // Only auto-fill if metaTitle is empty
      onMetaChange('metaTitle', value.slice(0, 70)); // Common SEO title length
    }
    if (field === 'fullDescription') {
      if (!metaDescription) { // Only auto-fill if metaDescription is empty
        onMetaChange('metaDescription', value.slice(0, 160)); // Common SEO meta desc length
      }
      if (!metaKeywords) { // Only auto-fill if metaKeywords is empty
        onMetaChange('metaKeywords', generateMetaKeywords(value));
      }
    }
  };


  const handleUpdateMeta = async () => {
    if (!productId) { setOpError('Product ID is missing.'); return; }
    setIsProcessing(true);
    setOpError(null); setOpSuccess(null);
    try {
      const metaDataPayload = {
        short_desc: shortDescription.trim(),
        full_desc: fullDescription.trim(),
        meta_title: metaTitle.trim(),
        meta_desc: metaDescription.trim(),
        meta_keywords: metaKeywords.trim().split(',').map(k => k.trim()).filter(Boolean).join(','),
      };
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/meta`, {
        method: 'POST', // Or PUT
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(metaDataPayload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update meta data');
      }
      // const updatedData = await response.json(); // Use if API returns and you need to sync
      setOpSuccess('Meta data updated successfully!');
    } catch (err) {
      console.error('Error updating meta data:', err);
      setOpError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-6">
      {opError && <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-md text-sm">{opError}</div>}
      {opSuccess && <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-md text-sm">{opSuccess}</div>}

      <div>
        <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
        <textarea id="shortDescription" value={shortDescription} onChange={(e) => handleDescriptionChangeAndAutoGenerate('shortDescription', e.target.value)} rows={3} className={`mt-1 ${getInputClass('shortDescription')}`} placeholder="Brief summary (max 255 chars)" maxLength={255} />
        {errors.shortDescription && <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>}
      </div>

      <div>
        <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
        <textarea id="fullDescription" value={fullDescription} onChange={(e) => handleDescriptionChangeAndAutoGenerate('fullDescription', e.target.value)} rows={6} className={`mt-1 ${getInputClass('fullDescription')}`} placeholder="Detailed product information" />
        {errors.fullDescription && <p className="mt-1 text-sm text-red-600">{errors.fullDescription}</p>}
      </div>

      <div>
        <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-1">Meta Title (SEO)</label>
        <input type="text" id="metaTitle" value={metaTitle} onChange={(e) => onMetaChange('metaTitle', e.target.value)} className={getInputClass('metaTitle')} placeholder="Page title for search engines (max 70 chars)" maxLength={70} />
        {errors.metaTitle && <p className="mt-1 text-sm text-red-600">{errors.metaTitle}</p>}
        <p className="mt-1 text-xs text-gray-500">Current length: {metaTitle.length} / 70</p>
      </div>

      <div>
        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-1">Meta Description (SEO)</label>
        <textarea id="metaDescription" rows={3} value={metaDescription} onChange={(e) => onMetaChange('metaDescription', e.target.value)} className={`mt-1 ${getInputClass('metaDescription')}`} placeholder="Page description for search engines (max 160 chars)" maxLength={160} />
        {errors.metaDescription && <p className="mt-1 text-sm text-red-600">{errors.metaDescription}</p>}
        <p className="mt-1 text-xs text-gray-500">Current length: {metaDescription.length} / 160</p>
      </div>
      
      <div>
        <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords (SEO)</label>
        <input type="text" id="metaKeywords" value={metaKeywords} onChange={(e) => onMetaChange('metaKeywords', e.target.value)} className={getInputClass('metaKeywords')} placeholder="Comma-separated keywords (e.g., t-shirt, cotton, black)" />
        {errors.metaKeywords && <p className="mt-1 text-sm text-red-600">{errors.metaKeywords}</p>}
        <p className="mt-1 text-xs text-gray-500">Keywords can be auto-generated. Max 10 recommended.</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Search Engine Preview</h4>
        <div className="space-y-1">
          <p className="text-blue-600 text-lg font-medium truncate hover:text-blue-800 cursor-default" title={metaTitle || "Your Meta Title"}>{metaTitle || "Your Meta Title Appears Here"}</p>
          <p className="text-green-700 text-sm cursor-default">yourstore.com/product/product-slug</p>
          <p className="text-gray-600 text-sm line-clamp-2 cursor-default" title={metaDescription || "Your meta description"}>{metaDescription || "Your compelling meta description will appear here, encouraging users to click. Keep it concise and relevant."}</p>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleUpdateMeta}
          disabled={isProcessing || !productId}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Updating...' : 'Update Meta Information'}
        </button>
      </div>
    </div>
  );
};

export default ProductMeta;