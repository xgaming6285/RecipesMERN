import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/App_Context";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

const EditRecipe = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const { updateRecipe, getRecipeById } = useContext(AppContext);
   const [isLoading, setIsLoading] = useState(true);

   const [formData, setFormData] = useState({
     title: "",
     ist: "",
     ing1: "",
     ing2: "",
     ing3: "",
     ing4: "",
     qty1: "",
     qty2: "",
     qty3: "",
     qty4: "",
     imgurl: "",
   });

   useEffect(() => {
     const fetchRecipe = async () => {
       setIsLoading(true);
       try {
         const result = await getRecipeById(id);
         const recipe = result.data.recipe;
         setFormData({
           title: recipe.title || "",
           ist: recipe.ist || "",
           ing1: recipe.ing1 || "",
           ing2: recipe.ing2 || "",
           ing3: recipe.ing3 || "",
           ing4: recipe.ing4 || "",
           qty1: recipe.qty1 || "",
           qty2: recipe.qty2 || "",
           qty3: recipe.qty3 || "",
           qty4: recipe.qty4 || "",
           imgurl: recipe.imgurl || "",
         });
         setIsLoading(false);
       } catch (error) {
         console.error("Error fetching recipe:", error);
         toast.error("Error loading recipe", {
           theme: "dark",
         });
         setIsLoading(false);
       }
     };

     fetchRecipe();
   }, [id, getRecipeById]);

   const onChangeHandler = (e) => {
     const { name, value } = e.target;
     setFormData({ ...formData, [name]: value });
   };

   const onSubmitHandler = async (e) => {
     e.preventDefault();

     const {
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
     } = formData;

     try {
       const result = await updateRecipe(
         id,
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
         imgurl
       );

       toast.success(result.data.message, {
         position: "top-right",
         autoClose: 1000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "dark",
         transition: Bounce,
       });
       
       setTimeout(() => {
         navigate("/profile");
       }, 1500);
     } catch (error) {
       console.error("Edit error:", error);
       const errorMessage = error.response?.data?.message || 
                           error.message || 
                           "Error updating recipe";
       toast.error(errorMessage, {
         theme: "dark",
         position: "top-right",
         autoClose: 3000,
       });
     }
   };

   if (isLoading) {
     return (
       <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
         <div className="spinner-border text-primary" role="status">
           <span className="visually-hidden">Loading...</span>
         </div>
       </div>
     );
   }

  return (
    <>
      <ToastContainer />
      <div
        className="container my-5 p-5"
        style={{
          width: "500px",
          border: "2px solid yellow",
          borderRadius: "10px",
        }}
      >
        <h2 className="text-center">Edit Recipe</h2>
        <form
          onSubmit={onSubmitHandler}
          style={{
            width: "400px",
            margin: "auto",
          }}
          className="my-3 p-3"
        >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              value={formData.title}
              onChange={onChangeHandler}
              name="title"
              type="text"
              className="form-control"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ist" className="form-label">
              Instructions
            </label>
            <textarea
              value={formData.ist}
              onChange={onChangeHandler}
              name="ist"
              className="form-control"
              id="ist"
              rows="3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing1" className="form-label">
              Ingredient 1
            </label>
            <input
              value={formData.ing1}
              onChange={onChangeHandler}
              name="ing1"
              type="text"
              className="form-control"
              id="ing1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty1" className="form-label">
              Quantity 1
            </label>
            <input
              value={formData.qty1}
              onChange={onChangeHandler}
              name="qty1"
              type="text"
              className="form-control"
              id="qty1"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing2" className="form-label">
              Ingredient 2
            </label>
            <input
              value={formData.ing2}
              onChange={onChangeHandler}
              name="ing2"
              type="text"
              className="form-control"
              id="ing2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty2" className="form-label">
              Quantity 2
            </label>
            <input
              value={formData.qty2}
              onChange={onChangeHandler}
              name="qty2"
              type="text"
              className="form-control"
              id="qty2"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing3" className="form-label">
              Ingredient 3
            </label>
            <input
              value={formData.ing3}
              onChange={onChangeHandler}
              name="ing3"
              type="text"
              className="form-control"
              id="ing3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty3" className="form-label">
              Quantity 3
            </label>
            <input
              value={formData.qty3}
              onChange={onChangeHandler}
              name="qty3"
              type="text"
              className="form-control"
              id="qty3"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ing4" className="form-label">
              Ingredient 4
            </label>
            <input
              value={formData.ing4}
              onChange={onChangeHandler}
              name="ing4"
              type="text"
              className="form-control"
              id="ing4"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="qty4" className="form-label">
              Quantity 4
            </label>
            <input
              value={formData.qty4}
              onChange={onChangeHandler}
              name="qty4"
              type="text"
              className="form-control"
              id="qty4"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imgurl" className="form-label">
              Image URL
            </label>
            <input
              value={formData.imgurl}
              onChange={onChangeHandler}
              name="imgurl"
              type="text"
              className="form-control"
              id="imgurl"
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-warning">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

EditRecipe.propTypes = {
  id: PropTypes.string
};

export default EditRecipe; 