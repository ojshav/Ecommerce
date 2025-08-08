import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import shop3ApiService, { Product } from '../../../../services/shop3ApiService';
import SimilarProducts from './SimilarProducts';
import { useShopCartOperations } from '../../../../context/ShopCartContext';
import { toast } from 'react-hot-toast';

const ProductPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
  const [currentVariant, setCurrentVariant] = useState<Product | null>(null);
  const [stockError, setStockError] = useState<string>('');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedMainImage, setSelectedMainImage] = useState<number>(0);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState<boolean>(false);

  // Cart functionality
  const { addToShopCart, canPerformShopCartOperations } = useShopCartOperations();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  
  // Shop3 has a fixed shop ID of 3
  const SHOP_ID = 3;

  // Helper function to get color style for color attributes (same as Shop1)
  const getColorStyleForValue = (value: string) => {
    // Map common color names to CSS colors
    const colorMap: Record<string, string> = {
      'aliceblue': '#F0F8FF',
      'antiquewhite': '#FAEBD7',
      'aqua': '#00FFFF',
      'aquamarine': '#7FFFD4',
      'azure': '#F0FFFF',
      'beige': '#F5F5DC',
      'bisque': '#FFE4C4',
      'black': '#000000',
      'blanchedalmond': '#FFEBCD',
      'blue': '#0000FF',
      'blueviolet': '#8A2BE2',
      'brown': '#A52A2A',
      'burlywood': '#DEB887',
      'cadetblue': '#5F9EA0',
      'chartreuse': '#7FFF00',
      'chocolate': '#D2691E',
      'coral': '#FF7F50',
      'cornflowerblue': '#6495ED',
      'cornsilk': '#FFF8DC',
      'crimson': '#DC143C',
      'cyan': '#00FFFF',
      'darkblue': '#00008B',
      'darkcyan': '#008B8B',
      'darkgoldenrod': '#B8860B',
      'darkgray': '#A9A9A9',
      'darkgreen': '#006400',
      'darkgrey': '#A9A9A9',
      'darkkhaki': '#BDB76B',
      'darkmagenta': '#8B008B',
      'darkolivegreen': '#556B2F',
      'darkorange': '#FF8C00',
      'darkorchid': '#9932CC',
      'darkred': '#8B0000',
      'darksalmon': '#E9967A',
      'darkseagreen': '#8FBC8F',
      'darkslateblue': '#483D8B',
      'darkslategray': '#2F4F4F',
      'darkslategrey': '#2F4F4F',
      'darkturquoise': '#00CED1',
      'darkviolet': '#9400D3',
      'deeppink': '#FF1493',
      'deepskyblue': '#00BFFF',
      'dimgray': '#696969',
      'dimgrey': '#696969',
      'dodgerblue': '#1E90FF',
      'firebrick': '#B22222',
      'floralwhite': '#FFFAF0',
      'forestgreen': '#228B22',
      'fuchsia': '#FF00FF',
      'gainsboro': '#DCDCDC',
      'ghostwhite': '#F8F8FF',
      'gold': '#FFD700',
      'goldenrod': '#DAA520',
      'gray': '#808080',
      'green': '#008000',
      'greenyellow': '#ADFF2F',
      'grey': '#808080',
      'honeydew': '#F0FFF0',
      'hotpink': '#FF69B4',
      'indianred': '#CD5C5C',
      'indigo': '#4B0082',
      'ivory': '#FFFFF0',
      'khaki': '#F0E68C',
      'lavender': '#E6E6FA',
      'lavenderblush': '#FFF0F5',
      'lawngreen': '#7CFC00',
      'lemonchiffon': '#FFFACD',
      'lightblue': '#ADD8E6',
      'lightcoral': '#F08080',
      'lightcyan': '#E0FFFF',
      'lightgoldenrodyellow': '#FAFAD2',
      'lightgray': '#D3D3D3',
      'lightgreen': '#90EE90',
      'lightgrey': '#D3D3D3',
      'lightpink': '#FFB6C1',
      'lightsalmon': '#FFA07A',
      'lightseagreen': '#20B2AA',
      'lightskyblue': '#87CEFA',
      'lightslategray': '#778899',
      'lightslategrey': '#778899',
      'lightsteelblue': '#B0C4DE',
      'lightyellow': '#FFFFE0',
      'lime': '#00FF00',
      'limegreen': '#32CD32',
      'linen': '#FAF0E6',
      'magenta': '#FF00FF',
      'maroon': '#800000',
      'mediumaquamarine': '#66CDAA',
      'mediumblue': '#0000CD',
      'mediumorchid': '#BA55D3',
      'mediumpurple': '#9370DB',
      'mediumseagreen': '#3CB371',
      'mediumslateblue': '#7B68EE',
      'mediumspringgreen': '#00FA9A',
      'mediumturquoise': '#48D1CC',
      'mediumvioletred': '#C71585',
      'midnightblue': '#191970',
      'mintcream': '#F5FFFA',
      'mistyrose': '#FFE4E1',
      'moccasin': '#FFE4B5',
      'navajowhite': '#FFDEAD',
      'navy': '#000080',
      'oldlace': '#FDF5E6',
      'olive': '#808000',
      'olivedrab': '#6B8E23',
      'orange': '#FFA500',
      'orangered': '#FF4500',
      'orchid': '#DA70D6',
      'palegoldenrod': '#EEE8AA',
      'palegreen': '#98FB98',
      'paleturquoise': '#AFEEEE',
      'palevioletred': '#DB7093',
      'papayawhip': '#FFEFD5',
      'peachpuff': '#FFDAB9',
      'peru': '#CD853F',
      'pink': '#FFC0CB',
      'plum': '#DDA0DD',
      'powderblue': '#B0E0E6',
      'purple': '#800080',
      'rebeccapurple': '#663399',
      'red': '#FF0000',
      'rosybrown': '#BC8F8F',
      'royalblue': '#4169E1',
      'saddlebrown': '#8B4513',
      'salmon': '#FA8072',
      'sandybrown': '#F4A460',
      'seagreen': '#2E8B57',
      'seashell': '#FFF5EE',
      'sienna': '#A0522D',
      'silver': '#C0C0C0',
      'skyblue': '#87CEEB',
      'slateblue': '#6A5ACD',
      'slategray': '#708090',
      'slategrey': '#708090',
      'snow': '#FFFAFA',
      'springgreen': '#00FF7F',
      'steelblue': '#4682B4',
      'tan': '#D2B48C',
      'teal': '#008080',
      'thistle': '#D8BFD8',
      'tomato': '#FF6347',
      'turquoise': '#40E0D0',
      'violet': '#EE82EE',
      'wheat': '#F5DEB3',
      'white': '#FFFFFF',
      'whitesmoke': '#F5F5F5',
      'yellow': '#FFFF00',
      'yellowgreen': '#9ACD32'
    };

    return colorMap[value.toLowerCase()] || value;
  };

  // Extract and combine attributes from both parent product attributes and variant attributes
  const availableAttributes = useMemo(() => {
    if (!product) return [];

    // Get variant options
    const variantAttrs = product.variant_attributes || [];

    // Get parent product attributes for default values
    const parentAttrs = product.attributes || [];

    // Create a map to combine all attribute options
    const attributeMap = new Map();

    // First, collect parent product attribute values as defaults
    const parentDefaults: Record<string, string> = {};
    parentAttrs.forEach(attr => {
      const attrName = attr.attribute?.name;
      const attrValue = attr.value;
      if (attrName && attrValue) {
        parentDefaults[attrName] = attrValue;
      }
    });

    // Add variant attributes with their available options (only if product has variants)
    if (product.has_variants) {
      variantAttrs.forEach(attr => {
        const allValues = new Set<string>();

        // Add parent value if it exists for this attribute
        if (parentDefaults[attr.name]) {
          allValues.add(parentDefaults[attr.name]);
        }

        // Add all variant values
        (attr.values || []).forEach(value => allValues.add(value));

        attributeMap.set(attr.name, {
          name: attr.name,
          values: Array.from(allValues).sort(),
          defaultValue: parentDefaults[attr.name] || (attr.values && attr.values[0]) || ''
        });
      });
    }

    // Add any parent attributes that don't have variant options OR for non-variant products
    parentAttrs.forEach(attr => {
      const attrName = attr.attribute?.name;
      const attrValue = attr.value;

      if (attrName && attrValue && !attributeMap.has(attrName)) {
        // For non-variant products, only use the actual value from backend
        attributeMap.set(attrName, {
          name: attrName,
          values: [attrValue],
          defaultValue: attrValue
        });
      }
    });

    const result = Array.from(attributeMap.values());
    return result;
  }, [product?.product_id, product?.variant_attributes, product?.attributes, product?.has_variants]);

  // Extract variant data from product data (no API calls needed)
  const variants = product?.variants || [];

  // Set default attributes when product changes
  useEffect(() => {
    if (availableAttributes.length > 0) {
      // Set default selection to parent product attributes (auto-selected)
      const defaultAttributes: Record<string, string> = {};
      availableAttributes.forEach(attr => {
        // Use the default value from parent product (auto-selected)
        defaultAttributes[attr.name] = attr.defaultValue || (attr.values.length > 0 ? attr.values[0] : '');
      });
      setSelectedAttributes(defaultAttributes);
    } else {
      setSelectedAttributes({});
      setCurrentVariant(null);
    }
  }, [product?.product_id, availableAttributes]);

  // Find matching variant when attributes change (for variant products)
  useEffect(() => {
    if (!product?.has_variants || Object.keys(selectedAttributes).length === 0) return;

    const findVariantByAttributes = () => {
      setStockError('');

      // Find variant by matching SKU pattern or by checking if selection matches available variants
      let matchingVariant = null;

      // Method 1: Try to find variant by SKU pattern (most reliable)
      if (Object.keys(selectedAttributes).length > 0) {
        matchingVariant = variants.find(variant => {
          const sku = variant.sku?.toUpperCase() || '';
          let matches = 0;
          let totalSelectedAttributes = 0;

          // Check each selected attribute
          Object.entries(selectedAttributes).forEach(([attrName, attrValue]) => {
            if (attrValue) {
              totalSelectedAttributes++;

              // Create SKU pattern for this attribute
              const attrCode = attrName.toUpperCase().substring(0, 3); // COL, SIZ, etc.
              const valueCode = attrValue.toUpperCase().substring(0, 3); // BLU, RED, S, M, etc.
              const pattern = `${attrCode}${valueCode}`;

              if (sku.includes(pattern)) {
                matches++;
              }
            }
          });

          return matches === totalSelectedAttributes && totalSelectedAttributes > 0;
        });
      }

      // Method 2: Fallback - if only one variant, check if selected attributes are available
      if (!matchingVariant && variants.length === 1) {
        const variant = variants[0];
        // Use the available_attributes from the API response (it exists in the actual response)
        const availableAttrs = (product as any).available_attributes || {};

        // Check if all selected attributes have available values
        const allAttributesAvailable = Object.entries(selectedAttributes).every(([attrName, attrValue]) => {
          const availableValues = availableAttrs[attrName] || [];
          return availableValues.includes(attrValue);
        });

        if (allAttributesAvailable) {
          matchingVariant = variant;
        }
      }

      // Update state based on variant match
      if (matchingVariant) {
        setCurrentVariant(matchingVariant);

        // Check stock and show warning if low
        const stockQty = matchingVariant.stock?.stock_qty || 0;
        const lowStockThreshold = (matchingVariant.stock as any)?.low_stock_threshold || 5;

        if (stockQty <= 0) {
          setStockError('This variant is out of stock');
        } else if (stockQty <= lowStockThreshold) {
          setStockError(`Only ${stockQty} left in stock!`);
        }
      } else {
        setCurrentVariant(null);

        // Check if selected attributes match parent product attributes
        const parentAttributes: Record<string, string> = {};
        if (product?.attributes) {
          product.attributes.forEach(attr => {
            if (attr.attribute?.name && attr.value) {
              parentAttributes[attr.attribute.name] = attr.value;
            }
          });
        }

        // Check if current selection matches parent product attributes
        const matchesParentAttributes = Object.keys(selectedAttributes).length > 0 &&
          Object.entries(selectedAttributes).every(([attrName, attrValue]) =>
            parentAttributes[attrName] === attrValue
          );

        if (Object.keys(selectedAttributes).length > 0 && !matchesParentAttributes) {
          setStockError('This combination is not available. Please choose a different combination.');
        }
        // If it matches parent attributes, don't show any error (user is viewing parent product)
      }
    };

    findVariantByAttributes();
  }, [selectedAttributes, variants, product?.has_variants, product?.attributes]);

  // Handle attribute validation for non-variant products
  useEffect(() => {
    if (product?.has_variants || Object.keys(selectedAttributes).length === 0) return;

    const validateNonVariantAttributes = () => {
      setStockError('');
      setCurrentVariant(null);

      // For non-variant products, check if selected attributes match product attributes
      const parentAttributes: Record<string, string> = {};
      if (product?.attributes) {
        product.attributes.forEach(attr => {
          if (attr.attribute?.name && attr.value) {
            parentAttributes[attr.attribute.name] = attr.value;
          }
        });
      }

      // Check if current selection matches parent product attributes
      const matchesParentAttributes = Object.entries(selectedAttributes).every(([attrName, attrValue]) => {
        const parentValue = parentAttributes[attrName];
        if (!parentValue) {
          // If the attribute doesn't exist in parent, check if it's a valid option
          const attr = availableAttributes.find(a => a.name === attrName);
          return attr?.values.includes(attrValue) || false;
        }
        return parentValue === attrValue;
      });

      if (!matchesParentAttributes && Object.keys(selectedAttributes).length > 0) {
        setStockError('This combination is not available. Please choose a different combination.');
      }
    };

    validateNonVariantAttributes();
  }, [selectedAttributes, product?.has_variants, product?.attributes, availableAttributes]);

  const handleAttributeSelect = (attributeName: string, value: string) => {
    setSelectedAttributes(prev => ({
      ...prev,
      [attributeName]: value
    }));
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!canPerformShopCartOperations()) {
      toast.error("Please sign in to add items to cart");
      return;
    }

    if (!product) {
      toast.error("Product not available");
      return;
    }

    // Check if product is in stock
    const currentProduct = currentVariant || product;
    const stockQty = currentProduct.stock?.stock_qty || 0;
    if (stockQty <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    try {
      setIsAddingToCart(true);
      
      // Create selected attributes object from current selections
      const cartAttributes: Record<string, string[]> = {};
      Object.entries(selectedAttributes).forEach(([key, value]) => {
        if (value) {
          cartAttributes[key] = [value];
        }
      });
      
      await addToShopCart(SHOP_ID, product.product_id, 1, cartAttributes);
      toast.success("Product added to cart");
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Simple markdown parser for basic formatting with Shop3 styling
  const parseMarkdown = (text: string): JSX.Element[] => {
    if (!text) return [];

    const lines = text.split('\n').filter(line => line.trim() !== '');
    const elements: JSX.Element[] = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Headers
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const content = trimmed.slice(2, -2);
        elements.push(
          <h4 key={index} className="text-xl font-bold text-white mb-2">
            {content}
          </h4>
        );
      }
      // Italic text
      else if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
        const content = trimmed.slice(1, -1);
        elements.push(
          <p key={index} className="text-[#FAF8F8] italic mb-2">
            {content}
          </p>
        );
      }
      // Numbered lists
      else if (/^\d+\./.test(trimmed)) {
        const content = trimmed.replace(/^\d+\.\s*/, '');
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-6 h-6 rounded-full bg-[#CCFF00] text-black text-sm flex items-center justify-center mr-3 mt-0.5 font-semibold">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <span className="text-[#FAF8F8]">{content}</span>
          </div>
        );
      }
      // Bullet points
      else if (trimmed.startsWith('- ')) {
        const content = trimmed.slice(2);
        elements.push(
          <div key={index} className="flex items-start mb-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] mr-4 mt-2"></span>
            <span className="text-[#FAF8F8]">{content}</span>
          </div>
        );
      }
      // Regular text
      else if (trimmed) {
        elements.push(
          <p key={index} className="text-[#FAF8F8] mb-2">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const productId = parseInt(id);
        const response = await shop3ApiService.getProductById(productId);
        if (response && response.success) {
          setProduct(response.product);
          setRelatedProducts(response.related_products || []);
        } else {
          setProduct(null);
          setRelatedProducts([]);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
        setRelatedProducts([]);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full mx-auto min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full mx-auto min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto min-h-screen bg-black">
      {/* Header Navigation */}
      <header className="bg-black max-w-[1920px] w-full mx-auto text-white px-4 sm:px-6 py-3 border-b border-gray-800">
        <div className="mx-auto">
          <nav className="text-sm sm:text-base md:text-lg lg:text-[22px] font-bebas overflow-x-auto">
            <span className="text-gray-400">HOME</span>
            <span className="mx-1 sm:mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-400">MEN</span>
            <span className="mx-1 sm:mx-2 text-gray-400">{'>'}</span>
            <span className="text-gray-400">{product.category_name?.toUpperCase() || 'PRODUCT'}</span>
            <span className="mx-1 sm:mx-2 text-gray-400">{'>'}</span>
            <span className="text-white">{product.product_name?.toUpperCase()}</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row max-w-[1920px] w-full mx-auto">
        {/* Left Section - Product Images */}
        <div className="w-full lg:w-[1332px]">
          <div className="px-4 sm:px-6 rounded-lg">
            {/* Mobile/Tablet Layout (up to lg): One main image on top, others below */}
            <div className="lg:hidden">
              {/* Main Image on Top */}
              <div className="border border-black mb-2 rounded-lg overflow-hidden">
                <img 
                  src={
                    currentVariant?.media?.images?.[selectedMainImage]?.url || 
                    currentVariant?.primary_image ||
                    product.media?.images?.[selectedMainImage]?.url || 
                    product.primary_image || 
                    "assets/shop3/ProductPage/pd1.svg"
                  } 
                  alt="Product main view"
                  className="w-full h-64 sm:h-96 md:h-[448px] object-contain"
                />
              </div>
              
              {/* Other Images Below in Single Row */}
              <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {/* Dynamically render all available images */}
                {(() => {
                  // Get all available images from both variant and product
                  const variantImages = currentVariant?.media?.images || [];
                  const productImages = product?.media?.images || [];
                  const allImages = [...variantImages, ...productImages];
                  
                  // Create unique array of image URLs
                  const imageUrls = allImages
                    .map(img => img?.url)
                    .filter(url => url) // Remove undefined/null
                    .filter((url, index, arr) => arr.indexOf(url) === index); // Remove duplicates
                  
                  // If no images from backend, use fallback images
                  if (imageUrls.length === 0) {
                    return [1, 2, 3, 4].map((index) => (
                      <div 
                        key={index}
                        className={`border border-black flex-1 rounded-lg overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                          selectedMainImage === index ? 'ring-2 ring-[#CCFF00]' : ''
                        }`}
                        onClick={() => setSelectedMainImage(index)}
                      >
                        <img 
                          src={`assets/shop3/ProductPage/pd${index}.svg`}
                          alt={`Product view ${index}`}
                          className="w-full h-32 sm:h-48 md:h-64 object-cover"
                        />
                      </div>
                    ));
                  }
                  
                  // Render actual images from backend
                  return imageUrls.map((imageUrl, index) => (
                    <div 
                      key={index}
                      className={`border border-black rounded-lg overflow-hidden cursor-pointer transition-all flex-shrink-0 ${
                        selectedMainImage === index ? 'ring-2 ring-[#CCFF00]' : ''
                      }`}
                      onClick={() => setSelectedMainImage(index)}
                      style={{ 
                        width: imageUrls.length <= 4 ? '25%' : '120px',
                        minWidth: imageUrls.length <= 4 ? 'auto' : '120px'
                      }}
                    >
                      <img 
                        src={imageUrl}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-32 sm:h-48 md:h-64 object-cover"
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
            
            {/* Desktop Layout (lg and above): Original 2x2 grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {/* Top Left Image */}
              <div className="border border-black rounded-lg overflow-hidden">
                <img 
                  src={
                    currentVariant?.media?.images?.[0]?.url || 
                    currentVariant?.primary_image ||
                    product.media?.images?.[0]?.url || 
                    product.primary_image || 
                    "assets/shop3/ProductPage/pd1.svg"
                  } 
                  alt="Product front view"
                  className="w-full h-[896px] object-cover"
                />
              </div>
              
              {/* Top Right Image */}
              <div className="border border-black rounded-lg overflow-hidden">
                <img 
                  src={
                    currentVariant?.media?.images?.[1]?.url || 
                    product.media?.images?.[1]?.url || 
                    currentVariant?.primary_image ||
                    product.primary_image || 
                    "assets/shop3/ProductPage/pd2.svg"
                  } 
                  alt="Product side view"
                  className="w-full h-[896px] object-cover"
                />
              </div>
              
              {/* Bottom Left Image */}
              <div className="border border-black rounded-lg overflow-hidden">
                <img 
                  src={
                    currentVariant?.media?.images?.[2]?.url || 
                    product.media?.images?.[2]?.url || 
                    currentVariant?.primary_image ||
                    product.primary_image || 
                    "assets/shop3/ProductPage/pd3.svg"
                  } 
                  alt="Product back view"
                  className="w-full h-[896px] object-cover"
                />
              </div>
              
              {/* Bottom Right Image */}
              <div className="border border-black rounded-lg overflow-hidden">
                <img 
                  src={
                    currentVariant?.media?.images?.[3]?.url || 
                    product.media?.images?.[3]?.url || 
                    currentVariant?.primary_image ||
                    product.primary_image || 
                    "assets/shop3/ProductPage/pd4.svg"
                  } 
                  alt="Product angled view"
                  className="w-full h-[896px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full lg:w-[546px] mt-2 px-4 sm:px-6 lg:px-4 text-white">
          {/* Reference Number */}
          <div className="text-left mb-4">
            <span className="text-sm text-[#FFFFFF] font-sans">Ref.{product.sku || product.product_id}</span>
          </div>

          {/* Product Title */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[24px] font-bold mb-4 sm:mb-6 font-alexandria text-[#CCFF00]">
            {product.product_name}
          </h1>

          {/* Price Information */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center space-x-2 mb-2">
              {(() => {
                const currentProduct = currentVariant || product;
                const hasSpecialPrice = currentProduct.special_price && currentProduct.special_price < currentProduct.price;
                return hasSpecialPrice ? (
                  <>
                    <span className="text-white line-through text-base sm:text-lg lg:text-[20px] font-sans">${currentProduct.price}</span>
                    <span className="text-base sm:text-lg lg:text-[20px] font-bold text-[#FE5335] font-sans">${currentProduct.special_price}</span>
                  </>
                ) : (
                  <span className="text-base sm:text-lg lg:text-[20px] font-bold text-white font-sans">${currentProduct.price}</span>
                );
              })()}
            </div>
            <p className="text-xs sm:text-sm lg:text-[14px] text-[#EDEAEA] font-sans">Tax free (21%) outside US</p>
            {/* Stock indicators similar to Shop1 */}
            {(() => {
              const currentProduct = currentVariant || product;
              const stockQty = currentProduct.stock?.stock_qty || 0;
              
              if (stockQty === 0) {
                return (
                  <p className="text-red-400 text-sm font-medium mt-2 font-sans">Out of Stock</p>
                );
              } else if (stockQty <= 5 && stockQty > 0) {
                return (
                  <p className="text-yellow-400 text-sm font-medium mt-2 font-sans">
                    Only {stockQty} left!
                  </p>
                );
              }
              return null;
            })()}
          </div>

          {/* Product Description */}
          <div className="text-[#F4EDED] mb-6 sm:mb-8 text-sm sm:text-base lg:text-[16px] leading-relaxed font-alexandria">
            {product.short_description ? parseMarkdown(product.short_description) : 
             product.product_description ? parseMarkdown(product.product_description) :
             <p>A stunning product featuring modern design and exceptional quality.</p>}
          </div>

          {/* Product Links */}
          <div className="flex flex-col sm:flex-row font-[14px] space-y-2 sm:space-y-0 sm:space-x-8 mb-6 sm:mb-8">
            <button className="text-white font-openSans underline text-left">
              Product details
            </button>
            <button className="text-white font-openSans underline text-left">
              Size guide
            </button>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-16">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                {availableAttributes
                  .filter(attr => attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour'))
                  .map(colorAttr => (
                    colorAttr.values.map((colorValue: string) => {
                      // Use dynamic color mapping from Shop1 approach
                      const colorStyle = getColorStyleForValue(colorValue);
                      
                      return (
                        <button
                          key={colorValue}
                          onClick={() => handleAttributeSelect(colorAttr.name, colorValue)}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded border-2 ${
                            selectedAttributes[colorAttr.name] === colorValue ? 'border-white' : 'border-transparent'
                          }`}
                          style={{ 
                            backgroundColor: colorStyle.startsWith('#') ? colorStyle : '#808080' 
                          }}
                          title={colorValue}
                        />
                      );
                    })
                  )).flat()}
              </div>
              <span className="text-xs sm:text-sm lg:text-[14px] text-[#757575] font-sans">
                {(() => {
                  const colorAttr = availableAttributes.find(attr => attr.name.toLowerCase().includes('color') || attr.name.toLowerCase().includes('colour'));
                  const selectedColorValue = colorAttr ? selectedAttributes[colorAttr.name] : '';
                  return selectedColorValue || 'None';
                })()}
              </span>
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-4 flex justify-center">
            <div className="relative w-full sm:w-3/4 lg:w-full">
              <button
                onClick={() => setIsSizeDropdownOpen(!isSizeDropdownOpen)}
                className="w-full bg-[#CCFF00] text-black font-medium py-2 px-4 rounded cursor-pointer font-sans text-sm sm:text-base flex items-center justify-between"
              >
                <span>
                  {(() => {
                    const sizeAttr = availableAttributes.find(attr => attr.name.toLowerCase().includes('size'));
                    const selectedSize = sizeAttr ? selectedAttributes[sizeAttr.name] : '';
                    return selectedSize || 'Choose your size';
                  })()}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isSizeDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isSizeDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-50 max-h-48 overflow-y-auto">
                  {availableAttributes
                    .filter(attr => attr.name.toLowerCase().includes('size'))
                    .map(sizeAttr => 
                      sizeAttr.values.map((sizeValue: string) => (
                        <button
                          key={sizeValue}
                          onClick={() => {
                            handleAttributeSelect(sizeAttr.name, sizeValue);
                            setIsSizeDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-black text-sm sm:text-base block"
                        >
                          {sizeValue}
                        </button>
                      ))
                    ).flat()}
                </div>
              )}
            </div>
          </div>

          {/* Combination Error Message */}
          {stockError && (
            <div className={`mb-4 p-3 rounded text-sm font-medium font-sans ${
              stockError.includes('out of stock') || stockError.includes('Out of Stock')
                ? 'bg-red-900/20 border border-red-500/30 text-red-400'
                : 'bg-yellow-900/20 border border-yellow-500/30 text-yellow-400'
            }`}>
              {stockError}
            </div>
          )}

          {/* Add to Bag Button */}
          <button 
            onClick={handleAddToCart}
            disabled={isAddingToCart || (() => {
              const currentProduct = currentVariant || product;
              const stockQty = currentProduct.stock?.stock_qty || 0;
              return stockQty <= 0;
            })()}
            className={`w-full py-3 px-6 font-medium font-openSans mb-4 transition-all text-sm sm:text-base ${
              isAddingToCart || (() => {
                const currentProduct = currentVariant || product;
                const stockQty = currentProduct.stock?.stock_qty || 0;
                return stockQty <= 0;
              })()
                ? 'bg-gray-600 border-gray-400 text-gray-300 cursor-not-allowed'
                : 'bg-black border-white text-white hover:bg-gray-800'
            }`}
          >
            {isAddingToCart ? 'Adding...' : (() => {
              const currentProduct = currentVariant || product;
              const stockQty = currentProduct.stock?.stock_qty || 0;
              return stockQty <= 0 ? 'Out of Stock' : 'Add to bag';
            })()}
          </button>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-6 space-y-4 sm:space-y-0">
            <span className="text-white font-openSans underline text-sm sm:text-base">Product details</span>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-sans text-sm sm:text-base">Share</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCFF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Product Details Section */}
      <div className="w-full flex justify-center items-start bg-black py-8 sm:py-10 lg:py-14">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-16 px-4 sm:px-6">
          {/* Left: Product Details */}
          <div className="flex-1">
            <h2 className="text-base sm:text-lg lg:text-[18px] font-bold mb-4 sm:mb-6 font-alexandria text-white">Product details</h2>
            <div className="text-[#FAF8F8] font-openSans text-sm sm:text-base lg:text-[16px] font-normal leading-relaxed lg:leading-[30px]">
              {product.full_description ? parseMarkdown(product.full_description) :
               product.product_description ? parseMarkdown(product.product_description) :
               <p>Detailed product information will be displayed here.</p>}
            </div>
            <ul className="list-disc ml-5 mt-6 sm:mt-8 text-[#FAF8F8] mb-6 sm:mb-8 text-sm sm:text-base lg:text-[16px] font-openSans font-normal leading-relaxed lg:leading-[26px] space-y-1">
              <li>Premium quality materials</li>
              <li>Exceptional craftsmanship</li>
              <li>Perfect fit and comfort</li>
            </ul>
            <div className="flex flex-wrap gap-2 sm:gap-4 font-montserrat mt-4">
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-3 rounded shadow-md font-sans whitespace-nowrap text-xs sm:text-sm">Material &amp; Care</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-3 rounded shadow-md font-sans whitespace-nowrap text-xs sm:text-sm">Fit &amp; Style</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-2 rounded shadow-md font-sans whitespace-nowrap text-xs sm:text-sm">Design</button>
              <button className="bg-[#CCFF00] bg-opacity-70 text-[#F9F9F9] font-bold py-2 px-4 rounded shadow-md font-sans whitespace-nowrap text-xs sm:text-sm">Premium quality</button>
            </div>
          </div>
          {/* Right: Information */}
          <div className="flex-1">
            <h2 className="text-base sm:text-lg lg:text-[18px] font-bold mb-4 sm:mb-6 font-alexandria text-white">Information</h2>
            <ul className="list-disc ml-4 mt-4 sm:mt-6 text-[#FAF8F8] mb-4 sm:mb-6 text-sm sm:text-base lg:text-[16px] font-openSans font-normal leading-relaxed lg:leading-[26px] space-y-1">
              <li>Brand: {product.brand_name || 'Premium Brand'}</li>
              <li>Category: {product.category_name}</li>
              <li>SKU: {product.sku}</li>
              <li>Stock: {product.is_in_stock ? 'In Stock' : 'Out of Stock'}</li>
            </ul>
            <p className="text-white mb-6 sm:mb-8 text-sm sm:text-base lg:text-[16px] font-openSans">
              High-quality product with excellent features <br className="hidden sm:block" /> and modern design for the perfect look.
            </p>
            <div className="flex flex-col sm:flex-row font-montserrat gap-4 sm:gap-8 mt-6 sm:mt-8">
              <a href="#" className="underline text-white text-xs sm:text-sm">Delivery</a>
              <a href="#" className="underline text-white text-xs sm:text-sm">Return</a>
              <a href="#" className="underline text-white text-xs sm:text-sm">Help</a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Products Section */}
      <SimilarProducts relatedProducts={relatedProducts} />
    </div>
  );
};

export default ProductPage;
