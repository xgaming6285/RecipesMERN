import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/App_Context";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { FiBookmark, FiEye, FiSearch } from "react-icons/fi";

const Home = () => {
  const navigate = useNavigate();
  const { recipe, savedRecipeById } = useContext(AppContext);
  const [filterText, setFilterText] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Filter recipes
  useEffect(() => {
    if (filterText.trim() === "") {
      setFilteredRecipes(recipe);
    } else {
      const lowercaseFilter = filterText.toLowerCase();
      const filtered = recipe.filter((item) => 
        item.title.toLowerCase().includes(lowercaseFilter) || 
        item.ing1?.toLowerCase().includes(lowercaseFilter) ||
        item.ing2?.toLowerCase().includes(lowercaseFilter) ||
        item.ing3?.toLowerCase().includes(lowercaseFilter) ||
        item.ing4?.toLowerCase().includes(lowercaseFilter) ||
        item.ist?.toLowerCase().includes(lowercaseFilter)
      );
      setFilteredRecipes(filtered);
    }
  }, [filterText, recipe]);

  const saved = async (id) => {
    const result = await savedRecipeById(id);
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
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="app-container py-5 fade-in">
        <motion.h1 
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span style={{ color: "var(--primary)" }}>Discover</span> Delicious Recipes
        </motion.h1>
        
        <motion.div 
          className="mx-auto mb-4"
          style={{ maxWidth: "500px" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="input-group">
            <span className="input-group-text">
              <FiSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Filter recipes by title, ingredients or instructions..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            {filterText && (
              <button 
                className="btn btn-outline-secondary" 
                type="button"
                onClick={() => setFilterText("")}
              >
                Clear
              </button>
            )}
          </div>
          {filteredRecipes.length === 0 && (
            <p className="text-center text-muted mt-2">No recipes match your filter</p>
          )}
        </motion.div>
        
        <motion.div 
          className="row g-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredRecipes.map((data) => (
            <motion.div 
              key={data._id} 
              className="col-md-3 col-sm-6"
              variants={itemVariants}
            >
              <div className="card h-100">
                <div className="card-img-container p-3">
                  <img
                    src={data.imgurl}
                    className="card-img-top"
                    alt={data.title}
                  />
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text text-muted mb-3">
                    {data.description?.substring(0, 80)}
                    {data.description?.length > 80 ? "..." : ""}
                  </p>
                  <div className="mt-auto d-flex justify-content-between">
                    <motion.button 
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => saved(data._id)}
                    >
                      <FiBookmark className="me-1" /> Save
                    </motion.button>
                    <motion.button
                      className="btn btn-warning"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/${data._id}`)}
                    >
                      <FiEye className="me-1" /> View
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Home;
