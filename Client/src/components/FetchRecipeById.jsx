import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/App_Context";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import PropTypes from 'prop-types';

const FetchRecipeById = ({ id }) => {
  const location = useLocation();
  const { getRecipeById } = useContext(AppContext);
  const [recipe, setrecipe] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async (id) => {
      setIsLoading(true);
      const result = await getRecipeById(id);
      setrecipe(result.data.recipe);
      setIsLoading(false);
    };

    fetchRecipe(id);
  }, [id, getRecipeById]);

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
    <motion.div 
      className="app-container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="row">
        <div className="col-md-6 mb-4">
          <motion.div 
            className="text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-img-container mb-4">
              <img
                src={recipe.imgurl}
                className="img-fluid rounded-3"
                alt={recipe.title}
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                }}
              />
            </div>
            <motion.h2 
              className="mb-4"
              style={{ color: "var(--primary)" }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {recipe.title}
            </motion.h2>
          </motion.div>
        </div>

        {location.pathname !== "/saved" && (
          <motion.div 
            className="col-md-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card h-100">
              <div className="card-body">
                <h4 className="card-title mb-4">Ingredients</h4>
                <ul className="list-group list-group-flush mb-4">
                  {recipe.ing1 && (
                    <li className="list-group-item bg-transparent text-light">
                      <strong>{recipe.ing1}:</strong> {recipe.qty1}
                    </li>
                  )}
                  {recipe.ing2 && (
                    <li className="list-group-item bg-transparent text-light">
                      <strong>{recipe.ing2}:</strong> {recipe.qty2}
                    </li>
                  )}
                  {recipe.ing3 && (
                    <li className="list-group-item bg-transparent text-light">
                      <strong>{recipe.ing3}:</strong> {recipe.qty3}
                    </li>
                  )}
                  {recipe.ing4 && (
                    <li className="list-group-item bg-transparent text-light">
                      <strong>{recipe.ing4}:</strong> {recipe.qty4}
                    </li>
                  )}
                </ul>
                
                <h4 className="card-title mb-3" style={{ color: "var(--primary)" }}>Instructions</h4>
                <p className="card-text" style={{ color: "blue" }}>{recipe.ist}</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="text-center mt-5">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={"/"} className="btn btn-warning">
              <FiArrowLeft className="me-2" /> Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

FetchRecipeById.propTypes = {
  id: PropTypes.string.isRequired
};

export default FetchRecipeById;
