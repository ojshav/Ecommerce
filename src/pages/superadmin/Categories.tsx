import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore, ExpandLess } from '@mui/icons-material';

interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openSubcategoryDialog, setOpenSubcategoryDialog] = useState<boolean>(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    image: null as File | null,
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    description: '',
  });

  const [newCategoryId, setNewCategoryId] = useState<string | null>(null);
  const [tempSubcategories, setTempSubcategories] = useState<Subcategory[]>([]);
  const [subcategoryFormData, setSubcategoryFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    const mockData: Category[] = [
      {
        id: '1',
        name: "Men's",
        description: 'Clothing and accessories for men',
        subcategories: [
          { id: '101', name: "Men's Shirts", description: 'Formal and casual shirts for men', productCount: 8 },
          { id: '102', name: "Men's Pants", description: 'Formal and casual pants for men', productCount: 4 },
        ],
      },
      {
        id: '2',
        name: "Women's",
        description: 'Clothing and accessories for women',
        subcategories: [
          { id: '201', name: "Women's Dresses", description: 'All types of dresses for women', productCount: 12 },
          { id: '202', name: "Women's Tops", description: 'Tops, blouses, and shirts for women', productCount: 6 },
        ],
      },
      {
        id: '3',
        name: "Kids",
        description: 'Clothing and accessories for kids',
        subcategories: [
          { id: '301', name: "Kids Clothes", description: 'All types of clothes for kids', productCount: 8 },
        ],
      },
      {
        id: '4',
        name: "Accessories",
        description: 'Fashion accessories',
        subcategories: [],
      },
    ];
    setCategories(mockData);
  }, []);

  const handleOpenDialog = () => {
    setCategoryFormData({ name: '', description: '', image: null });
    setFormErrors({ name: '', description: '' });
    setTempSubcategories([]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewCategoryId(null);
    setTempSubcategories([]);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...categoryFormData,
      [name]: value,
    });

    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryFormData({
        ...categoryFormData,
        image: e.target.files[0],
      });
    }
  };

  const validateForm = () => {
    const errors = { name: '', description: '' };
    let isValid = true;

    if (!categoryFormData.name.trim()) {
      errors.name = 'Category name is required';
      isValid = false;
    }
    if (!categoryFormData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const validateSubcategoryForm = () => {
    const errors = { name: '', description: '' };
    let isValid = true;

    if (!subcategoryFormData.name.trim()) {
      errors.name = 'Subcategory name is required';
      isValid = false;
    }
    if (!subcategoryFormData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleAddCategoryAndContinue = () => {
    if (!validateForm()) return;

    const id = `cat-${Date.now()}`;
    const newCategory: Category = {
      id,
      name: categoryFormData.name,
      description: categoryFormData.description,
      imageUrl: categoryFormData.image ? URL.createObjectURL(categoryFormData.image) : undefined,
      subcategories: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryId(id);
  };

  const handleAddSubcategoryContinue = () => {
    if (!validateSubcategoryForm()) return;

    const newSubcategory: Subcategory = {
      id: `subcat-${Date.now()}`,
      name: subcategoryFormData.name,
      description: subcategoryFormData.description,
      productCount: 0,
    };

    setTempSubcategories([...tempSubcategories, newSubcategory]);
    setSubcategoryFormData({ name: '', description: '' });
  };

  const handleSaveAllSubcategories = () => {
    if (!newCategoryId) return;

    const updatedCategories = categories.map(category => {
      if (category.id === newCategoryId) {
        return {
          ...category,
          subcategories: [...category.subcategories, ...tempSubcategories],
        };
      }
      return category;
    });

    setCategories(updatedCategories);
    handleCloseDialog();
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    setCategories(updatedCategories);
  };

  const handleDeleteSubcategory = (categoryId: string, subcategoryId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          subcategories: category.subcategories.filter(subcat => subcat.id !== subcategoryId),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const toggleCategoryExpand = (categoryId: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId],
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Categories</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenDialog}>
          Add Category
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>NAME</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell>NO. OF PRODUCTS</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              const isExpanded = expandedCategories[category.id] || false;
              const productCount = category.subcategories.reduce((sum, subcat) => sum + subcat.productCount, 0);

              return (
                <React.Fragment key={category.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton size="small" onClick={() => toggleCategoryExpand(category.id)}>
                        {isExpanded ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {category.imageUrl && (
                          <Box
                            component="img"
                            src={category.imageUrl}
                            sx={{ width: 30, height: 30, mr: 1, borderRadius: '50%' }}
                          />
                        )}
                        {category.name}
                      </Box>
                    </TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{productCount}</TableCell>
                    <TableCell align="right">
                      <IconButton size="small" onClick={() => handleDeleteCategory(category.id)} title="Delete Category">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>

                  {isExpanded &&
                    category.subcategories.map((subcategory) => (
                      <TableRow key={subcategory.id} sx={{ backgroundColor: '#f9f9f9' }}>
                        <TableCell />
                        <TableCell sx={{ pl: 6 }}>{subcategory.name}</TableCell>
                        <TableCell>{subcategory.description}</TableCell>
                        <TableCell>{subcategory.productCount}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteSubcategory(category.id, subcategory.id)}
                            title="Delete Subcategory"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Category and Subcategory Combined Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{newCategoryId ? 'Add Subcategories' : 'Add Category'}</DialogTitle>
        <DialogContent>
          {!newCategoryId ? (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Category Name"
                  fullWidth
                  required
                  value={categoryFormData.name}
                  onChange={handleCategoryChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  fullWidth
                  required
                  multiline
                  rows={3}
                  value={categoryFormData.description}
                  onChange={handleCategoryChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Category Image</Typography>
                  <Button variant="outlined" component="label">
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                  </Button>
                  {categoryFormData.image && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="caption">{categoryFormData.image.name}</Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    label="Subcategory Name"
                    fullWidth
                    required
                    value={subcategoryFormData.name}
                    onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, name: e.target.value })}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    required
                    multiline
                    rows={3}
                    value={subcategoryFormData.description}
                    onChange={(e) => setSubcategoryFormData({ ...subcategoryFormData, description: e.target.value })}
                    error={!!formErrors.description}
                    helperText={formErrors.description}
                  />
                </Grid>
              </Grid>

              {tempSubcategories.length > 0 && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Subcategories Added:</Typography>
                  <ul>
                    {tempSubcategories.map((sub) => (
                      <li key={sub.id}>{sub.name} - {sub.description}</li>
                    ))}
                  </ul>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {!newCategoryId ? (
            <Button onClick={handleAddCategoryAndContinue} variant="contained" color="primary">
              Continue
            </Button>
          ) : (
            <>
              <Button onClick={handleAddSubcategoryContinue} color="primary">Continue</Button>
              <Button onClick={handleSaveAllSubcategories} variant="contained" color="primary">Save All</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Categories;

