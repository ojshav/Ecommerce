import React, { useState, useEffect, useCallback } from 'react';
import { PlusIcon, XMarkIcon, ChevronDownIcon, ChevronRightIcon, StarIcon, PhotoIcon, VideoCameraIcon, ArrowUpTrayIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interfaces
interface VariantAttributeValue { name: string; value: string; }
interface VariantMedia { media_id: number; media_url: string; media_type: 'IMAGE' | 'VIDEO'; is_primary: boolean; display_order: number; }
interface Variant { variant_id?: number; id: string; sku: string; price: string; stock: string; attributes: VariantAttributeValue[]; media?: VariantMedia[]; }
interface ProductVariantsProps {
  productId: number;
  variants: Variant[];
  onVariantsChange: (variants: Variant[]) => void;
  errors?: { variants?: { [key: string]: { sku?: string; price?: string; stock?: string; attributes?: { [key: string]: string; }; }; }; };
  categoryId: number | null;
  parentProductSku: string;
}
interface AttributeDefinition { attribute_id: number; name: string; type: 'select' | 'multiselect' | 'text' | 'number' | 'boolean'; options?: string[]; values?: Array<{ value_code: string; value_label: string }>; required?: boolean; help_text?: string; }

// --- AddVariantModal Component ---
interface AddVariantModalProps {
  isOpen: boolean; onClose: () => void;
  onAdd: (variantData: Pick<Variant, 'sku' | 'price' | 'stock' | 'attributes'>) => void;
  categoryId: number | null; existingSKUs: string[]; parentProductSku: string;
}

const AddVariantModal: React.FC<AddVariantModalProps> = ({ isOpen, onClose, onAdd, categoryId, existingSKUs, parentProductSku }) => {
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [modalAttributes, setModalAttributes] = useState<AttributeDefinition[]>([]);
  const [selectedAttributeValues, setSelectedAttributeValues] = useState<Record<number, string | string[]>>({});
  const [isLoadingAttrs, setIsLoadingAttrs] = useState(false);
  const [fetchAttrsError, setFetchAttrsError] = useState<string | null>(null);
  const [expandedModalAttrs, setExpandedModalAttrs] = useState<Set<number>>(new Set());
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const modalInputBase = "block w-full rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const modalInputBorder = "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const modalInputErrorBorder = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-red-900 placeholder-red-400";
  const getModalInputClass = (fieldName: string) => `${modalInputBase} px-3 py-2 ${formErrors[fieldName] ? modalInputErrorBorder : modalInputBorder}`;
  const modalSelectClass = (fieldName: string) => `${modalInputBase} pl-3 pr-10 py-2 bg-white ${formErrors[fieldName] ? modalInputErrorBorder : modalInputBorder}`;
  const modalLabelClass = "block text-sm font-medium text-gray-700 mb-1";

  const fetchCategoryAttributes = useCallback(async (catId: number) => { 
    setIsLoadingAttrs(true); setFetchAttrsError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/categories/${catId}/attributes?type=variant`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
      if (!response.ok) throw new Error('Failed to fetch variant attributes for this category.');
      let data: AttributeDefinition[] = await response.json();
      // Filter out attributes that are not suitable for variants or already handled globally if needed
      // For now, assume all fetched attributes are variant-configurable
      const attrsWithValues = await Promise.all( data.map(async (attr) => { if ((attr.type === 'select' || attr.type === 'multiselect') && !attr.options && !attr.values) { try { const res = await fetch(`${API_BASE_URL}/api/merchant-dashboard/attributes/${attr.attribute_id}/values`,{headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }}); if (res.ok) return { ...attr, values: await res.json() }; } catch (e) { console.error(`Error fetching values for attribute ${attr.attribute_id}:`, e);}} return attr; }));
      setModalAttributes(attrsWithValues);
    } catch (err) { setFetchAttrsError(err instanceof Error ? err.message : 'Could not load attributes.'); } 
    finally { setIsLoadingAttrs(false); }
  }, []);

  useEffect(() => {
    if (isOpen && categoryId) {
      fetchCategoryAttributes(categoryId);
    } else if (!isOpen) { 
      setSku(''); setPrice(''); setStock(''); 
      setSelectedAttributeValues({}); 
      setFormErrors({}); 
      setFetchAttrsError(null);
      setModalAttributes([]); // Clear attributes when modal closes
      setExpandedModalAttrs(new Set());
    }
  }, [isOpen, categoryId, fetchCategoryAttributes]);


  useEffect(() => {
    if (!parentProductSku || modalAttributes.length === 0 || Object.keys(selectedAttributeValues).length === 0) {
        if(parentProductSku) setSku(parentProductSku + "-VAR"); // Default if no attrs
        return;
    }

    let variantSkuSuffix = '';
    const sortedAttrIds = Object.keys(selectedAttributeValues).map(Number).sort((a, b) => a - b);

    for (const attrId of sortedAttrIds) {
        const attrDef = modalAttributes.find(a => a.attribute_id === attrId);
        const val = selectedAttributeValues[attrId];
        if (attrDef && val && (typeof val === 'string' ? val.trim() : val.length > 0) ) {
            const valStr = Array.isArray(val) ? val.map(v => v.slice(0,3).toUpperCase().replace(/[^A-Z0-9]/g, '')).join('') : String(val).slice(0,3).toUpperCase().replace(/[^A-Z0-9]/g, '');
            const attrNamePart = attrDef.name.slice(0,2).toUpperCase().replace(/[^A-Z0-9]/g, '');
            variantSkuSuffix += `-${attrNamePart}${valStr}`;
        }
    }
    setSku(variantSkuSuffix ? `${parentProductSku}${variantSkuSuffix}`.slice(0, 30) : parentProductSku + "-VAR");
  }, [parentProductSku, selectedAttributeValues, modalAttributes]);


  const handleModalAttributeValueChange = (attrId: number, value: string | string[]) => { 
    setSelectedAttributeValues(prev => ({ ...prev, [attrId]: value }));
    if(formErrors[`attr_${attrId}`]) setFormErrors(prev => ({...prev, [`attr_${attrId}`]: ''}));
  };

  const validateModalForm = (): boolean => { 
    const newErrors: Record<string, string> = {};
    if (!sku.trim()) newErrors.sku = "SKU is required.";
    else if (existingSKUs.includes(sku.trim())) newErrors.sku = "This SKU is already in use by another variant or the main product.";
    if (!price.trim() || parseFloat(price) < 0) newErrors.price = "A valid, non-negative price is required.";
    if (!stock.trim() || parseInt(stock, 10) < 0) newErrors.stock = "A valid, non-negative stock quantity is required.";
    
    modalAttributes.forEach(attrDef => { 
      if(attrDef.required) {
        const val = selectedAttributeValues[attrDef.attribute_id];
        const isEmpty = val === undefined || val === null || (typeof val === 'string' && !val.trim()) || (Array.isArray(val) && val.length === 0);
        if(isEmpty) {
            newErrors[`attr_${attrDef.attribute_id}`] = `${attrDef.name} is a required attribute.`;
        }
      }
    });
    setFormErrors(newErrors); return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { 
    e.preventDefault(); if (!validateModalForm()) return;
    const formattedVariantAttributes: VariantAttributeValue[] = Object.entries(selectedAttributeValues)
      .map(([attrIdStr, valueOrValues]) => { 
        const attrDef = modalAttributes.find(def => def.attribute_id === parseInt(attrIdStr)); 
        if (!attrDef) return null; 
        // For display and data structure consistency, use the label
        const displayValue = Array.isArray(valueOrValues) ? valueOrValues.join(' / ') : String(valueOrValues); 
        return { name: attrDef.name, value: displayValue }; 
      }).filter(Boolean) as VariantAttributeValue[];
    onAdd({ sku, price, stock, attributes: formattedVariantAttributes }); 
    onClose(); // Close modal on successful add attempt
  };

  const renderModalAttributeInput = (attrDef: AttributeDefinition) => { 
    const currentValue = selectedAttributeValues[attrDef.attribute_id]; 
    const hasError = !!formErrors[`attr_${attrDef.attribute_id}`]; 
    const inputCls = `${modalInputBase} px-3 py-2 ${hasError ? modalInputErrorBorder : modalInputBorder}`; 
    const selectCls = `${modalInputBase} pl-3 pr-10 py-2 bg-white ${hasError ? modalInputErrorBorder : modalInputBorder}`;

    switch (attrDef.type) {
      case 'text': case 'number': return <input type={attrDef.type} value={(currentValue as string) || ''} onChange={e => handleModalAttributeValueChange(attrDef.attribute_id, e.target.value)} placeholder={attrDef.help_text || `Enter ${attrDef.name.toLowerCase()}`} className={inputCls} />;
      case 'boolean': return <label className="flex items-center mt-2 cursor-pointer"><input type="checkbox" checked={currentValue === 'true'} onChange={e => handleModalAttributeValueChange(attrDef.attribute_id, e.target.checked.toString())} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /> <span className="ml-2 text-sm text-gray-700">{attrDef.name}</span></label>;
      case 'select': 
        const selectOpts = attrDef.values || attrDef.options?.map(o => ({ value_label: o, value_code: o })); 
        return <select value={(currentValue as string) || ''} onChange={e => handleModalAttributeValueChange(attrDef.attribute_id, e.target.value)} className={selectCls}><option value="">Select {attrDef.name.toLowerCase()}</option>{selectOpts?.map(o => <option key={o.value_code || o.value_label} value={o.value_label}>{o.value_label}</option>)}</select>;
      case 'multiselect': 
        const multiOpts = attrDef.values || attrDef.options?.map(o => ({ value_label: o, value_code: o })); 
        const currentMulti = (Array.isArray(currentValue) ? currentValue : []) as string[]; 
        return <div className="space-y-1.5 mt-1 pr-1 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2">{multiOpts?.map(o => <label key={o.value_code || o.value_label} className="flex items-center p-1.5 rounded hover:bg-gray-100 border border-transparent has-[:checked]:bg-primary-50 has-[:checked]:border-primary-200 cursor-pointer"><input type="checkbox" value={o.value_label} checked={currentMulti.includes(o.value_label)} onChange={e => { const newVals = e.target.checked ? [...currentMulti, o.value_label] : currentMulti.filter(v => v !== o.value_label); handleModalAttributeValueChange(attrDef.attribute_id, newVals);}} className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" /> <span className="ml-2 text-sm text-gray-700">{o.value_label}</span></label>)}</div>;
      default: return <p className="text-xs text-red-500 italic">Unsupported attribute type: {attrDef.type}</p>;
    }
  };

  if (!isOpen) return null;
  return ( 
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200"><h2 className="text-xl font-semibold text-gray-900">Add New Variant</h2><button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"><XMarkIcon className="h-6 w-6" /></button></div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label htmlFor="modal-sku" className={modalLabelClass}>SKU</label><input type="text" id="modal-sku" value={sku} onChange={e => setSku(e.target.value)} className={getModalInputClass('sku')} placeholder="e.g., PARENT-RED-SML" /><p className="text-xs text-gray-500 mt-1">Auto-suggested. Ensure uniqueness.</p>{formErrors.sku && <p className="text-xs text-red-500 mt-1">{formErrors.sku}</p>}</div>
            <div><label htmlFor="modal-price" className={modalLabelClass}>Price</label><input type="number" id="modal-price" value={price} onChange={e => setPrice(e.target.value)} step="0.01" min="0" className={getModalInputClass('price')} placeholder="0.00" />{formErrors.price && <p className="text-xs text-red-500 mt-1">{formErrors.price}</p>}</div>
            <div><label htmlFor="modal-stock" className={modalLabelClass}>Stock Quantity</label><input type="number" id="modal-stock" value={stock} onChange={e => setStock(e.target.value)} min="0" className={getModalInputClass('stock')} placeholder="0" />{formErrors.stock && <p className="text-xs text-red-500 mt-1">{formErrors.stock}</p>}</div>
          </div>
          <div>
            <h3 className="text-md font-medium text-gray-800 mb-2">Variant Attributes</h3>
            {isLoadingAttrs && <div className="flex items-center text-sm text-gray-500"><ArrowPathIcon className="h-4 w-4 animate-spin mr-2"/>Loading attributes...</div>}
            {fetchAttrsError && <div className="text-sm text-red-600 p-3 bg-red-50 rounded-md border border-red-200">{fetchAttrsError} <button type="button" onClick={()=> categoryId && fetchCategoryAttributes(categoryId)} className="ml-2 text-xs font-medium text-primary-600 hover:underline">Retry</button></div>}
            {!isLoadingAttrs && !fetchAttrsError && modalAttributes.length === 0 && <p className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md border border-gray-200">No variant-specific attributes found for this category, or they could not be loaded.</p>}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mt-2">
              {modalAttributes.map(attrDef => (
                <div key={attrDef.attribute_id} className="border border-gray-200 rounded-md">
                  <div className="flex justify-between items-center cursor-pointer p-3 hover:bg-gray-50 transition-colors" onClick={() => setExpandedModalAttrs(prev => { const s = new Set(prev); if (s.has(attrDef.attribute_id)) s.delete(attrDef.attribute_id); else s.add(attrDef.attribute_id); return s; })}>
                    <label className="text-sm font-medium text-gray-700 select-none">{attrDef.name}{attrDef.required &&<span className="text-red-500 ml-0.5">*</span>}</label>
                    { expandedModalAttrs.has(attrDef.attribute_id) ? <ChevronDownIcon className="h-4 w-4 text-gray-400"/> : <ChevronRightIcon className="h-4 w-4 text-gray-400"/>}
                  </div>
                  {expandedModalAttrs.has(attrDef.attribute_id) && <div className="p-3 border-t border-gray-200 bg-white">{renderModalAttributeInput(attrDef)}{formErrors[`attr_${attrDef.attribute_id}`] && <p className="text-xs text-red-500 mt-1">{formErrors[`attr_${attrDef.attribute_id}`]}</p>}</div>}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 disabled:opacity-60">Add Variant</button>
          </div>
        </form>
      </div>
    </div>
  );
};


// --- ProductVariants Main Component ---
const ProductVariants: React.FC<ProductVariantsProps> = ({ productId, variants, onVariantsChange, errors = {}, categoryId, parentProductSku }) => {
  const [isProcessing, setIsProcessing] = useState(false); // For main component API calls (fetch, delete, update variant)
  const [opError, setOpError] = useState<string | null>(null);
  const [opSuccess, setOpSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantMediaStats, setVariantMediaStats] = useState<Record<number, { remaining_slots: number; total_count?: number }>>({});

  const variantInputBase = "block w-full rounded-md shadow-sm sm:text-sm placeholder-gray-400";
  const variantInputBorder = "border-gray-300 focus:border-primary-500 focus:ring-1 focus:ring-primary-500";
  const variantInputErrorBorder = "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-red-900 placeholder-red-400";
  const getVariantInputClass = (variantId: string, fieldName: 'sku' | 'price' | 'stock') => 
    `${variantInputBase} px-2.5 py-1.5 ${errors.variants?.[variantId]?.[fieldName] ? variantInputErrorBorder : variantInputBorder}`;
  const variantLabelClass = "block text-xs font-medium text-gray-600 mb-0.5";


  const fetchExistingVariants = useCallback(async () => {
    if (!productId) return;
    setIsProcessing(true); setOpError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/variants`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
      if (!response.ok) throw new Error('Failed to fetch variants from server.');
      const data = await response.json();
      const fetchedVariants: Variant[] = data.map((v: any) => ({
        variant_id: v.variant_id, id: String(v.variant_id), sku: v.sku || '', 
        price: String(v.price || '0.00'), stock: String(v.stock_quantity || v.stock || '0'),
        attributes: Array.isArray(v.attributes) ? v.attributes : 
                    (typeof v.attributes === 'object' && v.attributes !== null ? Object.entries(v.attributes).map(([name, value]) => ({name, value: String(value)})) : []),
        media: Array.isArray(v.media) ? v.media.map((m:any) => ({...m, media_type: m.media_type?.toUpperCase() as 'IMAGE' | 'VIDEO'})) : [],
      }));
      onVariantsChange(fetchedVariants);
      fetchedVariants.forEach(v => { if (v.variant_id) fetchVariantMediaStats(v.variant_id); });
    } catch (err) { setOpError(err instanceof Error ? err.message : 'Could not load variants data.'); } 
    finally { setIsProcessing(false); }
  }, [productId, onVariantsChange]);

  useEffect(() => { fetchExistingVariants(); }, [fetchExistingVariants]);

  const fetchVariantMediaStats = useCallback(async (variantId: number) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/${variantId}/media/stats`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
        if(response.ok) { const stats = await response.json(); setVariantMediaStats(prev => ({...prev, [variantId]: stats})); }
        else { console.warn(`Failed to fetch media stats for variant ${variantId}`);}
    } catch (e) { console.error(`Error fetching media stats for variant ${variantId}:`, e); }
  }, []);


  const handleAddNewVariantToList = async (variantData: Pick<Variant, 'sku' | 'price' | 'stock' | 'attributes'>) => {
    setIsProcessing(true); setOpError(null); setOpSuccess(null);
    try {
      const attributesPayload = variantData.attributes.reduce((acc, curr) => { acc[curr.name] = curr.value; return acc; }, {} as Record<string, string>);
      const payload = { sku: variantData.sku, price: parseFloat(variantData.price), stock_quantity: parseInt(variantData.stock, 10), attributes: attributesPayload };

      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/${productId}/variants`, {
        method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.message || 'Failed to create variant on server.'); }
      
      const createdApiVariant = await response.json();
      const newVariantForUI: Variant = { 
        variant_id: createdApiVariant.variant_id, id: String(createdApiVariant.variant_id), 
        sku: createdApiVariant.sku, price: String(createdApiVariant.price), stock: String(createdApiVariant.stock_quantity),
        attributes: variantData.attributes, // Use the structured attributes for UI
        media: createdApiVariant.media || [],
      };
      onVariantsChange([...variants, newVariantForUI]);
      setOpSuccess(`Variant "${newVariantForUI.sku}" added successfully!`);
      if(newVariantForUI.variant_id) fetchVariantMediaStats(newVariantForUI.variant_id);
    } catch (err) { setOpError(err instanceof Error ? err.message : 'An unknown error occurred while adding variant.'); } 
    finally { setIsProcessing(false); }
  };

  const handleRemoveExistingVariantAPI = async (variantIdToRemove: number) => {
    if (!window.confirm("Are you sure you want to permanently delete this variant from the server? This action cannot be undone.")) return;
    setIsProcessing(true); setOpError(null); setOpSuccess(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/${variantIdToRemove}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
      if (!response.ok) throw new Error('Failed to delete variant from server.');
      onVariantsChange(variants.filter(v => v.variant_id !== variantIdToRemove));
      setOpSuccess('Variant deleted successfully from server!');
    } catch (err) { setOpError(err instanceof Error ? err.message : 'Could not delete variant from server.'); } 
    finally { setIsProcessing(false); }
  };

  const handleVariantFieldChange = (variantId: string, field: 'sku' | 'price' | 'stock', value: string) => {
    const updatedVariants = variants.map(v => v.id === variantId ? { ...v, [field]: value } : v);
    onVariantsChange(updatedVariants);
    // Clear opSuccess/opError if user starts editing again
    if(opSuccess) setOpSuccess(null);
    if(opError) setOpError(null);
  };
  
  const handleSaveVariantChangesAPI = async (variantToSave: Variant) => {
    if (!variantToSave.variant_id) { setOpError("Cannot update variant: Missing Variant ID."); return; }
    setIsProcessing(true); setOpError(null); setOpSuccess(null);
    try {
        const attributesPayload = variantToSave.attributes.reduce((acc, curr) => { acc[curr.name] = curr.value; return acc; }, {} as Record<string, string>);
        const payload = { sku: variantToSave.sku, price: parseFloat(variantToSave.price), stock_quantity: parseInt(variantToSave.stock, 10), attributes: attributesPayload };
        
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/${variantToSave.variant_id}`, {
            method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if(!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.message || "Failed to update variant on server."); }
        setOpSuccess(`Variant "${variantToSave.sku}" updated successfully on server.`);
    } catch (err) { setOpError(err instanceof Error ? err.message : 'Could not update variant on server.'); } 
    finally { setIsProcessing(false); }
  };

  const handleVariantMediaUpload = async (variantId: number, file: File) => {
    // Check remaining slots for this specific variant
    if ((variantMediaStats[variantId]?.remaining_slots ?? 0) <= 0) {
        setOpError("No remaining media slots for this variant.");
        return;
    }
    setIsProcessing(true); setOpError(null);
    const formData = new FormData(); formData.append('media_file', file); formData.append('type', file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE');
    try {
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/${variantId}/media`, { method: 'POST', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }, body: formData });
        if(!response.ok) { const errData = await response.json().catch(() => ({})); throw new Error(errData.message || "Failed to upload media for variant.");}
        const newMediaItem: VariantMedia = await response.json();
        onVariantsChange(variants.map(v => v.variant_id === variantId ? {...v, media: [...(v.media || []), {...newMediaItem, media_type: newMediaItem.media_type.toUpperCase() as 'IMAGE'|'VIDEO'}]} : v));
        fetchVariantMediaStats(variantId);
        setOpSuccess("Media uploaded for variant.");
    } catch (err) { setOpError(err instanceof Error ? err.message : "Media upload failed for variant."); } 
    finally { setIsProcessing(false); }
  };

  const handleVariantMediaDelete = async (variantId: number, mediaId: number) => {
    if (!window.confirm("Are you sure you want to delete this media item for the variant?")) return;
    setIsProcessing(true); setOpError(null);
    try {
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/media/${mediaId}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
        if(!response.ok) throw new Error("Failed to delete media for variant.");
        onVariantsChange(variants.map(v => v.variant_id === variantId ? {...v, media: v.media?.filter(m => m.media_id !== mediaId)} : v));
        fetchVariantMediaStats(variantId);
        setOpSuccess("Media deleted for variant.");
    } catch (err) { setOpError(err instanceof Error ? err.message : "Media deletion failed for variant."); } 
    finally { setIsProcessing(false); }
  };
    
  const handleSetPrimaryVariantMedia = async (variantId: number, mediaIdToSetPrimary: number) => {
    setIsProcessing(true); setOpError(null);
    try {
        // API might take {is_primary: true} in body or handle via specific endpoint
        const response = await fetch(`${API_BASE_URL}/api/merchant-dashboard/products/variants/${variantId}/media/${mediaIdToSetPrimary}/primary`, { method: 'PUT', headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }});
        if(!response.ok) throw new Error("Failed to set primary media for variant.");
        onVariantsChange(variants.map(v => v.variant_id === variantId ? { ...v, media: v.media?.map(m => ({...m, is_primary: m.media_id === mediaIdToSetPrimary})) } : v));
        setOpSuccess("Primary media set for variant.");
    } catch (err) { setOpError(err instanceof Error ? err.message : "Setting primary media failed for variant."); } 
    finally { setIsProcessing(false); }
  };

  return ( 
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>
        {isProcessing && <ArrowPathIcon className="h-5 w-5 text-primary-500 animate-spin" />}
      </div>

      {opError && <div className="p-3 bg-red-100 text-red-700 border-l-4 border-red-500 rounded-md text-sm shadow">{opError}</div>}
      {opSuccess && <div className="p-3 bg-green-100 text-green-700 border-l-4 border-green-500 rounded-md text-sm shadow">{opSuccess}</div>}

      {variants.length > 0 && (
        <div className="space-y-6">
          {variants.map((variant, index) => (
            <div key={variant.id} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50/60 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                <h4 className="text-md font-semibold text-gray-800">Variant #{index + 1} <span className="text-xs text-gray-500 ml-1">(ID: {variant.variant_id || 'Unsaved'})</span></h4>
                <div className="flex items-center space-x-2">
                    {variant.variant_id && <button type="button" onClick={() => handleSaveVariantChangesAPI(variant)} disabled={isProcessing} className="p-1.5 text-xs font-medium text-primary-600 bg-primary-100 rounded-md hover:bg-primary-200 disabled:opacity-50">Save Changes</button>}
                    {variant.variant_id && <button type="button" onClick={() => handleRemoveExistingVariantAPI(variant.variant_id!)} disabled={isProcessing} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50"><XMarkIcon className="h-5 w-5" /></button>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div><label htmlFor={`v-sku-${variant.id}`} className={variantLabelClass}>SKU</label><input type="text" id={`v-sku-${variant.id}`} value={variant.sku} onChange={e => handleVariantFieldChange(variant.id, 'sku', e.target.value)}  className={getVariantInputClass(variant.id, 'sku')} /></div>
                <div><label htmlFor={`v-price-${variant.id}`} className={variantLabelClass}>Price</label><input type="number" id={`v-price-${variant.id}`} value={variant.price} onChange={e => handleVariantFieldChange(variant.id, 'price', e.target.value)} step="0.01" min="0" className={getVariantInputClass(variant.id, 'price')} /></div>
                <div><label htmlFor={`v-stock-${variant.id}`} className={variantLabelClass}>Stock</label><input type="number" id={`v-stock-${variant.id}`} value={variant.stock} onChange={e => handleVariantFieldChange(variant.id, 'stock', e.target.value)} min="0" className={getVariantInputClass(variant.id, 'stock')} /></div>
              </div>
              <div className="mb-3">
                <p className={variantLabelClass}>Attributes:</p>
                {variant.attributes.length > 0 ? <div className="flex flex-wrap gap-1.5 mt-1">{variant.attributes.map(attr => <span key={attr.name} className="px-2.5 py-1 text-xs bg-slate-200 text-slate-700 rounded-full font-medium shadow-sm">{attr.name}: {attr.value}</span>)}</div> : <p className="text-xs text-gray-500 italic mt-1">No attributes defined for this variant.</p>}
              </div>
              {variant.variant_id && (
                <div>
                  <p className={`${variantLabelClass} mb-1.5`}>Media ({variantMediaStats[variant.variant_id]?.total_count ?? 0} items, <span className="text-primary-600 font-medium">{variantMediaStats[variant.variant_id]?.remaining_slots ?? '...'}</span> slots left):</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 items-center">
                    {variant.media?.map(m => (
                      <div key={m.media_id} className="relative group aspect-square border rounded-md bg-gray-100 shadow-sm overflow-hidden">
                        {m.media_type === 'IMAGE' ? <img src={m.media_url} alt="variant media" className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center bg-black"><VideoCameraIcon className="h-1/2 w-1/2 text-gray-300"/></div>}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
                          {!m.is_primary && <button title="Set Primary" onClick={() => handleSetPrimaryVariantMedia(variant.variant_id!, m.media_id)} disabled={isProcessing} className="p-1.5 bg-white/90 rounded-full text-yellow-500 hover:text-yellow-400 shadow-md hover:shadow-lg transition-all"><StarIcon className="h-3.5 w-3.5"/></button>}
                          <button title="Delete Media" onClick={() => handleVariantMediaDelete(variant.variant_id!, m.media_id)} disabled={isProcessing} className="p-1.5 bg-white/90 rounded-full text-red-500 hover:text-red-700 shadow-md hover:shadow-lg transition-all"><XMarkIcon className="h-3.5 w-3.5"/></button>
                        </div>
                        {m.is_primary && <div className="absolute top-1 right-1 p-0.5 px-1.5 bg-primary-500 text-white text-[10px] rounded font-semibold shadow-sm">Primary</div>}
                      </div>
                    ))}
                    {(variantMediaStats[variant.variant_id]?.remaining_slots ?? 0) > 0 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-primary-400 text-gray-400 hover:text-primary-500 transition-colors hover:bg-primary-50">
                        <input type="file" className="hidden" accept="image/*,video/*" onChange={e => { if(e.target.files?.[0]) handleVariantMediaUpload(variant.variant_id!, e.target.files[0]);}} disabled={isProcessing}/>
                        <ArrowUpTrayIcon className="h-5 w-5"/> <span className="text-xs mt-1">Upload</span>
                      </label>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {variants.length === 0 && !isProcessing && <p className="text-sm text-gray-500 text-center py-4 italic">No variants added yet.</p>}
      
      <button type="button" onClick={() => setIsModalOpen(true)} disabled={!productId || !categoryId || isProcessing} className="inline-flex items-center px-4 py-2 border border-dashed border-primary-500 text-sm font-medium rounded-md text-primary-700 bg-primary-50 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-500 disabled:opacity-60 disabled:cursor-not-allowed">
        <PlusIcon className="h-5 w-5 mr-2" /> Add New Variant
      </button>
      {(!productId || !categoryId) && <p className="text-xs text-gray-500 mt-1 italic">Product's basic info and category must be set to add variants.</p>}
      
      <AddVariantModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddNewVariantToList} 
        categoryId={categoryId} 
        existingSKUs={[parentProductSku, ...variants.map(v => v.sku)]} 
        parentProductSku={parentProductSku}
      />
    </div>
  );
};

export default ProductVariants;