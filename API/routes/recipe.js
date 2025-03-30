import express from 'express'
import { 
    add, 
    getAllRecipe, 
    getRecipeById, 
    getRecipeByUserId, 
    getSavedRecipe, 
    savedRecipeById, 
    deleteRecipeById, 
    updateRecipeById 
} from '../controllers/recipe.js';
import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Get all recipes
router.get('/recipes', getAllRecipe);

// Get recipe by ID
router.get('/recipes/:id', getRecipeById);

// Get recipes by user ID
router.get('/recipes/user/:id', getRecipeByUserId);

// Create recipe (protected)
router.post('/recipes', Authenticate, add);

// Update recipe (protected)
router.put('/recipes/:id', Authenticate, updateRecipeById);

// Delete recipe (protected)
router.delete('/recipes/:id', Authenticate, deleteRecipeById);

// Save recipes (protected)
router.post('/recipes/save/:id', Authenticate, savedRecipeById);

// Get saved recipes (protected)
router.get('/recipes/saved', Authenticate, getSavedRecipe);

export default router;