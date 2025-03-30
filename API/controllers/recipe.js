import {Recipe} from '../Models/Recipe.js'
import {SavedRecipe} from '../Models/SavedRecipe.js'


export const add = async (req,res)=>{
    const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl } = req.body;
      try {
        const recipe = await Recipe.create({
          title,
          ist,
          ing1,
          ing2,
          ing3,
          ing4,
          qty1,
          qty2,
          qty3,
          qty4,
          imgurl,
          user: req.userId,
        });

        return res.status(201).json({message:"Recipe Created Successfully..!", recipe})
      } catch (error) {
        return res.status(500).json({message: error.message})
      }
} 


export const getAllRecipe = async (req,res) =>{
    try {
        const recipes = await Recipe.find();
        return res.status(200).json({recipes})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


export const getRecipeById = async (req,res)=>{
    const id = req.params.id
    try { 
        const recipe = await Recipe.findById(id)

        if(!recipe) return res.status(404).json({message:'Recipe not found'})

        return res.status(200).json({message:"Recipe found", recipe})
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getRecipeByUserId = async (req,res) =>{
 const userId = req.params.id;
 try {
   const recipes = await Recipe.find({user: userId});

   if (!recipes.length) return res.status(404).json({ message: "No recipes found for this user" });

   return res.status(200).json({ message: "Recipes found", recipes });
 } catch (error) {
   return res.status(500).json({ message: error.message });
 }
}

export const savedRecipeById = async (req,res) =>{
    const id = req.params.id
    
    try {
        let recipe = await SavedRecipe.findOne({recipe: id, user: req.userId})

        if(recipe) return res.status(400).json({message: "Recipe already saved"})

        recipe = await SavedRecipe.create({
            recipe: id,
            user: req.userId
        })
        
        return res.status(201).json({message: "Recipe saved successfully", recipe})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getSavedRecipe = async (req,res) =>{
    try {
        const recipes = await SavedRecipe.find({user: req.userId}).populate('recipe')
        return res.status(200).json({recipes})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteRecipeById = async (req, res) => {
    const id = req.params.id;
    try {
        const recipe = await Recipe.findById(id);
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Check if user owns this recipe
        if (recipe.user.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this recipe' });
        }
        
        await Recipe.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateRecipeById = async (req, res) => {
    const id = req.params.id;
    const { title, ist, ing1, ing2, ing3, ing4, qty1, qty2, qty3, qty4, imgurl } = req.body;
    
    try {
        // Check if the recipe exists
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Check if user owns this recipe
        if (recipe.user.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this recipe' });
        }
        
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            {
                title,
                ist,
                ing1,
                ing2,
                ing3,
                ing4,
                qty1,
                qty2,
                qty3,
                qty4,
                imgurl,
            },
            { new: true }
        );
        
        return res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: error.message });
    }
}